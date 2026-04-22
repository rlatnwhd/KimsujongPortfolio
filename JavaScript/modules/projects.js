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
      num: '01',
      title: '웹 기초 정리',
      themeBg: '#ffffff',
      themeText: '#111111',
      type: 'PC',
      service: '웹',
      techs: ['HTML', 'CSS'],
      contrib: ['프론트 100%', '디자인 100%'],
      team: '개인',
      overview: [
        'HHTML · CSS 핵심 개념을 주제별 카드 형태로 정리한 웹 프론트엔드 학습용 사이트',
        '기본 문서태그, 이미지·하이퍼링크, 폼·표 만들기 등 HTML 필수 요소를 직접 실습하며 제작',
        'CSS 기초, 시맨틱 태그, 선택자, 멀티미디어, 애니메이션 등 실무 핵심 CSS3 문법 학습 및 정리',
        '각 주제를 독립 페이지로 구성하여 항목별 탐색이 가능한 반응형 구조로 설계',
      ],
      learned: 'HTML/CSS 기초를 탄탄히 다지며 웹 구조 설계 방식에 대한 감각을 키울 수 있었습니다.',
      liveUrl: 'https://rlatnwhd.github.io/Web-arrangement/',
      githubUrl: 'https://github.com/rlatnwhd/Web-arrangement',
      imgBase: 'images/projects/web-basic',
    },
    {
      num: '02',
      title: '빌려봄',
      themeBg: '#3154FF',
      themeText: '#ffffff',
      type: '모바일, 반응형',
      service: '애플리케이션',
      techs: ['Flutter', 'Dart', 'C#'],
      contrib: ['프론트 60%', '디자인 100%'],
      team: '팀',
      overview: [
        '중고 물품을 이용자로부터 대여하는 중고 대여 서비스',
        '사용자 인증, 물품 등록/검색, 대여 신청 흐름 구현',
        '직관적인 UX를 위해 컴포넌트 설계에 집중',
        'Flutter 상태 관리 및 데이터베이스의 무결성 유지에 대한 이해 심화',
      ],
      learned: '팀 협업 과정에서 코드 컨벤션과 역할 분담의 중요성을 배웠습니다. Flutter로 개발한 첫 앱이여서 디자인이 아쉽긴 하지만 많은 것을 배울 수 있었습니다.',
      liveUrl: null,
      githubUrl: 'https://github.com/Renty-Project-Team',
      imgBase: 'images/projects/billyeobeom',
    },
    {
      num: '03',
      title: '에코 호텔',
      themeBg: '#5a5a5a',
      themeText: '#ffffff',
      type: 'PC',
      service: '게임',
      techs: ['Unity', 'C#'],
      contrib: ['프론트 100%', '디자인 100%'],
      team: '개인',
      overview: [
        'Unity를 활용하여 제작한 3D 스토리 공포게임',
        '플레이어는 폐건물(호텔)에 갇힌 주인공이 되어 호텔 안을 탐험하고 단서를 찾아 탈출',
        '건물 안에 숨겨진 오브젝트를 찾아 상호작용 하고, 점프스퀘어를 이용해 공포 연출',
        'C# 스크립팅으로 게임 로직 전체 구현 및 AI를 활용한 스토리 구상',
      ],
      learned: 'Unity 엔진 구조와 게임 루프 설계 방식을 깊이 이해할 수 있었습니다.',
      liveUrl: null,
      githubUrl: 'https://github.com/rlatnwhd/EchoHouse',
      imgBase: 'images/projects/echohouse',
    },
    {
      num: '04',
      title: '웹 종합게임',
      themeBg: '#8b5cf6',
      themeText: '#ffffff',
      type: 'PC, 모바일, 반응형',
      service: '웹 게임',
      techs: ['HTML', 'CSS', 'JavaScript'],
      contrib: ['프론트 100%', '디자인 100%'],
      team: '개인',
      overview: [
        'Canvas API를 활용해 제작한 멀티 게임 포털',
        '숫자 야구, 박스 피하기, 서바이벌, 슈팅 게임 등 다양한 게임 구현',
        '순수 JavaScript로 로직과 렌더링 최적화',
        '반응형 레이아웃으로 모바일 환경 대응',
      ],
      learned: 'JavaScript 로직 설계와 Canvas 렌더링 최적화 방법을 깊이 익혔습니다.',
      liveUrl: 'https://rlatnwhd.github.io/Assorted-Games/',
      githubUrl: 'https://github.com/rlatnwhd/Assorted-Games',
      imgBase: 'images/projects/webgame',
    },
    {
      num: '05',
      title: '스토루',
      themeBg: '#ffffff',
      themeText: '#111111',
      type: '모바일, 반응형',
      service: '앱',
      techs: ['Flutter', 'Dart', 'Figma'],
      contrib: ['프론트 100%', '디자인 100%'],
      team: '팀',
      overview: [
        '팀 프로젝트로 개발한 클라우드 자료 저장·공유 서비스',
        'Flutter 기반 프론트엔드와 백엔드 연동',
        '타입 안전성 강화와 협업 경험 축적',
        'UI/UX 설계 및 Figma 프로토타이핑 담당',
      ],
      learned: '팀 내 소통과 역할 조율이 프로젝트 품질에 얼마나 큰 영향을 주는지 느꼈고, 디자인한 UI가 실제로 구현되고 결과를 보는 만족감이 특히 컸습니다.',
      liveUrl: null,
      githubUrl: 'https://github.com/Team-Storoo',
      imgBase: 'images/projects/storoo',
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

  /* ─ Lightbox ─ */
  let lb = document.getElementById('ps-lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'ps-lightbox';
    lb.innerHTML = '<img id="ps-lb-img" src="" alt="" /><button id="ps-lb-close">닫기</button>';
    document.body.appendChild(lb);
    document.getElementById('ps-lb-close').addEventListener('click', function() {
      lb.classList.remove('ps-lb-open');
      document.body.style.overflow = '';
    });
    lb.addEventListener('click', function(e) {
      if (e.target === lb) {
        lb.classList.remove('ps-lb-open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ─ Build cards (position: absolute) ─ */
  PROJECTS.forEach((p, i) => {
    const techLines = p.techs.map(t => '<span>' + t + '</span>').join('');
    const contribLines = p.contrib.map(c => '<span>' + c + '</span>').join('');
    const typeLines = p.type.split(',').map(function(t) { return '<span>' + t.trim() + '</span>'; }).join('');
    const overviewItems = p.overview.map(o => '<li>' + o + '</li>').join('');
    // 앱(모바일) 유형: 2번(i=1), 5번(i=4) → 세로 기준 채우기
    const isApp = (i === 1 || i === 4);
    const mainWrapClass = isApp ? 'ps-main-img-wrap ps-img-app' : 'ps-main-img-wrap';
    const cellClass = isApp ? 'ps-screen-cell ps-cell-app' : 'ps-screen-cell';

    // hover 클래스: 1번(i=0), 5번(i=4) → 검정배경 hover / 2,3,4번 → 흰배경 hover
    const hoverClass = (i === 0 || i === 4) ? ' ps-btn-dark-hover' : ' ps-btn-light-hover';

    // 버튼 영역
    let btns = '';
    if (p.liveUrl) {
      btns =
        '<a href="' + p.liveUrl + '" target="_blank" rel="noopener noreferrer" class="ps-btn ps-btn-view' + hoverClass + '" style="border-color:' + p.themeText + ';color:' + p.themeText + ';">보기</a>' +
        '<a href="' + p.githubUrl + '" target="_blank" rel="noopener noreferrer" class="ps-btn ps-btn-gh' + hoverClass + '" style="border-color:' + p.themeText + ';color:' + p.themeText + ';">깃허브</a>';
    } else {
      btns =
        '<a href="' + p.githubUrl + '" target="_blank" rel="noopener noreferrer" class="ps-btn ps-btn-gh ps-btn-full' + hoverClass + '" style="border-color:' + p.themeText + ';color:' + p.themeText + ';">깃허브</a>';
    }

    const slide = document.createElement('div');
    slide.className = 'proj-slide';
    slide.style.zIndex = i + 1;

    slide.innerHTML =
      '<div class="ps-bg" style="background:' + p.themeBg + ';"></div>' +
      '<div class="ps-frame">' +
        // ── 좌측: 이미지 구역
        '<div class="ps-img-area" style="background:' + p.themeBg + ';">' +
          // 대표 이미지 (클릭 이벤트 없음)
          '<div class="' + mainWrapClass + '">' +
            '<img src="' + p.imgBase + '/대표.png" alt="' + p.title + ' 대표 이미지" class="ps-main-img" onerror="this.parentElement.classList.add(\'ps-img-fallback\');this.remove();this.parentElement.dataset.num=\'' + p.num + '\';" />' +
          '</div>' +
          // 화면 구성 그리드 (div wrapper 클릭으로 라이트박스 오픈)
          '<div class="ps-screen-section">' +
            '<p class="ps-screen-label" style="color:' + p.themeText + ';">화면 구성</p>' +
            '<div class="ps-screen-grid">' +
              '<div class="' + cellClass + '" onclick="(function(el){var img=el.querySelector(\'img\');if(img&&img.src){var l=document.getElementById(\'ps-lightbox\');document.getElementById(\'ps-lb-img\').src=img.src;l.classList.add(\'ps-lb-open\');document.body.style.overflow=\'hidden\';}})(this);"><img src="' + p.imgBase + '/화면1.png" alt="" onerror="this.parentElement.classList.add(\'ps-img-fallback\');" /></div>' +
              '<div class="' + cellClass + '" onclick="(function(el){var img=el.querySelector(\'img\');if(img&&img.src){var l=document.getElementById(\'ps-lightbox\');document.getElementById(\'ps-lb-img\').src=img.src;l.classList.add(\'ps-lb-open\');document.body.style.overflow=\'hidden\';}})(this);"><img src="' + p.imgBase + '/화면2.png" alt="" onerror="this.parentElement.classList.add(\'ps-img-fallback\');" /></div>' +
              '<div class="' + cellClass + '" onclick="(function(el){var img=el.querySelector(\'img\');if(img&&img.src){var l=document.getElementById(\'ps-lightbox\');document.getElementById(\'ps-lb-img\').src=img.src;l.classList.add(\'ps-lb-open\');document.body.style.overflow=\'hidden\';}})(this);"><img src="' + p.imgBase + '/화면3.png" alt="" onerror="this.parentElement.classList.add(\'ps-img-fallback\');" /></div>' +
              '<div class="' + cellClass + '" onclick="(function(el){var img=el.querySelector(\'img\');if(img&&img.src){var l=document.getElementById(\'ps-lightbox\');document.getElementById(\'ps-lb-img\').src=img.src;l.classList.add(\'ps-lb-open\');document.body.style.overflow=\'hidden\';}})(this);"><img src="' + p.imgBase + '/화면4.png" alt="" onerror="this.parentElement.classList.add(\'ps-img-fallback\');" /></div>' +
            '</div>' +
          '</div>' +
          // 버튼 영역
          '<div class="ps-btn-area">' + btns + '</div>' +
        '</div>' +
        // ── 우측: 텍스트 구역
        '<div class="ps-info-area">' +
          '<div class="ps-info-area-inner">' +
            '<p class="ps-label-mini">PROJECT · ' + p.num + '</p>' +
            '<h2 class="ps-title">' + p.title + '</h2>' +
            '<div class="ps-spec-row">' +
              '<div class="ps-spec-col"><span class="ps-spec-head">타입</span><span class="ps-spec-val ps-spec-type">' + typeLines + '</span></div>' +
              '<div class="ps-spec-col"><span class="ps-spec-head">서비스 유형</span><span class="ps-spec-val">' + p.service + '</span></div>' +
              '<div class="ps-spec-col"><span class="ps-spec-head">사용 기술</span><span class="ps-spec-val ps-spec-tech">' + techLines + '</span></div>' +
              '<div class="ps-spec-col"><span class="ps-spec-head">기여도</span><span class="ps-spec-val ps-spec-contrib">' + contribLines + '</span></div>' +
              '<div class="ps-spec-col"><span class="ps-spec-head">구분</span><span class="ps-spec-val">' + p.team + '</span></div>' +
            '</div>' +
            '<div class="ps-overview">' +
              '<p class="ps-overview-head">Overview</p>' +
              '<ul>' + overviewItems + '</ul>' +
            '</div>' +
            '<div class="ps-learned">' +
              '<p class="ps-learned-head">What I Learned</p>' +
              '<p class="ps-learned-text">' + p.learned + '</p>' +
            '</div>' +
          '</div>' +
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