const resorts = [
  {
    name: 'Relax Beach Villas',
    location: 'Maui, Hawaii',
    price: '$420/night',
    tags: ['Lagoon pool', 'Butler', 'Spa'],
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Coral Reef Bungalows',
    location: 'Phuket, Thailand',
    price: '$310/night',
    tags: ['Overwater', 'Snorkel', 'Sunset deck'],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Palm Vista Retreat',
    location: 'Key West, Florida',
    price: '$360/night',
    tags: ['Infinity pool', 'Seaside dining', 'Yoga'],
    image: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Azure Cliffs Resort',
    location: 'Amalfi, Italy',
    price: '$520/night',
    tags: ['Cliff views', 'Private chef', 'Spa cave'],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Silver Pine Springs',
    location: 'Jackson, Wyoming',
    price: '$290/night',
    tags: ['Hot springs', 'Fireplace', 'Mountain air'],
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Lagoon Bay Escape',
    location: 'Bora Bora, French Polynesia',
    price: '$680/night',
    tags: ['Overwater', 'Glass floors', 'Private deck'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
  }
];

const resortGrid = document.getElementById('resortGrid');
const navLinks = document.querySelectorAll('.nav__link');
const contactForm = document.querySelector('.contact__form');

function renderResorts() {
  if (!resortGrid) return;
  const markup = resorts
    .map(
      (resort) => `
        <article class="resort-card reveal">
          <img src="${resort.image}" alt="${resort.name}" loading="lazy" />
          <div class="resort-card__body">
            <div class="resort-card__top">
              <div>
                <h3>${resort.name}</h3>
                <p>${resort.location}</p>
              </div>
              <span class="price">${resort.price}</span>
            </div>
            <div class="resort-card__tags">
              ${resort.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
            </div>
          </div>
        </article>
      `
    )
    .join('');

  resortGrid.innerHTML = markup;
}

function setupReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

function setupSmoothScroll() {
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function setupContactForm() {
  if (!contactForm) return;
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = contactForm.querySelector('button[type="submit"]');
    if (button) {
      const original = button.textContent;
      button.textContent = 'Request sent ✓';
      setTimeout(() => {
        button.textContent = original;
        contactForm.reset();
      }, 1800);
    }
  });
}

renderResorts();
setupReveal();
setupSmoothScroll();
setupContactForm();

