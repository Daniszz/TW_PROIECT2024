
function loadAdminSection() {
    fetch("https://localhost/final/html/admin.html")
        .then(response => response.text())
        .then(html => {
            const mainContainer = document.querySelector('.masterSection');
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = html;
            while (tempContainer.firstChild) {
                mainContainer.appendChild(tempContainer.firstChild);
            }
            const adminSection = document.querySelector('.masterSection__adminSection');
            if (adminSection) {
                adminSection.style.display = 'flex';
                document.getElementsByClassName('addPostButton')[0].style.display = 'none';
                document.getElementsByClassName('viewProfileButton')[0].style.display = 'none';
                document.getElementsByClassName('viewHelpButton')[0].style.display = 'none';
                closeLogin();
                loadUsers(); 
            } else {
                console.error("Admin section not found after loading");
            }
        })
        .catch(error => console.error("Error fetching admin section:", error));
}

function closeAdmin() {
    document.querySelector('.masterSection__adminSection').style.display = 'none';
    document.getElementsByClassName('addPostButton')[0].style.display = 'block';
    document.getElementsByClassName('viewProfileButton')[0].style.display = 'block';
    document.getElementsByClassName('viewHelpButton')[0].style.display = 'block';
}

function loadUsers() {
    const usersContainer = document.getElementById('adminUsersContainer');
    if (!usersContainer) {
        console.error("adminUsersContainer element not found in the DOM");
        return;
    }

    fetch("https://localhost/final/get_users.php") 
        .then(response => response.json())
        .then(data => {
            console.log("Response from server:", data); 
            if (data.error) {
                throw new Error(data.message || "Unknown error");
            }
            const users = data.users;
            if (!Array.isArray(users)) {
                throw new Error("Invalid users data format");
            }
            usersContainer.innerHTML = ''; 
            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.classList.add('masterSection__adminSection__userContainer');
                userDiv.innerHTML = `
                    <button class="masterSection__adminSection__deleteUser" onclick="deleteUser('${user.username}')">Delete</button>
                    <h2 class="masterSection__adminSection__user">${user.username}</h2>
                `;
                usersContainer.appendChild(userDiv);
            });
        })
        .catch(error => console.error("Error fetching users:", error));
}

function deleteUser(username) {
    fetch(`https://localhost/final/delete_users.php/${username}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            console.log(`User ${username} deleted successfully`);
            loadUsers(); 
        } else {
            console.error(`Failed to delete user ${username}`);
        }
    })
    .catch(error => console.error("Error deleting user:", error));
}
