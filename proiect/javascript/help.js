function openHelp() {
    document.getElementsByClassName('masterSection__helpSection')[0].style.display = 'flex';
    document.getElementsByClassName('addPostButton')[0].style.display = 'none';
    document.getElementsByClassName('viewProfileButton')[0].style.display = 'none';
    document.getElementsByClassName('viewHelpButton')[0].style.display = 'none';
}

function closeHelp() {
    document.getElementsByClassName('masterSection__helpSection')[0].style.display = 'none';
    document.getElementsByClassName('addPostButton')[0].style.display = 'block';
    document.getElementsByClassName('viewProfileButton')[0].style.display = 'block';
    document.getElementsByClassName('viewHelpButton')[0].style.display = 'block';
}

function showHelp(event) {
    event.preventDefault(); 
    openHelp();
}