function loadProfileSection() {
  fetch("http://localhost/final/html/viewProfile.html")
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
              profileSection.style.display = 'block';
              fetchUserProfile(); 
              executeFacebookFunctions(); 
              initializeRedditFunctions();
              
          } else {
              console.error("Profile section not found after loading");
          }
      })
      .catch(error => console.error("Error fetching profile section:", error));
}

function fetchUserProfile() {
  fetch('viewProfile.php')
      .then(response => response.json())
      .then(data => {
          if (data.success) {
            console.log(data); 
              document.getElementById('profile-picture').src = data.data.profile_image;
              document.getElementById('username-profile').textContent = data.data.username; 
            } else {
              console.error('Error fetching user profile:', data.message);
          }
      })
      .catch(error => console.error('Error fetching user profile:', error));
}

function closeProfileViewer() {
  const profileSection = document.querySelector('.masterSection__profileSection');
  if (profileSection) {
      profileSection.style.display = 'none';
  } else {
      console.error("Profile section not found for closing");
  }
}
