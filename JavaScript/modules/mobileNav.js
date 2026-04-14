/* ─────────────────────────────────────
   11. MOBILE NAV TOGGLE
   책임 : 모바일 햄버거 메뉴 열기/닫기
───────────────────────────────────── */
(function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    toggle.classList.remove('active');
    links.classList.remove('open');
  }));
})();
