function loadNewPostSection() {
    fetch("http://localhost/final/html/newPost.html")
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
                //initializeNewPostForm(); 
            } else {
                console.error("New post section not found after loading");
            }
        })
        .catch(error => console.error("Error fetching new post section:", error));
}


function newPostState() {
    var picture = document.getElementById("postImage");
    if(document.getElementById("postTitle").value.trim() === '') {
        window.alert("Post title not found.");
        return false;
    }
    else if(document.getElementById("postDescription").value.trim() === '') {
        window.alert("Tags not found.");
        return false;
    }
    else if(picture.files.length <= 0) {
        window.alert("Photo not selected.");
        return false;
    }
    return true;
}

function closePosting() {
    document.getElementsByClassName('masterSection__addPostSection')[0].style.display= 'none';
}