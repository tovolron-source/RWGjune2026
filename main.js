const DEFAULT_LETTER = `My Dearest Love,

Every moment with you feels like a beautiful dream I never want to wake from. Your smile brightens even my darkest days, and your laughter is the sweetest melody I could ever hear.

I'm endlessly grateful for your kindness, your warmth, and the way you make me feel so deeply loved. You inspire me to be a better person every single day.

Thank you for being my greatest adventure, my safe harbor, and my home. I love you more than words could ever express.

Forever yours,
❤️`;

const heartImgs = [
  './images/hearts/heart-1.png',
  './images/hearts/heart-2.png',
  './images/hearts/heart-3.png',
  './images/hearts/heart-4.png',
  './images/hearts/heart-5.png',
];

const flowerImages = [
  './images/flowers/flower1.png',
  './images/flowers/flower2.png',
  './images/flowers/flower3.png',
  './images/flowers/flower4.png',
  './images/flowers/flower5.png',
  './images/flowers/flower6.png',
  './images/flowers/flower7.png',
  './images/flowers/flower8.png',
  './images/flowers/flower9.png',
  './images/flowers/flower10.png',
  './images/flowers/flower11.png',
  './images/flowers/flower12.png',
];

// ── Preload all flower images once ──
const preloadedFlowers = flowerImages.map(src => {
  const img = new Image();
  img.src = src;
  return src;
});

function randomFlowerImg(size) {
  const src = preloadedFlowers[Math.floor(Math.random() * preloadedFlowers.length)];
  return `<img src="${src}" width="${size}" height="${size}" style="display:block;will-change:transform;">`;
}

const giftCover = document.querySelector('.gift-cover');
const giftBody  = document.querySelector('.gift-body');

giftBody.classList.add('pulse');

giftCover.addEventListener('click', () => {
  giftCover.classList.add('opening');
  giftCover.addEventListener('animationend', () => {
    giftCover.style.display = 'none';
    giftBody.classList.remove('pulse');
    giftBody.classList.add('opened');
    giftBody.addEventListener('animationend', () => {
      onGiftOpened();
    }, { once: true });
  }, { once: true });
});

// ── Hearts ──
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  const randomImg = heartImgs[Math.floor(Math.random() * heartImgs.length)];
  const img = document.createElement('img');
  img.src = randomImg;
  const size = 30 + Math.random() * 30;
  img.style.width = `${size}px`;
  img.style.height = `${size}px`;
  heart.appendChild(img);
  heart.style.left = `${Math.random() * 80 + 10}%`;
  heart.style.animationDuration = `${3 + Math.random() * 2}s`;
  document.getElementById('hearts-container').appendChild(heart);
  heart.addEventListener('animationend', () => heart.remove());
}

let heartInterval = setInterval(createHeart, 1500);

// ── Background floating flowers ──
function createFlower() {
  const size      = 30 + Math.random() * 60;
  const startX    = Math.random() * 110 - 5;
  const driftX    = (Math.random() - 0.5) * 200;
  const rotateEnd = (Math.random() - 0.5) * 720;
  const dur       = 6 + Math.random() * 6;
  const delay     = Math.random() * 8;

  const wrapper = document.createElement('div');
  wrapper.classList.add('flower');
  wrapper.style.cssText = `left:${startX}%;top:100%;width:${size}px;height:${size}px;opacity:${0.5 + Math.random() * 0.5};will-change:transform;`;
  wrapper.innerHTML = randomFlowerImg(size);
  document.getElementById('flowers-container').appendChild(wrapper);

  wrapper.animate([
    { transform: `translateY(0px) translateX(0px) rotate(0deg) scale(0.4)`, opacity: 0 },
    { transform: `translateY(-30vh) translateX(${driftX * 0.3}px) rotate(${rotateEnd * 0.3}deg) scale(1)`, opacity: parseFloat(wrapper.style.opacity), offset: 0.15 },
    { transform: `translateY(-70vh) translateX(${driftX * 0.7}px) rotate(${rotateEnd * 0.7}deg) scale(1.1)`, opacity: parseFloat(wrapper.style.opacity), offset: 0.7 },
    { transform: `translateY(-110vh) translateX(${driftX}px) rotate(${rotateEnd}deg) scale(0.8)`, opacity: 0 },
  ], {
    duration: dur * 1000,
    delay:    delay * 1000,
    easing:   'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    fill:     'forwards',
  });

  setTimeout(() => wrapper.remove(), (dur + delay + 0.5) * 1000);
}

