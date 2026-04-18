/* ─────────────────────────────────────
   PROJECTS — Parallax Horizontal Scroll
   Architecture:
     • Vertical scroll → horizontal card movement (scroll proxy)
     • Cards: position absolute, clip-path parallelogram
     • .ps-bg    → background layer  (35% translateX parallax)
     • .ps-frame → content layer     (12% translateX parallax)
     • All movement via transform: translateX() only
───────────────────────────────────── */
(function initProjectsSection() {

  /* ─ Project data ─ */
  const PROJECTS = [
    {
      num: '01', emoji: '\uD83D\uDCD6',
      title: '\uC6F9 \uD504\uB85C\uADF8\uB798\uBC0D \uAC1C\uB150 \uC815\uB9AC',
      desc: 'HTML, CSS, JavaScript\uC758 \uD575\uC2EC \uAC1C\uB150\uC744 \uCCB4\uACC4\uC801\uC73C\uB85C \uD559\uC2B5\uD558\uACE0 \uC815\uB9AC\uD55C \uD559\uC2B5\uC6A9 \uC6F9\uC0AC\uC774\uD2B8\uC785\uB2C8\uB2E4. html \uAE30\uBCF8 \uBB38\uBC95, \uC2DC\uB9E8\uD2F1 \uD0DC\uADF8, CSS \uB808\uC774\uC544\uC6C3, \uC560\uB2C8\uBA54\uC774\uC158 \uB4F1 \uD504\uB860\uD2B8\uC5D4\uB4DC \uAE30\uCD08\uB97C \uC2E4\uC2B5\uD558\uBA70 \uC81C\uC791\uD588\uC2B5\uB2C8\uB2E4.',
      tags: ['HTML5', 'CSS3'], types: ['\uD559\uC2B5'], status: '\u2713 COMPLETED',
      bg: 'linear-gradient(140deg, #3a9fd5 0%, #1470a8 100%)',
    },
    {
      num: '02', emoji: '\uD83D\uDD04',
      title: '\uBE4C\uB824\uBD04 \u2014 \uC911\uACE0 \uB300\uC5EC \uC11C\uBE44\uC2A4',
      desc: '\uC911\uACE0 \uC0C1\uD488\uC744 \uC774\uC6A9\uC790\uB85C\uBD80\uD130 \uB300\uC5EC\uD558\uB294 \uC911\uACE0 \uB300\uC5EC \uC11C\uBE44\uC2A4\uC785\uB2C8\uB2E4. \uC0AC\uC6A9\uC790 \uC778\uC99D, \uBB3C\uD488 \uB4F1\uB85D/\uAC80\uC0C9, \uB300\uC5EC \uC2E0\uCCAD \uD750\uB984\uC744 \uAD6C\uD604\uD588\uC73C\uBA70 \uC9C1\uAD00\uC801\uC778 UX\uB97C \uC704\uD574 \uCEF4\uD3EC\uB10C\uD2B8 \uC124\uACC4\uC5D0 \uC9D1\uC911\uD588\uC2B5\uB2C8\uB2E4.',
      tags: ['Flutter', 'Dart', 'Firebase', 'Figma'], types: ['\uD300'], status: '\u2713 COMPLETED',
      bg: 'linear-gradient(140deg, #52c45a 0%, #28a030 100%)',
    },
    {
      num: '03', emoji: '\uD83C\uDFE1',
      title: '\uC5D0\uCF54 \uD558\uC6B0\uC2A4',
      desc: 'Unity\uB97C \uD65C\uC6A9\uD558\uBA70 \uC81C\uC791\uD55C 3D \uC2A4\uD1A0\uB9AC \uACF5\uD3EC\uAC8C\uC784 \uC785\uB2C8\uB2E4. \uD50C\uB808\uC774\uC5B4\uB294 \uD3D0\uAC74\uBB3C(\uD638\uD154)\uC5D0 \uAC07\uD78C \uC8FC\uC778\uACF5\uC774 \uB418\uC5B4 \uC9D1 \uC548\uC744 \uD0D0\uD5D8\uD558\uBA70 \uD37C\uC990\uC744 \uD480\uACE0 \uD0C8\uCD9C\uD558\uB294 \uACBD\uD5D8\uC744 \uD558\uAC8C \uB429\uB2C8\uB2E4.',
      tags: ['Unity', 'C#', '3D Modeling'], types: ['\uAC1C\uC778'], status: '\u2713 COMPLETED',
      bg: 'linear-gradient(140deg, #e07b39 0%, #b85720 100%)',
    },
    {
      num: '04', emoji: '\uD83C\uDFAE',
      title: '\uC6F9 \uC885\uD569\uAC8C\uC784',
      desc: 'Canvas API\uB97C \uD65C\uC6A9\uD574 \uC81C\uC791\uD55C \uBA40\uD2F0 \uAC8C\uC784 \uD3EC\uD138\uC785\uB2C8\uB2E4. \uC22B\uC790 \uC57C\uAD6C, \uC9C0\uB8B0\uCC3E\uAE30, \uD018\uC988, \uC288\uD305 \uAC8C\uC784 \uB4F1 \uB2E4\uC591\uD55C \uAC8C\uC784\uC744 \uC21C\uC218 JavaScript\uB85C \uAD6C\uD604\uD574 \uB85C\uC9C1\uACFC \uB80C\uB354\uB9C1 \uCD5C\uC801\uD654\uB97C \uC775\uD614\uC2B5\uB2C8\uB2E4.',
      tags: ['JavaScript', 'Canvas API', 'HTML5'], types: ['\uAC1C\uC778'], status: '\u2713 COMPLETED',
      bg: 'linear-gradient(140deg, #7c3aed 0%, #4c1d95 100%)',
    },
    {
      num: '05', emoji: '\u2601\uFE0F',
      title: 'Storoo \u2014 \uC790\uB8CC \uC800\uC7A5 \uC11C\uBE44\uC2A4',
      desc: '\uD300 \uD504\uB85C\uC81D\uD2B8\uB85C \uAC1C\uBC1C\uD55C \uD074\uB77C\uC6B0\uB4DC \uC790\uB8CC \uC800\uC7A5\u00B7\uACF5\uC720 \uC11C\uBE44\uC2A4\uC785\uB2C8\uB2E4. Flutter \uAE30\uBC18 \uD504\uB860\uD2B8\uC5D4\uB4DC\uC640 Flutter Isar \uBC31\uC5D4\uB4DC\uB97C \uC5F0\uB3D9\uD588\uC73C\uBA70, \uD0C0\uC785 \uC548\uC804\uC131 \uAC15\uD654\uC640 \uD611\uC5C5 \uACBD\uD5D8\uC744 \uC313\uC744 \uC218 \uC788\uC5C8\uC2B5\uB2C8\uB2E4.',
      tags: ['Flutter', 'Isar', 'Dart', 'CSS'], types: ['\uD300'], status: 'Working on it',
      bg: 'linear-gradient(140deg, #06b6d4 0%, #0369a1 100%)',
    },
  ];

  /* ─ DOM ─ */
  const zone  = document.getElementById('projects-zone');
  const pin   = document.getElementById('projects-pin');
  const container = document.getElementById('proj-cards');
  const bar   = document.getElementById('proj-bar');
  const dotsC = document.getElementById('proj-dots');
  const currC = document.getElementById('pCurr');
  if (!zone || !pin || !container) return;

  const N          = PROJECTS.length;
  const SKEW_VW    = 0.06;   // 6vw parallelogram skew / overlap
  const BG_SPEED   = 0.35;   // background parallax 35%
  const FR_SPEED   = 0.12;   // content frame parallax 12%

  /* ─ Wave dividers ─ */
  var waveTop    = document.getElementById('wave-top');
  var waveBottom = document.getElementById('wave-bottom');

  /* ─ Build cards (position: absolute) ─ */
  PROJECTS.forEach((p, i) => {
    const chips = p.types.map(t => '<span class="ps-type-chip">' + t + '</span>').join('');
    const tags  = p.tags.map(t => '<span class="ps-tag">' + t + '</span>').join('');

    const slide = document.createElement('div');
    slide.className = 'proj-slide';
    slide.style.zIndex = i + 1;

    slide.innerHTML =
      '<div class="ps-bg" style="background:' + p.bg + ';"></div>' +
      '<div class="ps-frame">' +
        '<div class="ps-img-area">' +
          '<div class="ps-img-inner">' +
            '<div class="ps-type-chips">' + chips + '</div>' +
            '<span class="ps-emoji">' + p.emoji + '</span>' +
            '<span class="ps-num">' + p.num + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="ps-divider"></div>' +
        '<div class="ps-info-area">' +
          '<p class="ps-label-mini">PROJECT \u00B7 ' + p.num + '</p>' +
          '<h2 class="ps-title">' + p.title + '</h2>' +
          '<p class="ps-desc">' + p.desc + '</p>' +
          '<div class="ps-tags">' + tags + '</div>' +
          '<div class="ps-status">' + p.status + '</div>' +
        '</div>' +
      '</div>';

    container.appendChild(slide);
  });

  /* ─ Dots ─ */
  if (dotsC) {
    for (var i = 0; i < N; i++) {
      var d = document.createElement('div');
      d.className = 'pdot' + (i === 0 ? ' done' : '');
      dotsC.appendChild(d);
    }
  }
  var allDots = dotsC ? dotsC.querySelectorAll('.pdot') : [];

  /* ─ Zone height (vertical scroll space = proxy) ─ */
  function setZoneHeight() {
    zone.style.height = (N * 100) + 'vh';
  }
  setZoneHeight();

  /* ─ Cache DOM references ─ */
  var slides = container.querySelectorAll('.proj-slide');
  var bgs    = container.querySelectorAll('.ps-bg');
  var frames = container.querySelectorAll('.ps-frame');

  /* ─ Lerp state ─ */
  var LERP     = 0.08;
  var targetX  = 0;
  var currentX = 0;
  var rafId    = null;

  /* ─ Helpers ─ */
  function getStep() { return window.innerWidth * (1 - SKEW_VW); }
  function getMaxX() { return (N - 1) * getStep(); }

  /* Compute targetX from the vertical scroll proxy */
  function scrollToTargetX() {
    var zoneRect = zone.getBoundingClientRect();
    var zoneTop  = -zoneRect.top;
    var zoneH    = zone.offsetHeight - window.innerHeight;
    if (zoneH <= 0) return targetX;
    var prog = Math.max(0, Math.min(1, zoneTop / zoneH));
    return prog * getMaxX();
  }

  /* ─ DOM rendering — always reads currentX ─ */
  function renderDOM() {
    var step = getStep();
    var maxX = getMaxX();

    for (var i = 0; i < N; i++) {
      slides[i].style.transform = 'translateX(' + (i * step - currentX) + 'px)';
      var lo = currentX - i * step;
      bgs[i].style.transform    = 'translateX(' + (lo * BG_SPEED) + 'px)';
      frames[i].style.transform = 'translateX(' + (lo * FR_SPEED) + 'px)';
    }

    var prog = maxX > 0 ? currentX / maxX : 0;
    var idx  = Math.min(Math.round(prog * (N - 1)), N - 1);
    allDots.forEach(function(d, j) { d.classList.toggle('done', j <= idx); });
    if (currC) currC.textContent = idx + 1;
    if (bar)   bar.style.width = (prog * 100).toFixed(1) + '%';

    /* ─ Wave divider visibility ─
       진입 중(prog < 0.05) → wave-top 보임
       탈출 중(prog > 0.95) → wave-bottom 보임
       그 사이 → 둘 다 숨김 */
    if (waveTop)    waveTop.classList.toggle('visible', prog < 0.05);
    if (waveBottom) waveBottom.classList.toggle('visible', prog > 0.95);
  }

  /* ─ rAF lerp tick ─ */
  function tick() {
    currentX += (targetX - currentX) * LERP;

    if (Math.abs(targetX - currentX) < 0.05) {
      currentX = targetX;
      renderDOM();
      rafId = null;   // stop loop
      return;
    }

    renderDOM();
    rafId = requestAnimationFrame(tick);
  }

  function scheduleRaf() {
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  /* ─ Scroll: vertical proxy → update targetX + wave visibility ─ */
  window.addEventListener('scroll', function() {
    targetX = scrollToTargetX();
    scheduleRaf();

    /* wave 가시성: 프로젝트 구역 진입 직전/탈출 직후에도 표시 */
    var zRect = zone.getBoundingClientRect();
    var vh    = window.innerHeight;
    /* 구역이 아직 화면 아래에 있을 때 — 접근 중이면 wave-top 표시 */
    if (zRect.top > 0 && zRect.top < vh) {
      if (waveTop) waveTop.classList.add('visible');
    }
    /* 구역이 화면 위로 지나간 뒤 — wave-bottom 표시 */
    if (zRect.bottom > 0 && zRect.bottom < vh) {
      if (waveBottom) waveBottom.classList.add('visible');
    }
  }, { passive: true });

  /* ─ Wheel on pin: preventDefault + deltaY → targetX ─ */
  pin.addEventListener('wheel', function(e) {
    /* Only intercept while section is actively pinned */
    var zoneRect = zone.getBoundingClientRect();
    if (zoneRect.top > 10 || zoneRect.bottom < window.innerHeight - 10) return;

    var maxX    = getMaxX();
    var atStart = targetX <= 0      && e.deltaY < 0;  // 첫 카드 + 위 스크롤
    var atEnd   = targetX >= maxX   && e.deltaY > 0;  // 마지막 카드 + 아래 스크롤

    /* 경계 이탈 방향 → preventDefault 안 함 → 네이티브 스크롤로 다음 섹션 진입 */
    if (atStart || atEnd) return;

    e.preventDefault();

    targetX = Math.max(0, Math.min(maxX, targetX + e.deltaY));

    /* Sync vertical scroll proxy so progress bar / dots stay consistent */
    var prog       = maxX > 0 ? targetX / maxX : 0;
    var zoneH      = zone.offsetHeight - window.innerHeight;
    var zoneAbsTop = window.scrollY + zone.getBoundingClientRect().top;
    window.scrollTo({ top: zoneAbsTop + prog * zoneH, behavior: 'instant' });

    scheduleRaf();
  }, { passive: false });

  /* ─ Resize ─ */
  window.addEventListener('resize', function() {
    setZoneHeight();
    targetX  = Math.min(targetX, getMaxX());
    currentX = Math.min(currentX, getMaxX());
    scheduleRaf();
  });

  /* ─ Initial render ─ */
  targetX  = scrollToTargetX();
  currentX = targetX;
  renderDOM();

})();