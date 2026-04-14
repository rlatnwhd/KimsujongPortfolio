/* ─────────────────────────────────────
   10. NAV — SCROLL STATE + ACTIVE LINK
   책임 : 내비게이션 스크롤 상태 및 활성 링크 표시
───────────────────────────────────── */
(function initNav() {
  const navEl = document.querySelector('nav');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = Array.from(document.querySelectorAll('section[id], #projects-zone'));

  function update() {
    const sy = window.scrollY;
    // scrolled style
    if (navEl) navEl.classList.toggle('scrolled', sy > 60);
    // active section
    let active = '';
    sections.forEach(s => {
      if (sy >= s.offsetTop - 120) active = s.id;
    });
    navLinks.forEach(a => {
      const href = a.getAttribute('href').replace('#','');
      a.classList.toggle('active', href === active);
    });
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();
