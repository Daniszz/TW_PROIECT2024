document.addEventListener("DOMContentLoaded", function() {
    const urls = [
        "https://localhost/final/html/login.html",
        "https://localhost/final/html/register.html",
        "https://localhost/final/html/help.html"
    ];
    updateLoginButton();

    const mainContainer = document.querySelector('.masterSection');

    Promise.all(urls.map(url =>
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const tempContainer = document.createElement('div');
                tempContainer.innerHTML = html;
                const contents = tempContainer.childNodes;
                contents.forEach(node => {
                    mainContainer.appendChild(node);
                });
            })
            .catch(error => console.error("Error fetching content:", error))
    )).then(() => {
        setupForms();
        setupButtons();
    }).catch(error => console.error("Error processing fetch promises:", error));
});

function setupForms() {
    // Register Form
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(this);

            fetch('register.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.alert(data.message);
                    window.location.href = 'index.php';
                } else {
                    window.alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                window.alert('An error occurred. Please try again.');
            });
        });
    } else {
        console.error("Form with ID 'registerForm' not found");
    }

    // Login Form
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(this);

            fetch('login.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.alert(data.message);
                    window.location.href = 'index.php';
                } else {
                    window.alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                window.alert('An error occurred. Please try again.');
            });
        });
    } else {
        console.error("Form with ID 'loginForm' not found");
    }

    // Logout Button
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function(event) {
            logout(event); 
        });
    } 

    // Help Button
    const helpButton = document.getElementsByClassName('viewHelpButton')[0];
    if(helpButton) {
        helpButton.addEventListener("click", function(event) {
            showHelp(event);
        });
    }
}

function setupButtons() {
    const viewProfileButtons = document.querySelectorAll('.viewProfileButton');
    viewProfileButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            if (isLoggedIn()) {
                console.log("ajunge");
                loadProfileSection();
            } else {
                alert('User not logged in');
            }
        });
    });

    const addPostButton = document.querySelector('.addPostButton');
    if (addPostButton) {
        addPostButton.addEventListener('click', function(event) {
            event.preventDefault();
            if (isLoggedIn()) {
                loadNewPostSection();
            } else {
                alert('User not logged in');
            }
        });
    }
}


function goTopNav() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}
