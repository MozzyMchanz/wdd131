const services = [
  {
    id: 'software',
    title: 'Custom Software Development',
    summary: 'Build secure business applications, ERP systems, and school management solutions for modern workflows.',
    category: 'Development',
    tag: 'Software',
    image: 'images/hero-illustration.svg'
  },
  {
    id: 'web-design',
    title: 'Website Design & Development',
    summary: 'Responsive websites with clear user journeys, strong branding, and fast performance.',
    category: 'Design',
    tag: 'Web',
    image: 'images/project-sample-1.svg'
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    summary: 'Native and cross-platform apps that improve customer engagement and employee productivity.',
    category: 'Mobile',
    tag: 'Apps',
    image: 'images/project-sample-2.svg'
  },
  {
    id: 'cloud',
    title: 'Cloud & IT Infrastructure',
    summary: 'Cloud hosting, backup, and managed IT support designed for Ugandan businesses and institutions.',
    category: 'Cloud',
    tag: 'Cloud',
    image: 'images/hero-illustration.svg'
  },
  {
    id: 'security',
    title: 'Cybersecurity & Compliance',
    summary: 'Protect systems with audits, access controls, and secure deployment practices.',
    category: 'Security',
    tag: 'Security',
    image: 'images/project-sample-1.svg'
  }
];

const testimonials = [
  {
    name: 'Sarah N.',
    role: 'School Administrator',
    quote: 'NileTech helped our school launch a student portal and improved communication across classrooms.',
  },
  {
    name: 'John M.',
    role: 'SME Owner',
    quote: 'The cloud hosting package gives us peace of mind, and the support team responds quickly.',
  },
  {
    name: 'Grace K.',
    role: 'Government IT Lead',
    quote: 'Their cybersecurity audit identified real risks and helped our department secure sensitive data.',
  }
];

const storageKey = 'niletech-contact-draft';

function createServiceCard(service) {
  return `
    <article class="card">
      <span class="label">${service.tag}</span>
      <h3>${service.title}</h3>
      <p>${service.summary}</p>
      <p><strong>Category:</strong> ${service.category}</p>
    </article>
  `;
}

function renderServices(filterValue = '') {
  const list = document.querySelector('#service-list');
  if (!list) {
    return;
  }

  const normalized = filterValue.trim().toLowerCase();
  const filtered = services.filter((item) => {
    return item.title.toLowerCase().includes(normalized) ||
      item.summary.toLowerCase().includes(normalized) ||
      item.category.toLowerCase().includes(normalized);
  });

  if (!filtered.length) {
    list.innerHTML = `
      <div class="card">
        <h3>No matching services found</h3>
        <p>Try another keyword such as "cloud", "security", or "school".</p>
      </div>
    `;
    return;
  }

  list.innerHTML = filtered.map(createServiceCard).join('');
}

function handleSearch() {
  const searchInput = document.querySelector('#service-search');
  if (!searchInput) {
    return;
  }

  searchInput.addEventListener('input', (event) => {
    const value = event.target.value;
    renderServices(value);
  });
}

function renderTestimonials() {
  const target = document.querySelector('#testimonial-list');
  if (!target) {
    return;
  }

  target.innerHTML = testimonials
    .map((item) => `
      <article class="testimonial">
        <p>"${item.quote}"</p>
        <cite>${item.name}, ${item.role}</cite>
      </article>
    `)
    .join('');
}

function normalizePath(pathname) {
  if (!pathname) return '';
  const last = pathname.split('/').pop();
  if (last === '' || last === undefined) return 'index.html';
  return last;
}

function highlightNav() {
  const current = normalizePath(window.location.pathname);
  const links = document.querySelectorAll('nav a');

  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === current) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function getContactDraft() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

function saveContactDraft(values) {
  localStorage.setItem(storageKey, JSON.stringify(values));
}

function populateContactDraft() {
  const form = document.querySelector('#contact-form');
  if (!form) {
    return;
  }

  const draft = getContactDraft();
  if (!draft) {
    return;
  }

  Object.entries(draft).forEach(([name, value]) => {
    const input = form.querySelector(`[name="${name}"]`);
    if (input) {
      input.value = value;
    }
  });

  const note = document.querySelector('#contact-draft-note');
  if (note) {
    note.textContent = 'Draft loaded from local storage. Your progress is preserved.';
  }
}

function watchContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) {
    return;
  }

  form.addEventListener('input', () => {
    const values = Array.from(form.elements)
      .filter((field) => field.name)
      .reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
      }, {});

    saveContactDraft(values);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields before sending your message.');
      return;
    }

    localStorage.removeItem(storageKey);
    form.reset();

    const confirmation = document.querySelector('#contact-confirmation');
    if (confirmation) {
      confirmation.textContent = `Thank you, ${name}! Your message is ready to be reviewed. We will contact you soon.`;
      confirmation.style.display = 'block';
    }
  });
}

function setupPage() {
  highlightNav();
  renderTestimonials();
  handleSearch();
  renderServices('');
  populateContactDraft();
  watchContactForm();
}

document.addEventListener('DOMContentLoaded', setupPage);
