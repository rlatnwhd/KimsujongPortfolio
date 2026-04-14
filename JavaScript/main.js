/* ══════════════════════════════════════
   MAIN.JS  |  Portfolio Interactive Layer
══════════════════════════════════════ */

/* ─────────────────────────────────────
   1. SCROLL PROGRESS BAR
───────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  function update() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = Math.round((scrollTop / docH) * 100) + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ─────────────────────────────────────
   2. CUSTOM CURSOR + SPARKS
───────────────────────────────────── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor || window.matchMedia('(pointer: coarse)').matches) return;

  let mx = 0, my = 0;
  const SPARKS = ['#3a9fd5', '#ffe066', '#52c45a', '#ff8bdb', '#ff9f66'];

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function spawnSpark(x, y) {
    const s = document.createElement('div');
    s.className = 'cspark';
    const angle = Math.random() * Math.PI * 2;
    const dist = 18 + Math.random() * 26;
    s.style.cssText = `left:${x}px;top:${y}px;background:${SPARKS[Math.floor(Math.random()*SPARKS.length)]};--dx:${Math.cos(angle)*dist}px;--dy:${Math.sin(angle)*dist}px;`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 580);
  }

  let sparkCount = 0;
  document.addEventListener('mousemove', e => {
    if (++sparkCount % 4 === 0) spawnSpark(e.clientX, e.clientY);
  });

  // Event delegation — works for dynamically generated elements too
  const HOVER_SEL = 'a, button, .sk, .hang-card, .nav-toggle, .btn, .tilt-card, .pdot';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(HOVER_SEL)) cursor.classList.add('hov');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(HOVER_SEL)) cursor.classList.remove('hov');
  });

})();

/* ─────────────────────────────────────
   3. CLOUD PARALLAX
───────────────────────────────────── */
(function initClouds() {
  const defs = [
    { el: document.getElementById('cl1'), speed: 0.04, base: 8  },
    { el: document.getElementById('cl2'), speed: 0.07, base: 20 },
    { el: document.getElementById('cl3'), speed: 0.05, base: 50 },
    { el: document.getElementById('cl4'), speed: 0.06, base: 75 },
  ].filter(d => d.el);

  function update() {
    const sy = window.scrollY;
    defs.forEach(({ el, speed, base }) => {
      el.style.transform = `translateY(${sy * speed}px)`;
    });
  }
  window.addEventListener('scroll', update, { passive: true });
})();

/* ─────────────────────────────────────
   4. HERO CANVAS PARTICLES
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

/* ─────────────────────────────────────
   5. TYPING EFFECT — HERO
───────────────────────────────────── */
(function initTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const words = ['Frontend Developer', 'UI / UX Enthusiast', 'React Developer', 'Creative Coder'];
  let wi = 0, ci = 0, del = false;

  function tick() {
    const word = words[wi];
    if (del) {
      el.textContent = word.slice(0, --ci);
      if (ci < 0) { del = false; wi = (wi + 1) % words.length; ci = 0; setTimeout(tick, 450); return; }
      setTimeout(tick, 55);
    } else {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { del = true; setTimeout(tick, 2200); return; }
      setTimeout(tick, 105);
    }
  }
  setTimeout(tick, 900);
})();

/* ─────────────────────────────────────
   6. SCROLL REVEAL — INTERSECTION OBSERVER
───────────────────────────────────── */
(function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

/* ─────────────────────────────────────
   7. TILT EFFECT
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

/* ─────────────────────────────────────
   8. COUNTER ANIMATION — STATS
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

/* ─────────────────────────────────────
   9. SKILL BARS — FILL ON SCROLL INTO VIEW
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

/* ─────────────────────────────────────
   10. NAV — SCROLL STATE + ACTIVE LINK
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

/* ─────────────────────────────────────
   11. MOBILE NAV TOGGLE
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

/* ─────────────────────────────────────
   12. CLOTHESLINE HORIZONTAL SCROLL PROJECTS
───────────────────────────────────── */

const PROJECTS = [
  {
    num: '01',
    emoji: '📖',
    title: '웹 프로그래밍 개념 정리',
    desc: 'HTML, CSS, JavaScript의 핵심 개념을 체계적으로 학습하고 정리한 학습용 웹사이트입니다. html 기본 문법, 시맨틱 태그, CSS 레이아웃, 애니메이션 등 프론트엔드 기초를 실습하며 제작했습니다.',
    tags: ['HTML5', 'CSS3'],
    types: ['학습'],
    status: '✓ COMPLETED',
    bg: 'linear-gradient(140deg, #3a9fd5 0%, #1470a8 100%)',
    link: '',
  },
  {
    num: '02',
    emoji: '🔄',
    title: '빌려봄 — 중고 대여 서비스',
    desc: '중고 상품을 이용자로부터 대여하는 중고 대여 서비스입니다. 사용자 인증, 물품 등록/검색, 대여 신청 흐름을 구현했으며 직관적인 UX를 위해 컴포넌트 설계에 집중했습니다.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Figma'],
    types: ['팀'],
    status: '✓ COMPLETED',
    bg: 'linear-gradient(140deg, #52c45a 0%, #28a030 100%)',
    link: '',
  },
  {
    num: '03',
    emoji: '🏡',
    title: '에코 하우스',
    desc: 'Unity를 활용하며 제작한 3D 스토리 공포게임 입니다. 플레이어는 폐건물(호텔)에 갇힌 주인공이 되어 집 안을 탐험하며 퍼즐을 풀고 탈출하는 경험을 하게 됩니다. Unity의 3D 모델링, 애니메이션, 인터랙션 구현 기술을 익히며 완성했습니다.',
    tags: ['Unity', 'C#', '3D Modeling', ],
    types: ['개인'],
    status: '✓ COMPLETED',
    bg: 'linear-gradient(140deg, #e07b39 0%, #b85720 100%)',
    link: '',
  },
  {
    num: '04',
    emoji: '🕹️',
    title: '웹 종합게임',
    desc: 'Canvas API를 활용해 제작한 멀티 게임 포털입니다. 숫자 야구, 지뢰찾기, 퀴즈, 슈팅 게임 등 다양한 게임을 순수 JavaScript로 구현해 로직과 렌더링 최적화를 익혔습니다.',
    tags: ['JavaScript', 'Canvas API', 'HTML5'],
    types: ['개인'],
    status: '✓ COMPLETED',
    bg: 'linear-gradient(140deg, #7c3aed 0%, #4c1d95 100%)',
    link: '',
  },
  {
    num: '05',
    emoji: '☁️',
    title: 'Storoo — 자료 저장 서비스',
    desc: '팀 프로젝트로 개발한 클라우드 자료 저장·공유 서비스입니다. Flutter 기반 프론트엔드와 Flutter Isar 백엔드를 연동했으며, 타입 안전성 강화와 협업 경험을 쌓을 수 있었습니다.',
    tags: ['Flutter', 'Isar', 'Dart', 'CSS'],
    types: ['팀'],
    status: 'Working on it',
    bg: 'linear-gradient(140deg, #06b6d4 0%, #0369a1 100%)',
    link: '',
  },
];

