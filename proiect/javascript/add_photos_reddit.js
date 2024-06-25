document.addEventListener('DOMContentLoaded', (event) => {
    fetch('get_photos_reddit.php')
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            const photosContainer = document.getElementsByClassName('masterSection')[0];
            data.forEach(photo => {
                const photoElement = document.createElement('div');
                photoElement.className = 'masterSection__post';
                photoElement.innerHTML = `
                <div class="masterSection__post__title__div">
                    <h2 class="masterSection__post__title">${photo.source}</h2>
                </div>
                <button class="masterSection__post__tag">${photo.description}</button>
                <img src=${photo.image} class="masterSection__post__image">
                <div class="masterSection__post__statistics">
                    <button class="masterSection__post__statistics__likesButton">
                        <img src="css/images/like.svg" style="width: 100%; height: 100%;">
                    </button>
                    <button class="masterSection__post__statistics__commentsButton">
                        <img src="css/images/comment.svg" style="width: 100%; height: 100%;">
                    </button>
                    <button class="masterSection__post__statistics__sharesButton">
                        <img src="css/images/share.svg" style="width: 100%; height: 100%;">
                    </button>
                </div>
                <div class="masterSection__post__results">
                    <button disabled class="masterSection__post__results__likes">${photo.score}</button>
                    <button disabled class="masterSection__post__results__comments">${photo.num_comments}</button>
                    <button disabled class="masterSection__post__results__shares">${photo.num_shares}</button>
                </div>
                `;
                photosContainer.appendChild(photoElement);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    });