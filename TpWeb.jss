// HEADER & NAVBAR BEHAVIOR
const header = document.querySelector('.site-header');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-links a');
const backToTop = document.getElementById('backToTop');

// Close mobile menu para responsive
function closeMenu() {
  navLinks.classList.remove('open');
  menuToggle.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

// Toggle menu (hamburger) sa mobile version lang daw sabi ni Daniel
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});

// Auto-close menu kapag pumili ng nav link
navItems.forEach((link) => link.addEventListener('click', closeMenu));

// Scroll effect: navbar shadow + back-to-top button
window.addEventListener('scroll', () => {
  const isScrolled = window.scrollY > 20;
  header.classList.toggle('scrolled', isScrolled);
  backToTop.classList.toggle('visible', window.scrollY > 500);
});

// Smooth scroll to top
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// FACILITIES SLIDER
const facilities = [
  { title: 'Computer Laboratory', desc: 'A dedicated learning environment where students can practice programming, web development, and other computer-based activities.' },
  { title: 'Library', desc: 'A peaceful learning environment that provides access to books, references, and learning materials while supporting reading, studying, and academic growth.' },
  { title: 'Mezzanine Area', desc: 'A comfortable campus space for studying, waiting between classes, and collaborating with classmates.' },
  { title: 'Gym Court', desc: 'A spacious covered gym court designed for sports, school actvities, and student events.' },
  { title: 'Canteen', desc: 'A clean and comfortable dining area where students and staffs can relax, recharge, and enjoy affordable meals and snacks.' }
];

const facilityPhotos = document.querySelectorAll('.facility-photo');
const facilityTitle = document.getElementById('facility-title');
const facilityDesc = document.getElementById('facility-desc');
const facilityThumbs = document.getElementById('facilityThumbs');
const prevFacility = document.getElementById('prevFacility');
const nextFacility = document.getElementById('nextFacility');
let facilityIndex = 0;
let facilityTimer;

// Generate thumbs dynamically
facilities.forEach((facility, i) => {
  const thumb = document.createElement('button');
  thumb.className = 'thumb';
  thumb.type = 'button';
  thumb.setAttribute('aria-label', `Show ${facility.title}`);
  thumb.addEventListener('click', () => {
    showFacility(i);
    startFacilitySlider();
  });
  facilityThumbs.appendChild(thumb);
});
const thumbs = document.querySelectorAll('.thumb');

// Show facility by index
function showFacility(index) {
  facilityIndex = (index + facilities.length) % facilities.length;
  facilityPhotos.forEach((photo, i) => photo.classList.toggle('active', i === facilityIndex));
  thumbs.forEach((thumb, i) => thumb.classList.toggle('active', i === facilityIndex));
  facilityTitle.textContent = facilities[facilityIndex].title;
  facilityDesc.textContent = facilities[facilityIndex].desc;
}

// Auto-slide facilities every 7s
function startFacilitySlider() {
  clearInterval(facilityTimer);
  facilityTimer = setInterval(() => showFacility(facilityIndex + 1), 7000);
}

// Facility navigation buttons
prevFacility.addEventListener('click', () => {
  showFacility(facilityIndex - 1);
  startFacilitySlider();
});
nextFacility.addEventListener('click', () => {
  showFacility(facilityIndex + 1);
  startFacilitySlider();
});

// Initialize facilities slider
showFacility(0);
startFacilitySlider();


// REVEAL ANIMATIONS
const revealElements = document.querySelectorAll('.reveal, .reveal-on-load');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
revealElements.forEach((element) => revealObserver.observe(element));


// ACTIVE NAV HIGHLIGHT ON SCROLL
const sections = document.querySelectorAll('main section[id]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navItems.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach((section) => navObserver.observe(section));


// BASTA FACULTY SLIDER (carousel)
const track = document.querySelector('.slider-track');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

let index = 0;
const cardWidth = 364; // lapad ng card + margin
const visibleCount = 3; // ilang cards sabay nakikita
const totalCards = track.children.length;

// Update faculty slider position + arrow state
function updateSlider() {
  track.style.transform = `translateX(-${index * cardWidth}px)`;
  prevBtn.classList.toggle('inactive', index === 0);
  nextBtn.classList.toggle('inactive', index >= totalCards - visibleCount);
}

// Next button (batch scroll)
nextBtn.addEventListener('click', () => {
  if (index < totalCards - visibleCount) {
    index += visibleCount;
    if (index > totalCards - visibleCount) index = totalCards - visibleCount;
    updateSlider();
  }
});

// Prev button (batch scroll)
prevBtn.addEventListener('click', () => {
  if (index > 0) {
    index -= visibleCount;
    if (index < 0) index = 0;
    updateSlider();
  }
});

// Initialize faculty slider
updateSlider();
