/* ============================================================
   CONFIG — edit these to personalize the page
   (for the longer birthday messages — hero text, letter, and the
   closing celebration line — edit them directly in index.html,
   inside the [bracketed] placeholders marked "EDIT BELOW / ABOVE")
   ============================================================ */
const CONFIG = {
  recipientName: "Babe",   // shown on the intro card and lock screen
  passcode: "2806",        // digits typed on the lock screen keypad
  anniversaryDate: "06 · 08 · 2026",     // shown as TEXT on the hero screen
  anniversaryCheckDate: "2024-06-28",  // the date that must be entered on the new date screen — format: YYYY-MM-DD
  loadingMessage: "Loading your birthday surprise…"
};

/* ---------------- Screen navigation ---------------- */
const screens = document.querySelectorAll('.screen');
function showScreen(id){
  screens.forEach(s => s.classList.toggle('active', s.id === id));
}

/* ---------------- 1. Intro envelope screen ---------------- */
document.getElementById('introHeading').innerHTML = `Happy Birthday!<br>${CONFIG.recipientName}`;
document.getElementById('lockCaption').innerHTML = `Happy Birthday!<br>${CONFIG.recipientName}`;

const introEnvelope = document.getElementById('introEnvelope');
let introOpened = false;
introEnvelope.addEventListener('click', () => {
  if(introOpened) return;
  introOpened = true;
  introEnvelope.classList.add('opening');
  setTimeout(() => showScreen('screen-date'), 450); // now goes to the date screen first
});

/* ---------------- 1.5 Anniversary date screen ---------------- */
const dateCard = document.querySelector('.date-card');
const dateInput = document.getElementById('dateInput');
const dateError = document.getElementById('dateError');

function checkDate(){
  if(dateInput.value === CONFIG.anniversaryCheckDate){
    dateError.classList.remove('show');
    showScreen('screen-lock');
  } else {
    dateError.classList.add('show');
    dateCard.classList.add('shake');
    setTimeout(() => dateCard.classList.remove('shake'), 400);
  }
}

document.getElementById('dateSubmit').addEventListener('click', checkDate);
dateInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') checkDate();
});

/* ---------------- 2. Lock screen ---------------- */
const dotsEl = document.getElementById('dots');
const dots = dotsEl.querySelectorAll('span');
let entered = "";

document.getElementById('keypad').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if(!btn) return;
  const k = btn.dataset.k;

  if(k === 'clear'){ entered = ""; renderDots(); return; }
  if(k === 'back'){ entered = entered.slice(0,-1); renderDots(); return; }

  if(entered.length < CONFIG.passcode.length){
    entered += k;
    renderDots();
    if(entered.length === CONFIG.passcode.length){
      checkPasscode();
    }
  }
});

function renderDots(){
  dots.forEach((d,i) => d.classList.toggle('filled', i < entered.length));
}

function checkPasscode(){
  if(entered === CONFIG.passcode){
    setTimeout(startLoading, 250);
  } else {
    dotsEl.classList.add('shake');
    setTimeout(() => {
      dotsEl.classList.remove('shake');
      entered = "";
      renderDots();
    }, 400);
  }
}

/* ---------------- 3. Loading screen ---------------- */
function startLoading(){
  document.getElementById('loadLabel').textContent = CONFIG.loadingMessage;
  showScreen('screen-loading');
  const fill = document.getElementById('progressFill');
  requestAnimationFrame(() => { fill.style.width = '100%'; });
  setTimeout(() => {
    document.getElementById('heroDate').textContent = CONFIG.anniversaryDate;
    showScreen('screen-hero');
  }, 2000);
}

