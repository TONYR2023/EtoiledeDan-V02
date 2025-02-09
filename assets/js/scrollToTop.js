// Sélection du bouton "Retour en haut"
const scrollToTopButton = document.querySelector('.scroll-to-top');

if (scrollToTopButton) {
    window.addEventListener('scroll', () => {
        scrollToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
}
