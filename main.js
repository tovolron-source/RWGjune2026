

const DEFAULT_LETTER = `My Dearest Love,

Every moment with you feels like a beautiful dream I never want to wake from. Your smile brightens even my darkest days, and your laughter is the sweetest melody I could ever hear.

I'm endlessly grateful for your kindness, your warmth, and the way you make me feel so deeply loved. You inspire me to be a better person every single day.

Thank you for being my greatest adventure, my safe harbor, and my home. I love you more than words could ever express.

Forever yours,
❤️`;

// ---- Floating Hearts ----
const heartImgs = [
  'images/hearts/heart-1.png',
  'images/hearts/heart-2.png',
  'images/hearts/heart-3.png',
  'images/hearts/heart-4.png',
  'images/hearts/heart-5.png',
];

const flowerImages = [
  '/images/flowers/flower1.png',
  '/images/flowers/flower2.png',
  '/images/flowers/flower3.png',
  '/images/flowers/flower4.png',
  '/images/flowers/flower5.png',
  '/images/flowers/flower6.png',
  '/images/flowers/flower7.png',
  '/images/flowers/flower8.png',
  '/images/flowers/flower9.png',
  '/images/flowers/flower10.png',
  '/images/flowers/flower11.png',
  '/images/flowers/flower12.png',
];
const giftCover = document.querySelector('.gift-cover');
const giftBody  = document.querySelector('.gift-body');

// Body subtly pulses in sync with the cover shake
giftBody.classList.add('pulse');

giftCover.addEventListener('click', () => {
  // Stop shaking, play open animation on cover
  giftCover.classList.add('opening');

  giftCover.addEventListener('animationend', () => {
    giftCover.style.display = 'none';

    // Body reacts to being opened
    giftBody.classList.remove('pulse');
    giftBody.classList.add('opened');

    giftBody.addEventListener('animationend', () => {
      onGiftOpened();
    }, { once: true });

  }, { once: true });
});

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

setInterval(createHeart, 1500);

function randomFlowerImg(size) {
  const src = flowerImages[Math.floor(Math.random() * flowerImages.length)];
  return `<img src="${src}" width="${size}" height="${size}" style="display:block;">`;
}

// ── Enhanced background floating flowers ──
function createFlower() {
  const size    = 30 + Math.random() * 60;
  const startX  = Math.random() * 110 - 5;
  const startY  = 100 + Math.random() * 20;
  const driftX  = (Math.random() - 0.5) * 200;
  const rotateEnd = (Math.random() - 0.5) * 720;
  const dur     = 6 + Math.random() * 6;
  const delay   = Math.random() * 8;

  const wrapper = document.createElement('div');
  wrapper.classList.add('flower');
  wrapper.style.left    = `${startX}%`;
  wrapper.style.top     = `${startY}%`;
  wrapper.style.width   = `${size}px`;
  wrapper.style.height  = `${size}px`;
  wrapper.style.opacity = `${0.5 + Math.random() * 0.5}`;
  wrapper.innerHTML     = randomFlowerImg(size);

  document.getElementById('flowers-container').appendChild(wrapper);

  wrapper.animate([
    {
      transform: `translateY(0px) translateX(0px) rotate(0deg) scale(0.4)`,
      opacity: 0,
    },
    {
      transform: `translateY(-30vh) translateX(${driftX * 0.3}px) rotate(${rotateEnd * 0.3}deg) scale(1)`,
      opacity: parseFloat(wrapper.style.opacity),
      offset: 0.15,
    },
    {
      transform: `translateY(-70vh) translateX(${driftX * 0.7}px) rotate(${rotateEnd * 0.7}deg) scale(1.1)`,
      opacity: parseFloat(wrapper.style.opacity),
      offset: 0.7,
    },
    {
      transform: `translateY(-110vh) translateX(${driftX}px) rotate(${rotateEnd}deg) scale(0.8)`,
      opacity: 0,
    },
  ], {
    duration: dur * 1000,
    delay:    delay * 1000,
    easing:   'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    fill:     'forwards',
  });

  setTimeout(() => wrapper.remove(), (dur + delay + 0.5) * 1000);
}

// Continuously spawn flowers
setInterval(createFlower, 600);
for (let i = 0; i < 10; i++) createFlower(); // initial batch


function createFlowerImg(size) {
  const src = flowerImages[Math.floor(Math.random() * flowerImages.length)];
  return `<img src="${src}" width="${size}" height="${size}" style="display:block;">`;
}

function randomFlowerImg(size) {
  const src = flowerImages[Math.floor(Math.random() * flowerImages.length)];
  return `<img src="${src}" width="${size}" height="${size}" style="display:block;">`;
}

