/* ─────────────────────────────────────
   4. HERO CANVAS PARTICLES
   책임 : 히어로 섹션 배경 파티클 애니메이션
───────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const COLORS = ['#3a9fd5', '#ffe066', '#52c45a', '#ffffff', '#5bb8e8'];
  let particles = [], W, H;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: -(Math.random() * 0.6 + 0.2),
      a: Math.random() * 0.5 + 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 45; i++) particles.push(createParticle());

  (function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.a;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.y < -10) { Object.assign(p, createParticle(), { y: H + 10 }); }
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  })();
})();
