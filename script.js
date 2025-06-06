// Mobile nav toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('primary-navigation');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Intersection Observer for fade-in effect on sections and hero
const observerOptions = {
  threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('section, .hero').forEach(section => {
  observer.observe(section);
});

// Smooth scroll for nav links (for browsers that may not support CSS scroll-behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if(target) {
      e.preventDefault();
      target.focus({preventScroll:false});
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
      // Close mobile menu if open
      if(navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', false);
      }
    }
  });
});

// Contact form validation & simulation of submission
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-button');
const feedback = document.getElementById('form-feedback');

// Error message elements
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

function validateEmail(email) {
  // Simple email regex
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function clearErrors() {
  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';
  feedback.textContent = '';
  // Clear input field borders
  document.getElementById('name').style.borderColor = '';
  document.getElementById('email').style.borderColor = '';
  document.getElementById('message').style.borderColor = '';
}

form.addEventListener('submit', e => {
  e.preventDefault();
  clearErrors();

  let isValid = true;

  if(!form.name.value.trim()) {
    nameError.textContent = 'Please enter your name.';
    document.getElementById('name').style.borderColor = '#dc2626';
    isValid = false;
  }
  if(!form.email.value.trim()) {
    emailError.textContent = 'Please enter your email.';
    document.getElementById('email').style.borderColor = '#dc2626';
    isValid = false;
  } else if(!validateEmail(form.email.value.trim())) {
    emailError.textContent = 'Please enter a valid email address.';
    document.getElementById('email').style.borderColor = '#dc2626';
    isValid = false;
  }
  if(!form.message.value.trim()) {
    messageError.textContent = 'Please enter a message.';
    document.getElementById('message').style.borderColor = '#dc2626';
    isValid = false;
  }

  if(!isValid) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Simulate form send delay
  setTimeout(() => {
    feedback.textContent = 'Thank you, ' + form.name.value.trim() + '! Your message has been sent.';
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }, 1800);
});