// ── Enhanced flower burst ──
function triggerFlowerBurst(onComplete) {
  const container = document.getElementById('burst-container');
  const overlay   = document.getElementById('fullscreen-overlay');
  const centerX   = window.innerWidth  / 2;
  const centerY   = window.innerHeight / 2;

  const waves = [
    { count: 20, sizeMin: 20,  sizeMax: 50,  distMin: 80,  distMax: 200, delay: 0,   dur: [0.8, 1.2] },
    { count: 30, sizeMin: 40,  sizeMax: 90,  distMin: 150, distMax: 350, delay: 200, dur: [1.0, 1.5] },
    { count: 50, sizeMin: 80,  sizeMax: 180, distMin: 100, distMax: 600, delay: 500, dur: [1.2, 2.0] },
  ];

  waves.forEach(wave => {
    setTimeout(() => {
      for (let i = 0; i < wave.count; i++) {
        const angle    = (i / wave.count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const distance = wave.distMin + Math.random() * (wave.distMax - wave.distMin);
        const size     = wave.sizeMin + Math.random() * (wave.sizeMax - wave.sizeMin);
        const delay    = Math.random() * 0.2;
        const duration = wave.dur[0] + Math.random() * (wave.dur[1] - wave.dur[0]);
        const targetX  = centerX + Math.cos(angle) * distance;
        const targetY  = centerY + Math.sin(angle) * distance;
        const rotate   = (Math.random() - 0.5) * 720;
        const tx       = targetX - centerX;
        const ty       = targetY - centerY;

        const el = document.createElement('div');
        el.classList.add('burst-flower');
        el.innerHTML  = randomFlowerImg(size);
        el.style.left = `${centerX}px`;
        el.style.top  = `${centerY}px`;

        container.appendChild(el);

        const anim = el.animate([
          { transform: `translate(-50%, -50%) scale(0) rotate(0deg)`, opacity: 0 },
          { transform: `translate(calc(${tx}px - 50%), calc(${ty}px - 50%)) scale(1.3) rotate(${rotate * 0.6}deg)`, opacity: 1, offset: 0.5 },
          { transform: `translate(calc(${tx}px - 50%), calc(${ty}px - 50%)) scale(1) rotate(${rotate}deg)`, opacity: 1 },
        ], {
          duration: duration * 1000,
          delay:    delay    * 1000,
          fill:     'forwards',
          easing:   'cubic-bezier(0.34, 1.56, 0.64, 1)',
        });

        // Fade out and remove burst flowers just before the overlay appears
        setTimeout(() => {
          el.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 300,
            fill: 'forwards',
          }).onfinish = () => el.remove();
        }, 650);
      }
    }, wave.delay);
  });

  setTimeout(() => {
    overlay.innerHTML = '';
    overlay.classList.add('visible');

    const count = 200;

    for (let i = 0; i < count; i++) {
      const left  = -15 + Math.random() * 130;
      const top   = -15 + Math.random() * 130;
      const size  = Math.random() < 0.35
                    ? 250 + Math.random() * 200
                    : Math.random() < 0.5
                    ? 120 + Math.random() * 100
                    : 60  + Math.random() * 80;
      const delay = Math.random() * 1.2;
      const dur   = 0.5 + Math.random() * 0.7;
      const rot   = (Math.random() - 0.5) * 80;

      const f = document.createElement('div');
      f.classList.add('overlay-flower');
      f.style.left             = `${left}%`;
      f.style.top              = `${top}%`;
      f.style.width            = `${size}px`;
      f.style.height           = `${size}px`;
      f.style.setProperty('--rot', `${rot}deg`);
      f.style.animationDuration = `${dur}s`;
      f.style.animationDelay   = `${delay}s`;
      f.innerHTML              = randomFlowerImg(size);

      overlay.appendChild(f);
    }
  }, 700);

  setTimeout(() => {
    if (onComplete) onComplete();
    // wait 2s then reverse
    setTimeout(reverseFlowersThenShowLetter, 60);
  }, 8000);
}

function onGiftOpened() {
  triggerFlowerBurst(() => {
    // Runs after 5.5s — show your message, next page, etc.
    console.log('?');
  });
}

// ── Edit letter toggle ──
let isEditing = false;

function toggleEdit() {
  const textEl     = document.getElementById('letter-text');
  const textareaEl = document.getElementById('letter-textarea');
  const btn        = document.getElementById('edit-btn');

  if (!isEditing) {
    textareaEl.value   = textEl.innerText;
    textEl.style.display      = 'none';
    textareaEl.style.display  = 'block';
    btn.textContent    = 'Save';
    btn.classList.add('saving');
  } else {
    textEl.innerText          = textareaEl.value;
    textEl.style.display      = 'block';
    textareaEl.style.display  = 'none';
    btn.textContent    = 'Edit Letter';
    btn.classList.remove('saving');
  }

  isEditing = !isEditing;
}

// ── Spawn background flowers inside letter overlay ──
function spawnLetterBgFlowers() {
  const container = document.getElementById('letter-bg-flowers');
  for (let i = 0; i < 12; i++) {
    const size  = 60 + Math.random() * 100;
    const delay = Math.random() * 4;
    const dur   = 8 + Math.random() * 4;

    const f = document.createElement('div');
    f.classList.add('bg-flower');
    f.style.left            = `${Math.random() * 100}%`;
    f.style.top             = `${Math.random() * 100}%`;
    f.style.width           = `${size}px`;
    f.style.height          = `${size}px`;
    f.style.animationDuration = `${dur}s`;
    f.style.animationDelay  = `${delay}s`;
    f.innerHTML             = randomFlowerImg(size);

    container.appendChild(f);
  }
}

// ── Show love letter ──
function showLoveLetter() {
  spawnLetterBgFlowers();
  const overlay = document.getElementById('letter-overlay');
  overlay.classList.add('visible');
}

// ── Reverse disappear then show letter ──
function reverseFlowersThenShowLetter() {
  const overlay      = document.getElementById('fullscreen-overlay');
  const flowerEls    = Array.from(overlay.querySelectorAll('.overlay-flower'));
  const total        = flowerEls.length;
  const staggerDelay = 8; // much faster — was 30ms

  [...flowerEls].reverse().forEach((el, i) => {
    setTimeout(() => {
      el.animate([
        { transform: getComputedStyle(el).transform, opacity: 1 },
        { transform: `${getComputedStyle(el).transform} scale(0)`, opacity: 0 },
      ], {
        duration: 250,  // shorter pop-out — was 400ms
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