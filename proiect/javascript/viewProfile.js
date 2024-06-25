function fetchUserProfilePlease() {
    console.log("Fetching user profile...");
    fetch('viewProfile.php')
        .then(response => response.json())
        .then(data => {
            console.log("Fetched user profile data:", data);

            if (data.success && data.data) {
                const profileImg = document.getElementsByClassName('profile__picture__img')[0];
                const profileUsername = document.getElementsByClassName('profile__username')[0];
                
                if (profileImg) {
                    profileImg.src = data.data.profile_image;
                } else {
                    console.error('profile__picture__img element not found');
                }
                
                if (profileUsername) {
                    profileUsername.textContent = data.data.username;
                } else {
                    console.error('profile__username element not found');
                }
            } else {
                console.error('Error fetching user profile:', data.message);
            }
        })
        .catch(error => console.error('Error fetching user profile:', error));
}

function loadProfileSection() {
  fetch("https://localhost/final/html/viewProfile.html")
      .then(response => response.text())
      .then(html => {
          const mainContainer = document.querySelector('.masterSection');
          const tempContainer = document.createElement('div');
          tempContainer.innerHTML = html;
          while (tempContainer.firstChild) {
              mainContainer.appendChild(tempContainer.firstChild);
          }
          const profileSection = document.querySelector('.masterSection__profileSection');
          if (profileSection) {
            console.log("Profile section loaded successfully:", profileSection);
            fetchUserProfilePlease(); 
            updateUIBasedOnFlags(); 
            profileSection.style.display = 'block';
            //document.getElementById('fb_iconId').src = 'css/images/no_check.svg';
            //document.getElementById('rd_iconId').src = 'css/images/no_check.svg';
        } 
        else {
            console.error("Profile section not found after loading");
        }
      })
      .catch(error => console.error("Error fetching profile section:", error));
}


function closeProfileViewer() {
    const profileSection = document.querySelector('.masterSection__profileSection');
    if (profileSection) {
        profileSection.style.display = 'none';
        location.reload();
    } else {
        console.error("Profile section not found for closing");
    }
}
function updateUIBasedOnFlags() {
    var isFBLoggedIn = localStorage.getItem('fb_logged_in') === 'true';
    console.log("FB Logged In Status from Local Storage:", isFBLoggedIn);
    var fbIcon = document.getElementById('fb_iconId');
  
    if (fbIcon) {
        console.log("fb_iconId element found:", fbIcon);
    } else {
        console.error("Element with ID 'fb_iconId' not found in the DOM");
    }

    if (fbIcon) {
        if (isFBLoggedIn) {
            console.log("Updating FB icon to YES");
fbIcon.src = 'css/images/yes_check.svg';
fbIcon.src = ''; // force a reflow
fbIcon.src = 'css/images/yes_check.svg';        } else {
            console.log("Updating FB icon to NO");
            fbIcon.src = 'css/images/no_check.svg';
        }
    } else {
        console.error("Element with ID 'fb_iconId' not found in the DOM");
    }

    var isRDLoggedIn = localStorage.getItem('reddit_logged_in') === 'true';
    console.log("RD Logged In Status from Local Storage:", isRDLoggedIn);
    var RDIcon = document.getElementById('rd_iconId');
  
    if (RDIcon) {
        console.log("RD_iconId element found:", RDIcon);
    } else {
        console.error("Element with ID 'RD_iconId' not found in the DOM");
    }

    if (RDIcon) {
        if (isRDLoggedIn) {
            console.log("Updating RD icon to YES");
RDIcon.src = 'css/images/yes_check.svg';
RDIcon.src = ''; // force a reflow
RDIcon.src = 'css/images/yes_check.svg';        } else {
            console.log("Updating RD icon to NO");
            RDIcon.src = 'css/images/no_check.svg';
        }
    } else {
        console.error("Element with ID 'RD_iconId' not found in the DOM");
    }

    var isUNLoggedIn = localStorage.getItem('unsplash_logged_in') === 'true';
    console.log("UN Logged In Status from Local Storage:", isUNLoggedIn);
    var UNIcon = document.getElementById('un_iconId');
  
    if (UNIcon) {
        console.log("UN_iconId element found:", UNIcon);
    } else {
        console.error("Element with ID 'UN_iconId' not found in the DOM");
    }

    if (UNIcon) {
        if (isUNLoggedIn) {
            console.log("Updating UN icon to YES");
UNIcon.src = 'css/images/yes_check.svg';
UNIcon.src = ''; // force a reflow
UNIcon.src = 'css/images/yes_check.svg';        } else {
            console.log("Updating UN icon to NO");
            UNIcon.src = 'css/images/no_check.svg';
        }
    } else {
        console.error("Element with ID 'UN_iconId' not found in the DOM");
    }
}