let flowerInterval = setInterval(createFlower, 600);
for (let i = 0; i < 10; i++) createFlower();

// ── Flower burst ──
function triggerFlowerBurst(onComplete) {
  // Stop background animations to free up GPU during burst
  clearInterval(heartInterval);
  clearInterval(flowerInterval);

  const container = document.getElementById('burst-container');
  const overlay   = document.getElementById('fullscreen-overlay');
  const centerX   = window.innerWidth  / 2;
  const centerY   = window.innerHeight / 2;
  const isMobile  = window.innerWidth < 768;

  function centeredDist(min, max) {
    return min + Math.sqrt(Math.random()) * (max - min);
  }

  // Reduce counts on mobile
  const waves = [
    { count: isMobile ? 10 : 15, sizeMin: 50,  sizeMax: 80,  distMin: 20, distMax: 150, delay: 100, dur: [1.2, 2.0] },
    { count: isMobile ? 14 : 20, sizeMin: 60,  sizeMax: 110, distMin: 30, distMax: 200, delay: 300, dur: [1.5, 2.0] },
    { count: isMobile ? 18 : 25, sizeMin: 80,  sizeMax: 160, distMin: 20, distMax: 180, delay: 600, dur: [1.2, 2.0] },
  ];

  waves.forEach(wave => {
    setTimeout(() => {
      for (let i = 0; i < wave.count; i++) {
        const angle    = (i / wave.count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const distance = centeredDist(wave.distMin, wave.distMax);
        const size     = wave.sizeMin + Math.random() * (wave.sizeMax - wave.sizeMin);
        const delay    = Math.random() * 0.3;
        const duration = wave.dur[0] + Math.random() * (wave.dur[1] - wave.dur[0]);
        const tx       = Math.cos(angle) * distance;
        const ty       = Math.sin(angle) * distance;
        const rotate   = (Math.random() - 0.5) * 720;

        const el = document.createElement('div');
        el.classList.add('burst-flower');
        el.style.cssText = `left:${centerX}px;top:${centerY}px;will-change:transform;`;
        el.innerHTML = randomFlowerImg(size);
        container.appendChild(el);

        el.animate([
          { transform: `translate(-50%, -50%) scale(0) rotate(0deg)`, opacity: 0 },
          { transform: `translate(calc(${tx}px - 50%), calc(${ty}px - 50%)) scale(1.2) rotate(${rotate * 0.5}deg)`, opacity: 1, offset: 0.5 },
          { transform: `translate(calc(${tx}px - 50%), calc(${ty}px - 50%)) scale(1) rotate(${rotate}deg)`, opacity: 1 },
        ], {
          duration: duration * 1000,
          delay:    delay * 1000,
          fill:     'forwards',
          easing:   'cubic-bezier(0.34, 1.56, 0.64, 1)',
        });

        setTimeout(() => {
          el.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 300,
            fill: 'forwards',
          }).onfinish = () => el.remove();
        }, 1000);
      }
    }, wave.delay);
  });

  setTimeout(() => {
    overlay.innerHTML = '';
    overlay.classList.add('visible');

    const W = window.innerWidth;
    const H = window.innerHeight;
    const screenDiag = Math.sqrt(W ** 2 + H ** 2);

    // Fewer flowers on mobile — large ones cover more area anyway
    const count = isMobile ? 80 : 150;

    // Build all flowers in one fragment — one DOM insertion
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      let cx, cy;
      if (i < Math.floor(count * 0.4)) {
        // Center cluster
        cx = 50 + (Math.random() + Math.random() - 1) * 60;
        cy = 50 + (Math.random() + Math.random() - 1) * 60;
      } else {
        // Full scatter including bleed past edges
        cx = -10 + Math.random() * 120;
        cy = -10 + Math.random() * 120;
      }

      // Large flowers for edge coverage, small ones for center texture
      const isEdgeFiller = i >= Math.floor(count * 0.6);
      const size = isEdgeFiller
        ? screenDiag * (0.3 + Math.random() * 0.25)
        : Math.random() < 0.4
          ? screenDiag * (0.18 + Math.random() * 0.15)
          : screenDiag * (0.07 + Math.random() * 0.08);

      const delay = Math.random() * 1.2;
      const dur   = 0.5 + Math.random() * 0.7;
      const rot   = (Math.random() - 0.5) * 80;

      const f = document.createElement('div');
      f.classList.add('overlay-flower');
      f.style.cssText = `left:${cx}%;top:${cy}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${delay}s;will-change:transform;`;
      f.style.setProperty('--rot', `${rot}deg`);
      f.innerHTML = randomFlowerImg(size);
      fragment.appendChild(f);
    }

    overlay.appendChild(fragment); // single reflow
  }, 700);

  setTimeout(() => {
    if (onComplete) onComplete();
    setTimeout(reverseFlowersThenShowLetter, 60);
  }, 8000);
}

