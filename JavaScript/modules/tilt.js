/* ─────────────────────────────────────
   7. TILT EFFECT
   책임 : 마우스 이동에 따른 카드 3D 틸트 효과
───────────────────────────────────── */
(function initTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * -14;
      card.style.transition = 'transform 0.08s ease';
      card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s ease';
      card.style.transform = '';
    });
  });
})();
