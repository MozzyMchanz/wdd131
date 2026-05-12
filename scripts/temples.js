// Temples JavaScript

// Footer copyright and last modified
const currentYear = new Date().getFullYear();
document.getElementById('copyright').textContent = `© ${currentYear} BWIRE MOSES • Kampala, Uganda.`;
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  hamburger.textContent = navMenu.classList.contains('open') ? '✕' : '☰';
});