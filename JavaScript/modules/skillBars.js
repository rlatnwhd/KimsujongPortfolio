/* ─────────────────────────────────────
   9. SKILL BARS — 양방향 스크롤 연동
   진입: 바 입력  /  이탈: 바 0으로 초기화 → 재진입 시 다시 애니메이션
───────────────────────────────────── */
(function initSkillBars() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const fills = entry.target.querySelectorAll('.sk-fill');
      if (entry.isIntersecting) {
        fills.forEach((fill, i) => {
          const level = fill.dataset.level || '0';
          setTimeout(() => { fill.style.width = level + '%'; }, i * 70);
        });
      } else {
        fills.forEach(fill => { fill.style.width = '0'; });
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.skill-group').forEach(g => io.observe(g));
})();