/* ---------------- 3 → 4 navigation ---------------- */
document.getElementById('toEnvelope').addEventListener('click', () => showScreen('screen-envelope'));
document.getElementById('toCake').addEventListener('click', () => {
  showScreen('screen-cake');
  playCakeBuild();
});
document.getElementById('restart').addEventListener('click', () => {
  introOpened = false;
  introEnvelope.classList.remove('opening');
  dateInput.value = "";
  dateError.classList.remove('show');
  entered = ""; renderDots();
  envelopeOpened = false;
  envelope.classList.remove('open');
  envelopeHint.style.opacity = 1;
  blown = false;
  flame.classList.remove('out');
  cakeScreen.classList.remove('build', 'ready');
  countdownScreen.classList.remove('dark');
  document.getElementById('screen-celebrate').classList.remove('daylight');
  fxRunning = false;
  particles = [];
  showScreen('screen-intro');
});

/* ---------------- 4. Envelope open interaction ---------------- */
const envelope = document.getElementById('envelope');
const envelopeHint = document.getElementById('envelopeHint');
let envelopeOpened = false;

envelope.addEventListener('click', () => {
  if(envelopeOpened) return;
  envelopeOpened = true;
  envelope.classList.add('open');
  envelopeHint.style.opacity = 0;
  setTimeout(() => showScreen('screen-letter'), 950);
});

/* ---------------- 6. Cake build animation ---------------- */
const cakeScreen = document.getElementById('screen-cake');
const BUILD_DURATION = 3500; // ms — must be >= candle-rig delay (2.95s) + its animation length (.5s), now later due to the cream-pour step

function playCakeBuild(){
  cakeScreen.classList.remove('build', 'ready');
  blown = false;
  flame.classList.remove('out');
  void cakeScreen.offsetWidth; // force reflow so the animation restarts every visit
  cakeScreen.classList.add('build');
  setTimeout(() => cakeScreen.classList.add('ready'), BUILD_DURATION);
}

/* ---------------- Candle blow interaction ---------------- */
const cakeRig = document.getElementById('cakeRig');
const flame = document.getElementById('flame');
let blown = false;
cakeRig.addEventListener('click', () => {
  if(blown || !cakeScreen.classList.contains('ready')) return;
  blown = true;
  flame.classList.add('out');
  setTimeout(() => {
    showScreen('screen-countdown');
    playCountdown();
  }, 700);
});

/* ---------------- 7. Countdown: 3, 2, 1 + sky transition ---------------- */
const countdownScreen = document.getElementById('screen-countdown');
const countdownNumber = document.getElementById('countdownNumber');

function playCountdown(){
  countdownScreen.classList.remove('dark');
  countdownNumber.textContent = '3';
  void countdownScreen.offsetWidth; // reflow so the sky-color transition restarts
  countdownScreen.classList.add('dark'); // pink/creamy → night sky begins right away
  popNumber();

  const sequence = [3, 2, 1];
  let step = 0;
  const tickTimer = setInterval(() => {
    step++;
    if(step < sequence.length){
      countdownNumber.textContent = sequence[step];
      popNumber();
    } else {
      clearInterval(tickTimer);
      setTimeout(() => {
        showScreen('screen-celebrate');
        launchFireworks();
        returnToDaylight();
        typewriter("Today isn't about growing older. It's about celebrating the amazing person you've become. The girl with the kindest heart. The prettiest smile. The warmest soul. The one who somehow managed to make my world brighter without even trying. I hope this new year of your life brings everything you've been quietly praying for. I hope your biggest dreams come true. I hope every difficult day becomes easier. I hope you're surrounded by people who love you the way you deserve to be loved. And I hope, years from now, when another birthday arrives, I'm still the one reminding you how special you are. Thank you for every smile you've given me. Thank you for every memory we've created. And thank you for choosing to let me be part of your life. Happy Birthday again, my love. Here's to more birthdays, more adventures, more moments together, and hopefully, a lifetime of us. 🎀♾️❤️.", 
          document.getElementById('celebrateTypewriter'));
      }, 650);
    }
  }, 800);
}

function popNumber(){
  countdownNumber.classList.remove('pop');
  void countdownNumber.offsetWidth;
  countdownNumber.classList.add('pop');
}

