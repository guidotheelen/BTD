// Simple script to toggle login link when a user is stored in localStorage
window.addEventListener('DOMContentLoaded', () => {
  const loginLink = document.getElementById('login-link');
  if (!loginLink) return;

  const username = localStorage.getItem('btdUsername');
  if (username) {
    loginLink.textContent = 'Logout';
    loginLink.href = '#';
    loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('btdUsername');
      window.location.reload();
    });
  }
});
