// ============================================
// PHOTOGRAPHY WEBSITE - INTERACTIVE FEATURES
// ============================================

// Document Ready
document.addEventListener('DOMContentLoaded', function () {
  initNavbar();
  initMobileMenu();
  initGalleryLightbox();
  initScrollReveal();
  initContactForm();
  initSmoothScroll();
  initPortfolioTabs();
  initVideoThumbnails();
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbar() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');

      // Animate hamburger icon
      const spans = mobileMenuToggle.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
    });

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.remove('active'));
      });
    });
  }
}

// ============================================
// GALLERY LIGHTBOX
// ============================================
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');

  if (!lightbox || !lightboxImage || !lightboxClose) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', function () {
      const imageSrc = this.getAttribute('data-image') || this.querySelector('img').src;
      lightboxImage.src = imageSrc;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });

  // Close lightbox
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  function reveal() {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const revealPoint = 100;

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  }

  // Initial check
  reveal();

  // Check on scroll
  window.addEventListener('scroll', reveal);
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    // Validate
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Simulate form submission (replace with actual backend integration)
    console.log('Form submitted:', formData);

    // Show success message
    alert('Thank you for your message! I will get back to you soon.');

    // Reset form
    contactForm.reset();
  });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Skip if it's just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ============================================
// PORTFOLIO TABS
// ============================================
function initPortfolioTabs() {
  const tabs = document.querySelectorAll('.portfolio-tab');
  const contents = document.querySelectorAll('.portfolio-content');

  if (!tabs.length || !contents.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      const targetTab = this.getAttribute('data-tab');

      // Remove active class from all tabs and contents
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // Add active class to clicked tab and corresponding content
      this.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });
}

// ============================================
// VIDEO THUMBNAILS
// ============================================
function initVideoThumbnails() {
  const videoItems = document.querySelectorAll('.video-item[data-video-id]');

  videoItems.forEach(item => {
    const thumbnail = item.querySelector('.video-thumbnail');
    if (!thumbnail) return;

    thumbnail.addEventListener('click', function () {
      const videoId = item.getAttribute('data-video-id');
      const videoWrapper = document.createElement('div');
      videoWrapper.className = 'video-wrapper';

      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');

      videoWrapper.appendChild(iframe);
      thumbnail.parentNode.replaceChild(videoWrapper, thumbnail);
    });
  });
}

// ============================================
// LAZY LOADING (if needed for performance)
// ============================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => imageObserver.observe(img));
}
