// script.js

// DOM refs
const menuIcon = document.getElementById('menu');
const navbar = document.querySelector('.navbar');
const preloader = document.getElementById('preloader');
const scrollTopBtn = document.getElementById('scroll-top');
const navLinks = document.querySelectorAll('.navbar a');

// Toggle mobile nav
menuIcon.addEventListener('click', () => {
  document.querySelector('.navbar').classList.toggle('nav-toggle');
  menuIcon.classList.toggle('fa-times');
});

// Preloader fade out
window.addEventListener('load', () => {
  if (preloader) {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600);
  }
});

// Update active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 90;
    const sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.navbar a.active')?.classList.remove('active');
      const el = document.querySelector('.navbar a[href*=' + sectionId + ']');
      if (el) el.classList.add('active');
    }
  });

  // scroll top button
  if (window.scrollY > window.innerHeight) {
    scrollTopBtn.classList.add('active');
  } else {
    scrollTopBtn.classList.remove('active');
  }
});

// Smooth scroll for internal nav links (optional enhancement)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile nav if open
      if (navbar.classList.contains('nav-toggle')) {
        navbar.classList.remove('nav-toggle');
        menuIcon.classList.remove('fa-times');
      }
    }
  });
});

// simple tilt fallback (if vanilla-tilt not included)
// try to add a slight hover transform for .tilt images
document.querySelectorAll('.tilt').forEach(img => {
  img.addEventListener('mousemove', e => {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    img.style.transform = `translate3d(${x*0.02}px, ${y*0.02}px, 0)`;
  });
  img.addEventListener('mouseleave', () => {
    img.style.transform = '';
  });
});
