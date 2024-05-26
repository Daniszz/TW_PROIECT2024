function executeFacebookFunctions() {

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1622215675224216',
    cookie     : true,
    xfbml      : true,
    version    : 'v12.0'
  });

  FB.AppEvents.logPageView();   
  checkLoginStatus(); 
};
(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
}

function loginWithFacebook() {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      FB.logout(function(response) {
        updateIcons(false);
        deletePhotosFromDatabase();
      });
    } else {
      FB.login(function(response) {
        if (response.authResponse) {
          updateIcons(true);
          retrieveAndSavePhotos();
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      }, {scope: 'user_photos'});
    }
  });
}

function checkLoginStatus() {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      updateIcons(true);
    } else {
      updateIcons(false);
    }
  });
}



function updateIcons(isLoggedIn) {
  var checkFB = document.getElementById('fb_iconId');
  if (isLoggedIn) {
    checkFB.src = 'css/images/yes_check.svg';
  } else {
    checkFB.src = 'css/images/no_check.svg';
  }}

  function retrieveAndSavePhotos() {
    FB.api('/me/photos', 'GET', { fields: 'id,link,likes.summary(true),comments.summary(true),name,description' }, function(response) {
      if (response && !response.error) {
        savePhotosToDatabase(response.data);
      }
    });
  }
  
  function savePhotosToDatabase(photos) {
    var photoData = [];
    photos.forEach(function(photo) {
      var data = {
        id: photo.id,
        link: photo.link,
        likes: photo.likes ? photo.likes.summary.total_count : 0,
        comments: photo.comments ? photo.comments.summary.total_count : 0,
        name: photo.name ? photo.name : '',
        description: photo.description ? photo.description : ''
      };
      photoData.push(data);
    });
    
    var jsonData = JSON.stringify(photoData);
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log(xhr.responseText);
      }
    };
    xhr.open('POST', 'save_photos.php');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(jsonData);
  }
  
  function deletePhotosFromDatabase() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log(xhr.responseText);
      }
    };
    xhr.open('POST', 'delete_photos.php');
    xhr.send();
  }
