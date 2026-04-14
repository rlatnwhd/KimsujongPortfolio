/* ─────────────────────────────────────
   9. SKILL BARS — FILL ON SCROLL INTO VIEW
   책임 : 스킬 숙련도 바 애니메이션 (뷰포트 진입 시)
───────────────────────────────────── */
(function initSkillBars() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const fills = entry.target.querySelectorAll('.sk-fill');
      fills.forEach((fill, i) => {
        const level = fill.dataset.level || '0';
        setTimeout(() => { fill.style.width = level + '%'; }, i * 70);
      });
      io.unobserve(entry.target);
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.skill-group').forEach(g => io.observe(g));
})();
