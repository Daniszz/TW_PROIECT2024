var user;
function login() {
    document.getElementsByClassName('masterSection__loginSection')[0].style.display = 'block';
    const loginSubmit = document.getElementsByClassName('login__formActions__button')[0];
    loginSubmit.addEventListener("click", function(event) {
        if(adminLogin()) {
            loadAdminSection();
            return true;
        } 
        else if (!loginState()) {
            event.preventDefault();
        }
        else {
            if(document.getElementById("username").value.trim() === 'admin') {
                console.log("User logged as admin.");
                event.preventDefault();
            }
            else {
                sessionStorage.setItem('loggedIn', 'true'); 
                console.log("User logged in. 'loggedIn' set to 'true'.");
                changeToLogout();
                var loginButton = document.getElementsByClassName('navigationBar__loginButton')[0];
                loginButton.innerText = 'Log out';
                loginButton.onclick = logout;
            }
        }
    });
}

function logout(event) {
    event.preventDefault(); 
    sessionStorage.removeItem('loggedIn'); 
    console.log("'loggedIn' removed from session storage.");
    changeToLogin();
    var loginButton = document.getElementsByClassName('navigationBar__loginButton')[0];
    loginButton.onclick = login; 
    return false; 
}



function loginState() {
    if(document.getElementById("username").value.trim() === '') {
        window.alert("Username not found.");
        return false;
    }
    else if(document.getElementById("password").value.trim() === '') {
        window.alert("Password not found.");
        return false;
    }
    user = document.getElementById("username").value.trim();
    return true;
}


function adminLogin() {
    if(document.getElementById("username").value.trim() === 'admin' && document.getElementById("password").value.trim() === 'secretdiscret') {
        loadAdminSection();
    }
}
function changeToLogin() {
    var loginButton = document.getElementsByClassName('navigationBar__loginButton')[0];
    while(document.getElementsByClassName('masterSection__post').length!=0) {
        for(var i=0; i<document.getElementsByClassName('masterSection__post').length; i++) {
            console.log('da' + i);
            document.getElementsByClassName('masterSection__post')[i].remove();
        }
    }
    //clearUserSessionFacebook();
    console.log(document.getElementsByClassName('masterSection__post').length);
    if (loginButton) {
        loginButton.innerText = 'Log in';
        location.reload();
    } else {
        console.error("Login button not found!");
    }
    //loginWithFacebook();
    localStorage.getItem('fb_logged_in') === 'false';
    localStorage.getItem('reddit_logged_in') === 'false';
    deletePhotosFromDatabaseFB();
    deletePostsFromDatabase();
}

function changeToLogout() {
    var loginButton = document.getElementsByClassName('navigationBar__loginButton')[0];
    if (loginButton) {
        loginButton.innerText = 'Log out';
    } else {
        console.error("Login button not found!");
    }
}

function updateLoginButton() {
    var loginButton = document.getElementsByClassName('navigationBar__loginButton')[0];
    if (loginButton) {
        if (isLoggedIn()) {
            loginButton.innerText = 'Log out';
            fetch('viewProfile.php')
                .then(response => response.json())
                .then(data => {
                    console.log("Fetched user profile data:", data);

                    if (data.success && data.data) {
                        document.getElementsByClassName('masterSection__post__title')[0].innerHTML = 'Welcome ' + data.data.username;;
                    } else {
                        console.error('Error fetching user profile:', data.message);
                    }
                })
                .catch(error => console.error('Error fetching user profile:', error));
            
            loginButton.onclick = logout;
        } else {
            loginButton.innerText = 'Log in';
            loginButton.onclick = login;
        }
    } else {
        console.error("Login button not found!");
    }
}

function isLoggedIn() {
    return sessionStorage.getItem('loggedIn') === 'true';
}


function closeLogin() {
    document.getElementsByClassName('masterSection__loginSection')[0].style.display= 'none';
}