function returnToDaylight(){
  const cel = document.getElementById('screen-celebrate');
  cel.classList.remove('daylight');
  void cel.offsetWidth;
  cel.classList.add('daylight'); // CSS transition-delay holds black sky while fireworks play, then fades to pink/creamy
}

/* ---------------- 7. Fireworks canvas ---------------- */

function typewriter(text, el, speed = 50) {
  let i = 0;
  el.textContent = "";
  const timer = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}


const canvas = document.getElementById('fx-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let fxRunning = false;

function resizeCanvas(){
  canvas.width = canvas.clientWidth * devicePixelRatio;
  canvas.height = canvas.clientHeight * devicePixelRatio;
}
window.addEventListener('resize', resizeCanvas);

function spawnBurst(x, y, color){
  const count = 34;
  for(let i=0;i<count;i++){
    const angle = (Math.PI*2*i)/count;
    const speed = 1.5 + Math.random()*2.5;
    particles.push({ x, y, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed, life: 1, color });
  }
}

const fxColors = ['#f0c98a','#e0ab5f','#e8b4b8','#fbf1e4','#b0495a'];

function launchFireworks(){
  if(fxRunning) return;
  fxRunning = true;
  resizeCanvas();
  particles = [];

  let bursts = 0;
  const burstTimer = setInterval(() => {
    if(bursts >= 6){ clearInterval(burstTimer); return; }
    const x = canvas.width * (0.25 + Math.random()*0.5);
    const y = canvas.height * (0.25 + Math.random()*0.35);
    spawnBurst(x, y, fxColors[Math.floor(Math.random()*fxColors.length)]);
    bursts++;
  }, 550);

  requestAnimationFrame(tick);
}

function tick(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    p.x += p.vx * devicePixelRatio;
    p.y += p.vy * devicePixelRatio;
    p.vy += 0.02;
    p.life -= 0.012;
  });
  particles = particles.filter(p => p.life > 0);

  particles.forEach(p => {
    ctx.globalAlpha = Math.max(p.life,0);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.4*devicePixelRatio, 0, Math.PI*2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  if(fxRunning){
    requestAnimationFrame(tick);
  }
}

/* ---------------- Soft touch feedback — heart/sparkle on every tap ---------------- */
const tapIcons = ['💕','✨','🎀'];
document.addEventListener('pointerdown', (e) => {
  const heart = document.createElement('div');
  heart.className = 'tap-heart';
  heart.textContent = tapIcons[Math.floor(Math.random() * tapIcons.length)];
  heart.style.left = e.clientX + 'px';
  heart.style.top = e.clientY + 'px';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 900);
});




// /* ===== Floating Heart Cursor Effect ===== */

// /* ---- Config: tweak these to customize ---- */
// var colours = ['#ff3366', '#ff6699', '#ff33cc', '#ff99cc', '#ff66b2', '#ff0066']; // heart colors
// var minisize = 16;    // starting heart size (px)
// var maxisize = 28;    // max size before it "pops"
// var hearts = 66;      // total heart elements in the pool
// var over_or_under = "over"; // "over" = hearts render above page content

// /* ---- Internal state (don't need to touch these) ---- */
// var x = ox = 400;
// var y = oy = 300;
// var swide = 800;
// var shigh = 600;
// var sleft = sdown = 0;
// var herz = [];
// var herzx = [];
// var herzy = [];
// var herzs = [];
// var kiss = false;

// // Runs mwah() after page load without overwriting other window.onload handlers
// if (typeof('addRVLoadEvent') != 'function') function addRVLoadEvent(funky) {
//   var oldonload = window.onload;
//   if (typeof(oldonload) != 'function') {
//     window.onload = funky;
//   } else {
//     window.onload = function() {
//       if (oldonload) oldonload();
//       funky();
//     }
//   }
// }
// addRVLoadEvent(mwah);

