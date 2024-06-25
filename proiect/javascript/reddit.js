
 async function redditLogin() {
    try {
      const clientId = "38-e6V-J8gTBFVVVVwAfsA";
      const redirectUri = "https://localhost/final/redirect.php";
  
      var rd_logged_in = localStorage.getItem('reddit_logged_in') === 'true'; 
      if (!rd_logged_in) {
        const state = generateRandomString(40); 
        document.cookie = `state=${state}; path=/`; 
        localStorage.setItem('reddit_logged_in', 'true'); 
        const authorizationUrl = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=${state}&redirect_uri=${encodeURIComponent(redirectUri)}&duration=permanent&scope=identity read history submit`;
  
        window.location.href = authorizationUrl;
      } else {
        localStorage.setItem('reddit_logged_in', 'false'); 
        localStorage.removeItem('reddit_access_token'); 
        localStorage.removeItem('rd_user'); 

        updateUIBasedOnFlags();
        deletePostsFromDatabase();
      }
    } catch (error) {
      console.error('Error during Reddit login:', error);
      throw error; 
    }
  }
  
 
  async function initializeUserDataFetching() {
 try {
const userData = await fetchUserData();
 
 if (userData) {
console.log('User data fetched and saved successfully.');
 
localStorage.setItem('rd_user',userData.name);
const posts = await fetchRedditPosts(userData.name);
    if (posts) {
     processRedditData(posts);
 } else {
 console.log('Failed to fetch Reddit posts.');
    }
   } else {
   console.log('Failed to fetch user data.');
    }
         } catch (error) {
console.error('Error handling user login:', error);
   }
   }

  async function fetchUserData() {
    const accessToken = getAccessToken();
    
    if (!accessToken) {
      console.error('Access token not found.');
      return null;
    }
  
    try {
      const response = await fetch('https://oauth.reddit.com/api/v1/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'User-Agent': 'M-PIC/1.0.0' 
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
  
  async function fetchRedditPosts(username) {
    const accessToken = getAccessToken();
    
    if (!accessToken) {
      console.error('Access token not found.');
      return null;
    }
  
    try {
      const response = await fetch(`https://oauth.reddit.com/user/${username}/submitted`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'User-Agent': 'M-PIC/1.0.0' 
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch Reddit posts');
      }
  
      const posts = await response.json();
      return posts.data.children;
    } catch (error) {
      console.error('Error fetching Reddit posts:', error);
      return null;
    }
  }
  
  function processRedditData(posts) {
    var postData = posts.map(post => ({
      id: post.data.id,
      title: post.data.title,
      permalink: 'https://www.reddit.com' + post.data.permalink,
      score: post.data.score,
      num_comments: post.data.num_comments,
      num_shares: post.data.num_crossposts || 0, 
      subreddit: post.data.subreddit,
      author: post.data.author,
      created_utc: post.data.created_utc,
      image: post.data.thumbnail, 
      description: post.data.selftext || post.data.title 
    }));
  
    console.log('Posts data to be saved:', postData);
  
    var jsonData = JSON.stringify(postData);
  
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log(xhr.responseText);
        location.reload();
      }
    };
    xhr.open('POST', 'save_photos_reddit.php'); 
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(jsonData);
  }
  
  function deletePostsFromDatabase() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log(xhr.responseText);
      }
    };
    xhr.open('POST', 'delete_posts_reddit.php'); 
    xhr.send();
  }
  
 
  
  function generateRandomString(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    return result;
  }
  
  
  function getAccessToken() {
    var accessToken = localStorage.getItem('reddit_access_token');
    return accessToken;
  }
  window.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('token_received') === 'true') {
      initializeUserDataFetching();
      sessionStorage.removeItem('token_received'); 
    }
  });