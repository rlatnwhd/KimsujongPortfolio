/* ═══════════════════════════════════
   waveAnim.js — rAF + Date.now() 기반
   seamless 무한 loop 웨이브 애니메이션
═══════════════════════════════════ */

(function () {
  var BASE_SPEED = 0.004;          // %/ms
  var LAYER_MULT = [1.0, 0.7, 0.5]; // wp1, wp2, wp3 속도 배율

  var tops  = document.querySelectorAll('#wave-top .wave-path');
  var bots  = document.querySelectorAll('#wave-bottom .wave-path');
  var start = Date.now();

  function tick() {
    var elapsed = Date.now() - start;
    for (var i = 0; i < LAYER_MULT.length; i++) {
      var x = -(elapsed * BASE_SPEED * LAYER_MULT[i]) % 50;
      var tx = 'translateX(' + x + '%)';
      if (tops[i]) tops[i].style.transform = tx;
      if (bots[i]) bots[i].style.transform = tx;
    }
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
