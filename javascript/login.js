function login() {
    document.getElementsByClassName('masterSection__loginSection')[0].style.display = 'block';
    const loginSubmit = document.getElementsByClassName('login__formActions__button')[0];
    loginSubmit.addEventListener("click", function(event) {
        if (!loginState()) {
            event.preventDefault();
        } else {
            sessionStorage.setItem('loggedIn', 'true'); 
            console.log("User logged in. 'loggedIn' set to 'true'.");
            changeToLogout();
            var loginButton = document.getElementsByClassName('navigationBar__loginButton')[0];
            loginButton.innerText = 'Log out';
            loginButton.onclick = logout; 
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
    return true;
}

function changeToLogin() {
    var loginButton = document.getElementsByClassName('navigationBar__loginButton')[0];
    if (loginButton) {
        loginButton.innerText = 'Log in';
    } else {
        console.error("Login button not found!");
    }
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