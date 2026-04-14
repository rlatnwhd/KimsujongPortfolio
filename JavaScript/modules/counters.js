/* ─────────────────────────────────────
   8. COUNTER ANIMATION — 양방향 스크롤 연동
   진입: 0 → target 카운트업  /  이탈: 즉시 0으로 리셋 → 재진입 시 다시 카운트
───────────────────────────────────── */
(function initCounters() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const nums = entry.target.querySelectorAll('.stat-num[data-target]');
      if (entry.isIntersecting) {
        nums.forEach(el => {
          if (el._timer) { clearInterval(el._timer); }
          const target = +el.dataset.target;
          const dur = 1400;
          const step = target / (dur / 16);
          let cur = 0;
          el.textContent = 0;
          el._timer = setInterval(() => {
            cur += step;
            if (cur >= target) { el.textContent = target; clearInterval(el._timer); el._timer = null; }
            else el.textContent = Math.floor(cur);
          }, 16);
        });
      } else {
        nums.forEach(el => {
          if (el._timer) { clearInterval(el._timer); el._timer = null; }
          el.textContent = 0;
        });
      }
    });
  }, { threshold: 0.5 });
  const statsRow = document.querySelector('.stats-row');
  if (statsRow) io.observe(statsRow);
})();
