async function unsplashLogin() {
  try {
    const clientId = "6qZ48mGQ4W-NW9ml2KhSGyt50aOo3ku1KSrc_rwfdeQ";
    const redirectUri = "https://localhost/final/redirectT.php";

    var unsplashLoggedIn = localStorage.getItem('unsplash_logged_in') === 'true';
    if (!unsplashLoggedIn) {
      const state = generateRandomString(40);
      document.cookie = `unsplash_state=${state}; path=/`;
      localStorage.setItem('unsplash_logged_in', 'true');
      const authorizationUrl = `https://unsplash.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=public+read_user+write_photos&state=${state}`;

      window.location.href = authorizationUrl;
    } else {
      localStorage.setItem('unsplash_logged_in', 'false');
      localStorage.removeItem('unsplash_access_token');
      localStorage.removeItem('unsplash_user');

      updateUIBasedOnFlags();
      deletePhotosFromDatabaseUnsplash();
    }
  } catch (error) {
    console.error('Error during Unsplash login:', error);
    throw error;
  }
}

async function initializeUserDataFetchingUnsplash() {
  try {
    const userData = await fetchUserDataUnsplash();

    if (userData) {
      console.log('User data fetched and saved successfully.');

      localStorage.setItem('unsplash_user', userData.username);
      const photos = await fetchUnsplashPhotos(userData.username);
      if (photos) {
        processUnsplashData(photos);
      } else {
        console.log('Failed to fetch Unsplash photos.');
      }
    } else {
      console.log('Failed to fetch user data.');
    }
  } catch (error) {
    console.error('Error handling user login:', error);
  }
}

async function fetchUserDataUnsplash() {
  const accessToken = getAccessTokenUnsplash();

  if (!accessToken) {
    console.error('Access token not found.');
    return null;
  }

  try {
    const response = await fetch('https://api.unsplash.com/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept-Version': 'v1',
      },
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

async function fetchUnsplashPhotos(username) {
  const accessToken = getAccessTokenUnsplash();

  if (!accessToken) {
    console.error('Access token not found.');
    return null;
  }

  try {
    const response = await fetch(`https://api.unsplash.com/users/${username}/photos`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept-Version': 'v1',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Unsplash photos');
    }

    const photos = await response.json();
    return photos;
  } catch (error) {
    console.error('Error fetching Unsplash photos:', error);
    return null;
  }
}

function processUnsplashData(photos) {
  var photoData = photos.map(photo => ({
    id: photo.id,
    title: photo.description || photo.alt_description || "No Title",
    link: photo.links.html,
    likes: photo.likes,
    downloaded: photo.downloads,
    created_at: photo.created_at,
    image: photo.urls.small,
    author: photo.user.username,
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
  xhr.open('POST', 'save_photos_unsplash.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(jsonData);
}

function deletePhotosFromDatabaseUnsplash() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(xhr.responseText);
    }
  };
  xhr.open('POST', 'delete_photos_unsplash.php');
  xhr.send();
}
function getAccessTokenUnsplash() {
  var accessToken = localStorage.getItem('unsplash_access_token');
  return accessToken;
}
window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('token_received_unsplash') === 'true') {
    initializeUserDataFetchingUnsplash();
    sessionStorage.removeItem('token_received_unsplash'); 
  }
});