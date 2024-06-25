
function loadNewPostSection() {
    fetch("https://localhost/final/html/newPost.html")
        .then(response => response.text())
        .then(html => {
            const mainContainer = document.querySelector('.masterSection');
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = html;
            while (tempContainer.firstChild) {
                mainContainer.appendChild(tempContainer.firstChild);
            }
            const newPostSection = document.querySelector('.masterSection__addPostSection');
            if (newPostSection) {
                newPostSection.style.display = 'block';
                


            } else {
                console.error("New post section not found after loading");
            }
        })
        .catch(error => console.error("Error fetching new post section:", error));
}
    
function newPostState() {
    const picture = document.getElementById("postImage");

    if (document.getElementById("postTitle").value.trim() === '') {
        alert("Post title not found.");
        return false;
    }
    if (document.getElementById("postDescription").value.trim() === '') {
        alert("Tags not found.");
        return false;
    }
    if (picture.files.length <= 0) {
        alert("Photo not selected.");
        return false;
    }
    return true;
}


function closePosting() {
    document.querySelector('.masterSection__addPostSection').style.display = 'none';
}

function handleSourceChange(select) {
    const selectedSource = select.value;
    
    if (selectedSource === 'reddit') {
        document.getElementById('redditAccessToken').value = localStorage.getItem('reddit_access_token') || '';
    }else {
        document.getElementById('redditAccessToken').value = '';
    }
  }
  function uploadPhoto() {
  const fileInput = document.getElementById('postImage');
  const formData = new FormData();
  formData.append('photo', fileInput.files[0]);

  fetch('upload.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Photo uploaded successfully.');
    } else {
      alert('Photo upload failed.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
async function PhotoModified() {
    const inputElement = document.getElementById('postImage');
    const file = inputElement.files[0];

    if (!file) {
        console.error("No file selected.");
        return; 
    }

    console.log("Original file:", file); 

    const modifiedFileName = 'modified_photo.jpg'; 
    const modifiedFile = new File([file], modifiedFileName, { type: file.type });

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(modifiedFile);
    inputElement.files = dataTransfer.files;

    console.log("File replaced in input element with modified file:", modifiedFile);
}
