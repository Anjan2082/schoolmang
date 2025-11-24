// event.js

document.addEventListener('DOMContentLoaded', () => {
  // AOS init (only if AOS script is loaded)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true
    });
  }

  // Toggle nav menu
  function toggleMenu() {
    const nav = document.getElementById('nav-menu');
    if (nav) nav.classList.toggle('active');
  }
  // If your HTML uses an onclick="toggleMenu()" on the hamburger, expose function globally:
  window.toggleMenu = toggleMenu;

  // Video play button (ensure ID matches the HTML: eventVideo)
  const video = document.getElementById('eventVideo');
  const playBtn = document.getElementById('playBtn');

  if (playBtn && video) {
    playBtn.addEventListener('click', () => {
      // try to play and hide the button on success
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            playBtn.style.display = 'none';
          })
          .catch((err) => {
            // autoplay might be blocked; show message or attempt to unmute then play
            console.warn('Video play blocked:', err);
          });
      } else {
        // older browsers
        video.play();
        playBtn.style.display = 'none';
      }
    });
  }

  // Countdown setup
  // Replace this with a fixed event date if you want a concrete date:
  // const eventDate = new Date('2025-12-26T09:30:00'); // example
  const eventDate = new Date();
  eventDate.setDate(eventDate.getDate() + 3); // keeps original behaviour (20 days from now)

  const dayEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function updateCountdown() {
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();

    if (isNaN(eventDate.getTime())) {
      console.error('Invalid event date');
      return;
    }

    if (diff <= 0) {
      // Event passed — show zeros and stop timer
      if (dayEl) dayEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (dayEl) dayEl.textContent = pad(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minutesEl) minutesEl.textContent = pad(minutes);
    if (secondsEl) secondsEl.textContent = pad(seconds);
  }

  // run once then every second
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
});
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });