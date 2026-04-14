/* ─────────────────────────────────────
   8. COUNTER ANIMATION — STATS
   책임 : About 섹션 숫자 카운터 애니메이션
───────────────────────────────────── */
(function initCounters() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const nums = entry.target.querySelectorAll('.stat-num[data-target]');
      nums.forEach(el => {
        if (el.dataset.counted) return;
        el.dataset.counted = '1';
        const target = +el.dataset.target;
        const dur = 1400;
        const step = target / (dur / 16);
        let cur = 0;
        const timer = setInterval(() => {
          cur += step;
          if (cur >= target) { el.textContent = target; clearInterval(timer); }
          else el.textContent = Math.floor(cur);
        }, 16);
      });
      io.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  const statsRow = document.querySelector('.stats-row');
  if (statsRow) io.observe(statsRow);
})();
