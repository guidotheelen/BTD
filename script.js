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

  // Group session calendar on the costs page
  function renderCalendar(containerId, year, month, schedule) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    const monthNames = [
      'January','February','March','April','May','June',
      'July','August','September','October','November','December'
    ];

    const calendar = document.createElement('table');
    calendar.className = 'calendar';

    const caption = document.createElement('caption');

    const prev = document.createElement('span');
    prev.textContent = '\u25C0';
    prev.className = 'month-nav';
    const label = document.createElement('span');
    label.textContent = `${monthNames[month]} ${year}`;
    const next = document.createElement('span');
    next.textContent = '\u25B6';
    next.className = 'month-nav';

    caption.appendChild(prev);
    caption.appendChild(label);
    caption.appendChild(next);
    calendar.appendChild(caption);

    const headerRow = document.createElement('tr');
    const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    days.forEach(d => {
      const th = document.createElement('th');
      th.textContent = d;
      headerRow.appendChild(th);
    });
    calendar.appendChild(headerRow);

    let date = new Date(year, month, 1);
    let row = document.createElement('tr');
    for (let i = 0; i < (date.getDay() + 6) % 7; i++) {
      row.appendChild(document.createElement('td'));
    }

    const monthLength = new Date(year, month + 1, 0).getDate();
    const sessionDays = schedule[month] || [];
    for (let day = 1; day <= monthLength; day++) {
      if (row.children.length === 7) {
        calendar.appendChild(row);
        row = document.createElement('tr');
      }
      const cell = document.createElement('td');
      cell.textContent = day;
      if (sessionDays.includes(day)) {
        cell.classList.add('session-day');
      }
      row.appendChild(cell);
    }

    while (row.children.length < 7) {
      row.appendChild(document.createElement('td'));
    }
    calendar.appendChild(row);
    container.appendChild(calendar);

    prev.addEventListener('click', () => {
      const d = new Date(year, month - 1, 1);
      renderCalendar(containerId, d.getFullYear(), d.getMonth(), schedule);
    });
    next.addEventListener('click', () => {
      const d = new Date(year, month + 1, 1);
      renderCalendar(containerId, d.getFullYear(), d.getMonth(), schedule);
    });
  }

  if (document.getElementById('session-calendar')) {
    const schedule = {
      6: [6, 20]
    }; // example session dates
    renderCalendar('session-calendar', 2024, 0, schedule);
  }
});
