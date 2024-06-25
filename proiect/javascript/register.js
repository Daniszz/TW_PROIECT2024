
function viewRegister() {
    closeLogin();
    document.getElementsByClassName('masterSection__registerSection')[0].style.display= 'block';
    document.getElementsByClassName('masterSection')[0].style.marginTop= '0';
    document.getElementsByClassName('addPostButton')[0].style.display= 'none';
    document.getElementsByClassName('viewProfileButton')[0].style.display= 'none';
    const registerSubmit = document.getElementsByClassName('register__formActions__button')[0];
    registerSubmit.addEventListener("click", function (event) {
        if(!registerState()) {
            event.preventDefault();
        }
    })
}

function registerState() {
    var profilePicture = document.getElementById("profileImage");
    if(passwordNotLongEnough() === true) {
        window.alert("Password is too short.");
        return false;
    }
    else if (checkPasswordMatch() === false) {
        window.alert("Passwords do not match or not completed.");
        return false;
    }
    else if(profilePicture.files.length <= 0) {
        window.alert("Photo not selected.");
        return false;
    }
    else if(document.getElementById("registerUsername").value.trim() === '') {
        window.alert("Username not found.");
        return false;
    }
    return true;
}

function passwordNotLongEnough()
{
    var password1 = document.getElementById("password1").value;
    if(password1.length < 8) {
        return true;
    }
    else {
        return false;
    }
}

function checkPasswordMatch() {
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;
    var messageElement = document.getElementById("passwordMatchMessage");

    if (password1 === password2 && password1.trim() !== '') {
        return true;
    } else {
        return false;
    }
}

function closeRegister() {
    document.getElementsByClassName('masterSection__registerSection')[0].style.display= 'none';
    document.getElementsByClassName('addPostButton')[0].style.display= 'block';
    document.getElementsByClassName('viewProfileButton')[0].style.display= 'block';
    document.getElementsByClassName('masterSection')[0].style.marginTop= 'calc(max(15vh, 80px))';
}