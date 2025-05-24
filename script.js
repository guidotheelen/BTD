document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav-links');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      nav.classList.toggle('open');
    });

    // Close the mobile menu when clicking outside of it
    document.addEventListener('click', function(event) {
      if (
        nav.classList.contains('open') &&
        !nav.contains(event.target) &&
        !hamburger.contains(event.target)
      ) {
        nav.classList.remove('open');
      }
    });
  }

  // Highlight the active page in the navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});
