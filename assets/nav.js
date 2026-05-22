/* ═══════════════════════════════
   STEM NINJA — nav.js
   Shared navigation behaviour
═══════════════════════════════ */

(function () {
  const NAV_HTML = `
<nav>
  <a class="nav-logo" href="/index.html">
    <img src="/assets/logo_animated.gif" alt="STEM Ninja logo">
    <span class="nav-logo-text">STEM<span> NINJA</span></span>
  </a>
  <ul class="nav-links">
    <li><a href="/index.html"          data-page="home">Home</a></li>
    <li><a href="/pages/about.html"    data-page="about">About</a></li>
    <li><a href="/pages/courses.html"  data-page="courses">Courses</a></li>
    <li><a href="/pages/tutoring.html" data-page="tutoring">Tutoring</a></li>
    <li><a href="/pages/notes.html"    data-page="notes">Notes</a></li>
    <li><a href="/pages/boosters.html" data-page="boosters">Grade Boosters</a></li>
    <li><a href="/pages/signup.html"   data-page="signup" class="nav-cta">Sign Up</a></li>
  </ul>
  <button class="nav-hamburger" aria-label="Menu" onclick="toggleMobile()">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="nav-mobile" id="nav-mobile">
  <a href="/index.html"          data-page="home">Home</a>
  <a href="/pages/about.html"    data-page="about">About</a>
  <a href="/pages/courses.html"  data-page="courses">Courses</a>
  <a href="/pages/tutoring.html" data-page="tutoring">Tutoring</a>
  <a href="/pages/notes.html"    data-page="notes">Notes</a>
  <a href="/pages/boosters.html" data-page="boosters">Grade Boosters</a>
  <a href="/pages/signup.html"   data-page="signup">Sign Up →</a>
</div>`;

  const placeholder = document.getElementById('nav-placeholder');
  if (placeholder) placeholder.outerHTML = NAV_HTML;

  const path = window.location.pathname;
  const page = path.split('/').pop().replace('.html','') || 'home';
  document.querySelectorAll('[data-page]').forEach(el => {
    if (el.dataset.page === page) el.classList.add('active');
  });

  window.toggleMobile = function () {
    document.getElementById('nav-mobile').classList.toggle('open');
  };
  document.addEventListener('click', e => {
    if (e.target.closest('#nav-mobile a')) {
      document.getElementById('nav-mobile').classList.remove('open');
    }
  });
})();