// // Creates the pool of heart elements (hidden until used)
// function mwah() {
//   if (document.getElementById) {
//     var i, heart;
//     for (i = 0; i < hearts; i++) {
//       heart = createDiv("auto", "auto");
//       heart.style.visibility = "hidden";
//       heart.style.zIndex = (over_or_under == "over") ? "1001" : "0";
//       heart.style.color = colours[i % colours.length];
//       heart.style.pointerEvents = "none"; // don't block clicks
//       heart.style.opacity = 0.75;
//       heart.appendChild(document.createTextNode(String.fromCharCode(9829))); // ♥
//       document.body.appendChild(heart);
//       herz[i] = heart;
//       herzy[i] = false;
//     }
//     set_scroll();
//     set_width();
//     herzle();
//   }
// }

// // Main loop: spawns a heart on mouse move, animates all active hearts
// function herzle() {
//   var c;
//   if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
//     ox = x;
//     oy = y;
//     for (c = 0; c < hearts; c++) if (herzy[c] === false) {
//       herz[c].firstChild.nodeValue = String.fromCharCode(9829);
//       herz[c].style.left = (herzx[c] = x - minisize / 2) + "px";
//       herz[c].style.top = (herzy[c] = y - minisize) + "px";
//       herz[c].style.fontSize = minisize + "px";
//       herz[c].style.fontWeight = 'normal';
//       herz[c].style.visibility = 'visible';
//       herzs[c] = minisize;
//       break;
//     }
//   }
//   for (c = 0; c < hearts; c++) if (herzy[c] !== false) blow_me_a_kiss(c);
//   setTimeout(herzle, 40);
// }

// // Holding the mouse down keeps spawning hearts
// document.onmousedown = pucker;
// document.onmouseup = function() { clearTimeout(kiss); };
// function pucker() {
//   ox = -1;
//   oy = -1;
//   kiss = setTimeout(pucker, 100);
// }

// // Moves one heart upward, growing it, until it floats off-screen or pops
// function blow_me_a_kiss(i) {
//   herzy[i] -= herzs[i] / minisize + i % 2;
//   herzx[i] += (i % 5 - 2) / 5;

//   if (herzy[i] < sdown - herzs[i] || herzx[i] < sleft - herzs[i] || herzx[i] > sleft + swide - herzs[i]) {
//     herz[i].style.visibility = "hidden";
//     herzy[i] = false;
//   } else if (herzs[i] > minisize + 2 && Math.random() < .5 / hearts) {
//     break_my_heart(i);
//   } else {
//     if (Math.random() < maxisize / herzy[i] && herzs[i] < maxisize) {
//       herz[i].style.fontSize = (++herzs[i]) + "px";
//     }
//     herz[i].style.top = herzy[i] + "px";
//     herz[i].style.left = herzx[i] + "px";
//   }
// }

// // Turns the heart into a "broken heart" before hiding it
// function break_my_heart(i) {
//   herz[i].firstChild.nodeValue = String.fromCharCode(9676); // ○
//   herz[i].style.fontWeight = 'bold';
//   herzy[i] = false;
//   setTimeout(() => herz[i].style.visibility = "hidden", 400);
// }

// // Tracks mouse position
// document.onmousemove = mouse;
// function mouse(e) {
//   if (e) {
//     y = e.pageY;
//     x = e.pageX;
//   } else {
//     set_scroll();
//     y = event.y + sdown;
//     x = event.x + sleft;
//   }
// }

// // Keeps screen size updated on resize
// window.onresize = set_width;
// function set_width() {
//   swide = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//   shigh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
// }

// // Keeps scroll position updated
// window.onscroll = set_scroll;
// function set_scroll() {
//   sdown = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
//   sleft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
// }

// // Helper: creates a transparent, absolutely-positioned div for each heart
// function createDiv(height, width) {
//   var div = document.createElement("div");
//   div.style.position = "absolute";
//   div.style.height = height;
//   div.style.width = width;
//   div.style.overflow = "hidden";
//   div.style.backgroundColor = "transparent";
//   return div;
// }