const shareBtn = document.querySelector('.article__share-btn');
const shareLinks = document.querySelector('.article__share-links');

function showShareLinks() {
    shareLinks.classList.toggle('show');
}

shareBtn.addEventListener('click', showShareLinks);