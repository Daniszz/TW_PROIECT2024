

document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/newPost.html")
        .then(response => response.text())
        .then(html => {
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = html;
            const contents = tempContainer.childNodes;
            const mainContainer = document.querySelector('.masterSection');

            contents.forEach(node => {
                mainContainer.appendChild(node);
            });
        })
        .catch(error => console.error("Error fetching content:", error));
});

document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/login.html")
        .then(response => response.text())
        .then(html => {
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = html;
            const contents = tempContainer.childNodes;
            const mainContainer = document.querySelector('.masterSection');

            contents.forEach(node => {
                mainContainer.appendChild(node);
            });
        })
        .catch(error => console.error("Error fetching content:", error));
});

document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/viewProfile.html")
        .then(response => response.text())
        .then(html => {
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = html;
            const contents = tempContainer.childNodes;
            const mainContainer = document.querySelector('.masterSection');

            contents.forEach(node => {
                mainContainer.appendChild(node);
            });
        })
        .catch(error => console.error("Error fetching content:", error));
});

document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/policy.html")
        .then(response => response.text())
        .then(html => {
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = html;
            const contents = tempContainer.childNodes;
            const mainContainer = document.querySelector('.masterSection');

            contents.forEach(node => {
                mainContainer.appendChild(node);
            });
        })
        .catch(error => console.error("Error fetching content:", error));
});

function goTop() {
    window.scrollTo( {top: 0, behavior: 'smooth'} );
}

function login() {
    document.getElementsByClassName('masterSection__loginSection')[0].style.display= 'block';
}

function changeToLogout() {
    var loginButton = document.getElementsByClassName('navigationBar__loginButton')[0];
    if (loginButton) {
        loginButton.innerText = 'Log out';
    } else {
        console.error("Login button not found!");
    }
}

function closeLogin() {
    document.getElementsByClassName('masterSection__loginSection')[0].style.display= 'none';
}

function addPost() {
    document.getElementsByClassName('masterSection__addPostSection')[0].style.display= 'block';
    var post= document.createElement('div');
    post.classList.add('masterSection__postSection');
    document.getElementsByClassName('masterSection')[0].appendChild(post);
}

function closePosting() {
    document.getElementsByClassName('masterSection__addPostSection')[0].style.display= 'none';
}

function viewProfile() {
    document.getElementsByClassName('masterSection__profileSection')[0].style.display= 'block';
}

function closeProfileViewer() {
    document.getElementsByClassName('masterSection__profileSection')[0].style.display= 'none';
}