function onGiftOpened() {
  triggerFlowerBurst(() => {
    console.log('opened');
  });
}

// ── Edit letter toggle ──
let isEditing = false;

function toggleEdit() {
  const textEl     = document.getElementById('letter-text');
  const textareaEl = document.getElementById('letter-textarea');
  const btn        = document.getElementById('edit-btn');

  if (!isEditing) {
    textareaEl.value         = textEl.innerText;
    textEl.style.display     = 'none';
    textareaEl.style.display = 'block';
    btn.textContent          = 'Save';
    btn.classList.add('saving');
  } else {
    textEl.innerText         = textareaEl.value;
    textEl.style.display     = 'block';
    textareaEl.style.display = 'none';
    btn.textContent          = 'Edit Letter';
    btn.classList.remove('saving');
  }

  isEditing = !isEditing;
}

// ── Spawn background flowers inside letter overlay ──
function spawnLetterBgFlowers() {
  const container = document.getElementById('letter-bg-flowers');
  const fragment  = document.createDocumentFragment();
  for (let i = 0; i < 12; i++) {
    const size  = 60 + Math.random() * 100;
    const delay = Math.random() * 4;
    const dur   = 8 + Math.random() * 4;
    const f = document.createElement('div');
    f.classList.add('bg-flower');
    f.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${delay}s;`;
    f.innerHTML = randomFlowerImg(size);
    fragment.appendChild(f);
  }
  container.appendChild(fragment);
}

// ── Show love letter ──
function showLoveLetter() {
  spawnLetterBgFlowers();
  document.getElementById('letter-overlay').classList.add('visible');
}

// ── Reverse disappear then show letter ──
function reverseFlowersThenShowLetter() {
  const overlay   = document.getElementById('fullscreen-overlay');
  const flowerEls = Array.from(overlay.querySelectorAll('.overlay-flower'));
  const total     = flowerEls.length;
  const staggerDelay = 8;

  [...flowerEls].reverse().forEach((el, i) => {
    setTimeout(() => {
      el.animate([
        { transform: getComputedStyle(el).transform, opacity: 1 },
        { transform: `${getComputedStyle(el).transform} scale(0)`, opacity: 0 },
      ], {
        duration: 250,
        easing: 'cubic-bezier(0.55, 0, 1, 0.45)',
        fill: 'forwards',
      });
    }, i * staggerDelay);
  });

  const totalTime = total * staggerDelay + 300;

  setTimeout(() => {
    overlay.style.transition = 'opacity 0.6s ease';
    overlay.style.opacity    = '0';
    setTimeout(() => {
      overlay.classList.remove('visible');
      overlay.style.opacity = '';
      showLoveLetter();
    }, 600);
  }, totalTime);
}
