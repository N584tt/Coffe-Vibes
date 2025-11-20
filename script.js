import { menuByTime, testimonials, baristas } from './data.js';

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "day";
  if (hour >= 18 && hour < 22) return "evening";
  return "night";
}

// ===== ОБНОВЛЕНИЕ ТЕКСТА В HERO =====
function updateHeroText(time) {
  const title = document.querySelector('.hero-title');
  const subtitle = document.querySelector('.hero-subtitle');
  const tagline = document.querySelector('.hero-tagline');

  const texts = {
    morning: {
      title: "Доброе утро",
      subtitle: "Солнце встаёт — пора просыпаться",
      tagline: "Твой идеальный старт дня с ароматным кофе"
    },
    day: {
      title: "Coffee",
      subtitle: "Espresso Loaded",
      tagline: "Сила дня в каждой чашке"
    },
    evening: {
      title: "Добрый вечер",
      subtitle: "Время расслабиться",
      tagline: "Тёплый закат и уютный вкус"
    },
    night: {
      title: "Ночь зовёт",
      subtitle: "Кофе без сна",
      tagline: "Для тех, кто живёт ночью"
    }
  };

  const t = texts[time];
  if (title) title.textContent = t.title;
  if (subtitle) subtitle.textContent = t.subtitle;
  if (tagline) tagline.textContent = t.tagline;
}

// ===== ОБНОВЛЕНИЕ МЕНЮ =====
function updateMenu(timeKey = getTimeOfDay()) {
  const menu = menuByTime[timeKey];
  const container = document.querySelector('.specialities-grid');
  if (!container || !menu) return;

  container.querySelectorAll('.card').forEach(c => c.classList.remove('visible'));
  container.innerHTML = menu.map(item => `
    <div class="card">
      <div class="card-image">
        <img src="${item.img}" alt="${item.title}">
      </div>
      <div class="card-content">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <p class="price">${item.price}</p>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
    setTimeout(() => card.classList.add('visible'), 50);
  });
}

// ===== РЕНДЕР =====
const render = (container, items, templateFn) => {
  if (!container || !items) return;
  container.innerHTML = items.map(templateFn).join('');
};

const testTpl = i => `
  <div class="testimonial-card">
    <div class="stars">★★★★★</div>
    <blockquote>${i.quotes.map(q => `<p>${q}</p>`).join('')}</blockquote>
    <div class="author"><h3>${i.name}</h3><span>${i.role}</span></div>
  </div>`;

const barTpl = i => `
  <article class="barista-card">
    <div class="barista-image"><img src="${i.img}" alt="${i.name}"></div>
    <div class="barista-content">
      <h3>${i.title}</h3>
      <p>${i.desc}</p>
      <div class="name">${i.name}</div>
      <span class="role">${i.role}</span>
    </div>
  </article>`;

// ===== ГЛАВНЫЙ КОД =====
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  render(document.querySelector('.testimonials-grid'), testimonials, testTpl);
  render(document.querySelector('.baristas-grid'), baristas, barTpl);

  const STORAGE_KEYS = { time: 'cv_time', mood: 'cv_mood', manual: 'cv_manual', sound: 'cv_sound' };
  let currentTime = null;
  let currentMood = null;
  let manualChoice = localStorage.getItem(STORAGE_KEYS.manual) === 'true';
  let soundEnabled = localStorage.getItem(STORAGE_KEYS.sound) !== 'false';

  function playChime(type = 'soft') {
    if (!soundEnabled || typeof window.AudioContext === 'undefined') return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type === 'soft' ? 'sine' : 'triangle';
      o.frequency.value = type === 'soft' ? 880 : 660;
      g.gain.value = 0.0001;
      o.connect(g);
      g.connect(ctx.destination);
      const now = ctx.currentTime;
      g.gain.linearRampToValueAtTime(0.06, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      o.frequency.setValueAtTime(o.frequency.value, now);
      o.start(now);
      o.stop(now + 0.19);
      setTimeout(() => ctx.close?.(), 400);
    } catch (e) { console.warn('Audio failed', e); }
  }

  function applyTheme(time, mood, opts = { save: true, playSound: true }) {
    if (!time) time = getTimeOfDay();
    if (!mood) mood = localStorage.getItem(STORAGE_KEYS.mood) || 'energetic';

    const prevTime = currentTime;

    // Обновляем классы
    body.classList.remove('time-morning', 'time-day', 'time-evening', 'time-night');
    body.classList.add(`time-${time}`);
    body.classList.remove('mood-energetic', 'mood-tired', 'mood-calming');
    body.classList.add(`mood-${mood}`);

    currentTime = time;
    currentMood = mood;

    // КЛЮЧЕВЫЕ ДОБАВЛЕНИЯ:
    updateMenu(time);
    updateHeroText(time);  // ← Меняем текст в hero

    if (opts.save) {
      localStorage.setItem(STORAGE_KEYS.time, time);
      localStorage.setItem(STORAGE_KEYS.mood, mood);
    }

    if (opts.playSound && (manualChoice || (prevTime && prevTime !== time))) {
      playChime('soft');
    }
  }

  // Инициализация
  const savedTime = localStorage.getItem(STORAGE_KEYS.time);
  const savedMood = localStorage.getItem(STORAGE_KEYS.mood);
  if (savedTime) {
    applyTheme(savedTime, savedMood || undefined, { save: false, playSound: false });
  } else {
    applyTheme(getTimeOfDay(), savedMood || undefined, { save: false, playSound: false });
  }

  // Автообновление каждую минуту
  setInterval(() => {
    updateMenu(currentTime || getTimeOfDay());
    if (!manualChoice) {
      const newTime = getTimeOfDay();
      if (newTime !== currentTime) {
        applyTheme(newTime, currentMood, { save: false, playSound: true });
      }
    }
  }, 60000);

  // Кнопки времени и настроения
  document.querySelectorAll('[data-time]').forEach(btn =>
    btn.addEventListener('click', () => {
      manualChoice = true;
      localStorage.setItem(STORAGE_KEYS.manual, 'true');
      applyTheme(btn.dataset.time, currentMood, { save: true, playSound: true });
    })
  );

  document.querySelectorAll('[data-mood]').forEach(btn =>
    btn.addEventListener('click', () => {
      manualChoice = true;
      localStorage.setItem(STORAGE_KEYS.manual, 'true');
      applyTheme(currentTime || getTimeOfDay(), btn.dataset.mood, { save: true, playSound: true });
    })
  );

  // Мобильное меню
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.textContent = navMenu.classList.contains('active') ? '×' : 'Menu';
    });
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.textContent = 'Menu';
      });
    });
  }

  // Видео модалка
  const playBtn = document.querySelector('.play-btn');
  const modal = document.getElementById('video-modal');
  const close = document.querySelector('.close');
  if (playBtn && modal) {
    playBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
      playChime('soft');
    });
  }
  if (close) close.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

  // Анимация при скролле
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -80px 0px', threshold: 0.12 });

  document.querySelectorAll('.card, .testimonial-card, .barista-card').forEach(el => observer.observe(el));
});