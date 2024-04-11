function goTop() {
    window.scrollTo( {top: 0, behavior: 'smooth'} );
}

function login() {
    document.getElementsByClassName('masterSection__loginSection')[0].style.display= 'block';
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