(function initClotheslineScroll() {
  const zone  = document.getElementById('projects-zone');
  const pin   = document.getElementById('projects-pin');
  const track = document.getElementById('proj-track');
  const bar   = document.getElementById('proj-bar');
  const dotsC = document.getElementById('proj-dots');
  const currC = document.getElementById('pCurr');
  if (!zone || !pin || !track) return;

  const N = PROJECTS.length;

  /* ─ Generate cards ─ */
  PROJECTS.forEach((p, i) => {
    const chips = p.types.map(t => `<span class="hc-type-chip">${t}</span>`).join('');
    const tags  = p.tags.map(t => `<span class="hc-tag">${t}</span>`).join('');

    const slide = document.createElement('div');
    slide.className = 'proj-slide';
    slide.innerHTML = `
      <div class="hang-assembly" data-idx="${i}">
        <div class="hang-clip"></div>
        <div class="hang-string"></div>
        <div class="hang-card">
          <div class="hc-visual" style="background:${p.bg};">
            <div class="hc-type-chips">${chips}</div>
            <span class="hc-emoji">${p.emoji}</span>
            <span class="hc-num">${p.num}</span>
          </div>
          <div class="hc-info">
            <div class="hc-title">${p.title}</div>
            <div class="hc-desc">${p.desc}</div>
            <div class="hc-tags">${tags}</div>
            <div class="hc-status">${p.status}</div>
          </div>
        </div>
      </div>
    `;
    track.appendChild(slide);
  });

  /* ─ Generate dots ─ */
  if (dotsC) {
    for (let i = 0; i < N; i++) {
      const d = document.createElement('div');
      d.className = 'pdot' + (i === 0 ? ' done' : '');
      dotsC.appendChild(d);
    }
  }
  const allDots = dotsC ? dotsC.querySelectorAll('.pdot') : [];
  const assemblies = track.querySelectorAll('.hang-assembly');

  /* ─ Set zone height = (N slides) * 100vh ─ */
  function setZoneHeight() {
    zone.style.height = (N * 100) + 'vh';
  }
  setZoneHeight();
  window.addEventListener('resize', setZoneHeight);

  /* ─ Scroll → horizontal translation + sway ─ */
  let prevScroll = 0;
  let velocity   = 0;

  function onScroll() {
    const zoneRect = zone.getBoundingClientRect();
    const zoneTop  = -zoneRect.top;                      // scroll into zone
    const zoneH    = zone.offsetHeight - window.innerHeight;
    if (zoneH <= 0) return;

    const progress = Math.max(0, Math.min(1, zoneTop / zoneH)); // 0→1
    const totalShift = (N - 1) * window.innerWidth;
    const tx = -progress * totalShift;

    track.style.transform = `translateX(${tx}px)`;

    /* Current card index */
    const raw = progress * (N - 1);
    const idx = Math.min(Math.round(raw), N - 1);

    /* Update dots & counter */
    allDots.forEach((d, j) => d.classList.toggle('done', j <= idx));
    if (currC) currC.textContent = idx + 1;
    if (bar) bar.style.width = (progress * 100).toFixed(1) + '%';

    /* Scroll velocity → sway rotation */
    const currScroll = window.scrollY;
    const delta = currScroll - prevScroll;
    velocity += (delta - velocity) * 0.2;        // smoothed velocity
    prevScroll = currScroll;

    const maxRotate = 6;  // degrees
    const sway = Math.max(-maxRotate, Math.min(maxRotate, velocity * 0.15));

    assemblies.forEach(a => {
      a.style.transform = `rotate(${sway}deg)`;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─ Slowly return sway to 0 when not scrolling ─ */
  let idleTimer = null;
  window.addEventListener('scroll', () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      velocity = 0;
      assemblies.forEach(a => {
        a.style.transition = 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)';
        a.style.transform = 'rotate(0deg)';
        setTimeout(() => { a.style.transition = 'transform 0.05s linear'; }, 850);
      });
    }, 120);
  }, { passive: true });
})();
