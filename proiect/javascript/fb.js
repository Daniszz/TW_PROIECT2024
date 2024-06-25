async function facebookLogin() {
  try {
    const appId = "1622215675224216";
    const redirectUri = "https://localhost/final/redirectU.php";  
    
    var fb_logged_in = localStorage.getItem('fb_logged_in') === 'true';
    if (!fb_logged_in) {
      const state = generateRandomString(40);
      document.cookie = `fb_state=${state}; path=/`;
      localStorage.setItem('fb_logged_in', 'true');
      const authorizationUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${appId}&response_type=code&state=${state}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=email,public_profile,user_photos`;
      
      window.location.href = authorizationUrl;
    } else {
      localStorage.setItem('fb_logged_in', 'false');
      localStorage.removeItem('facebook_access_token'); 
      localStorage.removeItem('fb_user'); 

      updateUIBasedOnFlags();
      deletePhotosFromDatabaseFB();
    }
  } catch (error) {
    console.error('Error during Facebook login:', error);
    throw error;
  }
}

async function initializeUserDataFetchingFB() {
  try {
    const userData = await fetchUserDataFB();
    if (userData) {
      console.log('User data fetched and saved successfully.');
      localStorage.setItem('fb_user',userData.id);
      const photos = await fetchFacebookPhotos(userData.id); 
      if (photos) {
        processFacebookData(photos);
      } else {
        console.log('Failed to fetch Facebook photos.');
      }
    } else {
      console.log('Failed to fetch user data.');
    }
  } catch (error) {
    console.error('Error handling user login:', error);
  }
}

async function fetchUserDataFB() {
  const accessToken = getAccessTokenFB();
  
  if (!accessToken) {
    console.error('Access token not found.');
    return null;
  }
  
  try {
    const response = await fetch('https://graph.facebook.com/v12.0/me?fields=id,name,email', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'YourAppName/1.0.0' 
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

async function fetchFacebookPhotos(userId) {
  const accessToken = getAccessTokenFB();
  
  if (!accessToken) {
    console.error('Access token not found.');
    return null;
  }
  
  try {
    const response = await fetch(`https://graph.facebook.com/v12.0/${userId}/photos?fields=id,images,name,likes.summary(true),comments.summary(true),description,shares`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'YourAppName/1.0.0'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch Facebook photos');
    }
    
    const photos = await response.json();
    return photos.data;
  } catch (error) {
    console.error('Error fetching Facebook photos:', error);
    return null;
  }
}

function processFacebookData(photos) {
  var photoData = photos.map(photo => ({
    id: photo.id,
    link: photo.images[0].source,
    likes: photo.likes ? photo.likes.summary.total_count : 0,
    comments: photo.comments ? photo.comments.summary.total_count : 0,
    name: photo.name || '',
    description: photo.description || '',
    shares: photo.shares ? photo.shares.count : 0
  }));
  
  console.log('Photos data to be saved:', photoData);

  var jsonData = JSON.stringify(photoData);
  
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(xhr.responseText);
      location.reload();
    }
  };
  xhr.open('POST', 'save_photos.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(jsonData);
}


function getAccessTokenFB() {
  var accessToken = localStorage.getItem('facebook_access_token');
  return accessToken;
}

function deletePhotosFromDatabaseFB() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(xhr.responseText);
    }
  };
  xhr.open('POST', 'delete_photos.php');
  xhr.send();
}
window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('token_received_fb') === 'true') {
    initializeUserDataFetchingFB();
    sessionStorage.removeItem('token_received_fb'); 
  }
});