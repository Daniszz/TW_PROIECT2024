function goTop() {
    window.scrollTo( {top: 0, behavior: 'smooth'} );
}

function login() {
    document.getElementsByClassName('loginSection').style.display= 'block';
}

function addPost() {
    document.getElementsByClassName('masterSection__addPostSection').style.display= 'block';
    var post= document.createElement('div');
    post.classList.add('masterSection__postSection');
    document.getElementsByClassName('masterSection').appendChild(post);
}

function viewProfile() {
    document.getElementsByClassName('masterSection__profileSection').style.display= 'block';
}