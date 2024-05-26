function initializeRedditFunctions() {
  console.log('initializeRedditFunctions called');

  const code = getCodeFromUrl();
  console.log('Code from URL:', code);

  if (code) {
      handleRedditLogin(code);
  } else {
      const accessToken = localStorage.getItem('reddit_access_token');
      console.log('Access Token from localStorage:', accessToken);
      updateUI(!!accessToken); 
  }

  const redditLoginButton = document.getElementById('redditLoginButton');
  if (redditLoginButton) {
      redditLoginButton.addEventListener('click', toggleRedditLogin);
      console.log('Reddit login button event listener added');
  } else {
      console.error('Reddit login button not found');
  }
}

function getCodeFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('code');
}

function toggleRedditLogin() {
  const accessToken = localStorage.getItem('reddit_access_token');
  console.log('Toggling Reddit login. Current access token:', accessToken);
  accessToken ? handleLogout() : startRedditLogin();
}

async function handleRedditLogin(code) {
  const accessToken = await exchangeCodeForToken(code);
  if (accessToken) {
      console.log('Successfully logged in with access token:', accessToken);
      localStorage.setItem('reddit_access_token', accessToken); 

      let currentState = JSON.parse(localStorage.getItem('oauth_state')) || {};
      currentState.redditLoginState = 'loggedIn';
      currentState.checkXIconSrc = 'css/images/yes_check.svg'; 
      localStorage.setItem('oauth_state', JSON.stringify(currentState));

      updateUI(true);
  } else {
      console.error('Failed to obtain access token');
      updateUI(false);
  }
}

function startRedditLogin() {
  const clientId = '38-e6V-J8gTBFVVVVwAfsA';
  const redirectUri = 'http://localhost/final/index.php';
  const state = generateRandomString();

  const currentState = {
      checkXIconSrc: document.querySelector('.profile__results__checkX')?.src || '',
      checkFBIconSrc: document.querySelector('.profile__results__checkFB')?.src || '',
      redditLoginState: 'pending'
  };
  localStorage.setItem('oauth_state', JSON.stringify(currentState));

  const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=${state}&redirect_uri=${redirectUri}&duration=temporary&scope=identity`;
  window.location.href = authUrl;
}

async function exchangeCodeForToken(code) {
  const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://localhost/final/index.php'
  });

  const auth = btoa('38-e6V-J8gTBFVVVVwAfsA:7JVHQf_-OMSyn3DixACjz1WR8EeTeg');

  try {
      const response = await fetch('https://www.reddit.com/api/v1/access_token', {
          method: 'POST',
          headers: {
              'Authorization': `Basic ${auth}`,
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params
      });

      const data = await response.json();
      if (data.access_token) {
          console.log('Access token received:', data.access_token);
          localStorage.setItem('reddit_access_token', data.access_token);
      } else {
          console.error('Access Token Not Received:', data);
      }
      return data.access_token;
  } catch (error) {
      console.error('Error fetching access token:', error);
      return null;
  }
}

function updateUI(loggedIn) {
  console.log('Updating UI. Logged in:', loggedIn);
  const checkR = document.querySelector('.profile__results__checkX');
  const fbIcon = document.querySelector('.profile__results__checkFB');

  if (checkR && fbIcon) {
      const savedState = JSON.parse(localStorage.getItem('oauth_state'));
      if (loggedIn) {
          if (savedState) {
              checkR.src = savedState.checkXIconSrc || 'css/images/check.svg';
              fbIcon.src = savedState.checkFBIconSrc || 'css/images/check_fb.svg'; 
              console.log('UI updated for logged in state');
          } else {
              console.error('Saved state not found in localStorage');
          }
      } else {
          checkR.src = 'css/images/no_check.svg';
          console.log('UI updated for logged out state');
      }
  } else {
      console.error('UI elements not found for updating');
  }
}

function generateRandomString(length = 24) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

function handleLogout() {
  console.log('Logging out');
  localStorage.removeItem('reddit_access_token');
  let currentState = JSON.parse(localStorage.getItem('oauth_state')) || {};
  currentState.redditLoginState = 'loggedOut';
  currentState.checkXIconSrc = 'css/images/no_check.svg';
  localStorage.setItem('oauth_state', JSON.stringify(currentState));
  updateUI(false);
  console.log('Logged out successfully');
}


