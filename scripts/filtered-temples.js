// Filtered Temples JavaScript

const temples = [
  {
    name: 'Alabama Birmingham Temple',
    location: 'Birmingham, Alabama',
    dedicationDate: '20 August 2000',
    areaSqFt: 106000,
    yearBuilt: 2000,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/alabama-birmingham-alabama/400x250/alabama-birmingham-temple-exterior-1249941-wallpaper.jpg',
  },
  {
    name: 'Salt Lake Temple',
    location: 'Salt Lake City, Utah',
    dedicationDate: '6 April 1893',
    areaSqFt: 997000,
    yearBuilt: 1893,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-temple-utah/400x250/salt-lake-temple-exterior-1518361-wallpaper.jpg',
  },
  {
    name: 'Columbus Ohio Temple',
    location: 'Columbus, Ohio',
    dedicationDate: '14 September 1999',
    areaSqFt: 67000,
    yearBuilt: 1999,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/columbus-ohio/400x250/columbus-ohio-temple-exterior-1518361-wallpaper.jpg',
  },
  {
    name: 'Cardiff Wales Temple',
    location: 'Newport, Wales',
    dedicationDate: '21 June 2020',
    areaSqFt: 24000,
    yearBuilt: 2020,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/wales-uk/400x250/cardiff-wales-temple-exterior-1518361-wallpaper.jpg',
  },
  {
    name: 'Manhattan New York Temple',
    location: 'New York City, New York',
    dedicationDate: '13 January 2019',
    areaSqFt: 80000,
    yearBuilt: 2019,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/new-york-new-york/400x250/manhattan-new-york-temple-exterior-1518361-wallpaper.jpg',
  },
  {
    name: 'Tucson Arizona Temple',
    location: 'Tucson, Arizona',
    dedicationDate: '20 December 2014',
    areaSqFt: 60000,
    yearBuilt: 2014,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/arizona-tucson-arizona/400x250/tucson-arizona-temple-exterior-1518361-wallpaper.jpg',
  },
  {
    name: 'Vancouver British Columbia Temple',
    location: 'Vancouver, British Columbia',
    dedicationDate: '20 November 2019',
    areaSqFt: 82000,
    yearBuilt: 2019,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/british-columbia/400x250/vancouver-british-columbia-temple-exterior-1518361-wallpaper.jpg',
  },
  {
    name: 'Alberta Edmonton Temple',
    location: 'Edmonton, Alberta',
    dedicationDate: '1 November 2023',
    areaSqFt: 120000,
    yearBuilt: 2023,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/alberta/400x250/edmonton-alberta-temple-exterior-1518361-wallpaper.jpg',
  },
  {
    name: 'Kumasi Ghana Temple',
    location: 'Kumasi, Ghana',
    dedicationDate: '10 May 2021',
    areaSqFt: 9800,
    yearBuilt: 2021,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/ghana/400x250/kumasi-ghana-temple-exterior-1518361-wallpaper.jpg',
  },
];

const gallery = document.getElementById('temple-gallery');

function formatCard(temple) {
  const imgAlt = `${temple.name} Temple`;

  const figure = document.createElement('figure');

  const img = document.createElement('img');
  img.src = temple.imageUrl;
  img.alt = imgAlt;
  img.loading = 'lazy';
  img.decoding = 'async';

  // If an image URL fails to load, use a local fallback image
  img.addEventListener('error', () => {
    console.warn('Temple image failed to load:', temple.name, temple.imageUrl);
    img.alt = `${imgAlt} (Image unavailable)`;
    // Use bundled local image as a fallback so the gallery remains visually intact
    img.src = 'images/temple.jpg';
    img.style.display = '';
  });






  const figcaption = document.createElement('figcaption');

  figcaption.textContent = temple.name;

  const details = document.createElement('div');
  details.className = 'temple-details';

  details.innerHTML = `
    <p><strong>Location:</strong> ${temple.location}</p>
    <p><strong>Dedication Date:</strong> ${temple.dedicationDate}</p>
    <p><strong>Area:</strong> ${temple.areaSqFt.toLocaleString()} sq ft</p>
  `;

  figure.append(img, figcaption, details);
  return figure;
}

function getFilteredTemples(filter) {
  switch (filter) {
    case 'old':
      return temples.filter((t) => t.yearBuilt < 1900);
    case 'new':
      return temples.filter((t) => t.yearBuilt > 2000);
    case 'large':
      return temples.filter((t) => t.areaSqFt > 90000);
    case 'small':
      return temples.filter((t) => t.areaSqFt < 10000);
    case 'home':
    default:
      return temples;
  }
}

function renderTemples(filter = 'home') {
  gallery.innerHTML = '';
  const list = getFilteredTemples(filter);

  if (list.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'No temples match this filter.';
    gallery.appendChild(p);
    return;
  }

  list.forEach((temple) => {
    gallery.appendChild(formatCard(temple));
  });
}

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

// Nav filtering
const navLinks = document.querySelectorAll('#nav-menu a[data-filter]');
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const filter = link.getAttribute('data-filter');
    renderTemples(filter);

    // Close hamburger menu on mobile after selection
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      hamburger.textContent = '☰';
    }
  });
});

// Initial render
renderTemples('home');

