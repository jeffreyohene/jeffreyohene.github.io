// Function to reveal the contact links upon scrolling down
function revealContactLinks() {
    const contactLinks = document.querySelector('.contact-links');
    const backdrop = document.querySelector('.backdrop');
    const screenHeight = window.innerHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY > screenHeight / 2) {
            contactLinks.classList.remove('hidden');
            backdrop.style.zIndex = '0';
        } else {
            contactLinks.classList.add('hidden');
            backdrop.style.zIndex = '-1';
        }
    });
}

revealContactLinks();
