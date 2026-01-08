// Main JavaScript - Common functionality across all pages

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navLinks && navLinks.classList.contains('active') && 
        !event.target.closest('.nav-links') && 
        !event.target.closest('.mobile-menu-btn')) {
      navLinks.classList.remove('active');
    }
  });
  
  // Initialize page-specific features
  initPageFeatures();
});

function initPageFeatures() {
  // Check which page we're on and initialize accordingly
  const path = window.location.pathname;
  const page = path.split('/').pop();
  
  switch(page) {
    case 'index.html':
    case '':
      initHomePage();
      break;
    case 'emergency.html':
      initEmergencyPage();
      break;
    case 'guidance.html':
      initGuidancePage();
      break;
    case 'severe.html':
      initSeverePage();
      break;
    case 'nearby.html':
      initNearbyPage();
      break;
    case 'learn.html':
      initLearnPage();
      break;
  }
}

function initHomePage() {
  console.log('Initializing home page...');
  
  // Auto voice announcement on home page
  setTimeout(() => {
    if ('speechSynthesis' in window) {
      const welcomeMsg = new SpeechSynthesisUtterance();
      welcomeMsg.text = "Welcome to Emergency AI Guidance. Press the large red button to start emergency assistance.";
      welcomeMsg.rate = 0.9;
      window.speechSynthesis.speak(welcomeMsg);
    }
  }, 1000);
}
