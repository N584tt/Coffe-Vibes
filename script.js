import { menuByTime, testimonials, baristas } from './data.js';

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "day";
  if (hour >= 18 && hour < 22) return "evening";
  return "night";
}

// ===== ОБНОВЛЕНИЕ МЕНЮ =====
function updateMenu(timeKey = getTimeOfDay()) {
  const menu = menuByTime[timeKey];
  const container = document.querySelector('.specialities-grid');
  if (!container || !menu) return;

  // Сброс анимации
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

  // Перезапуск анимации
  container.querySelectorAll('.card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
    setTimeout(() => card.classList.add('visible'), 50);
  });

  console.log(`☕ Меню обновлено для: ${timeKey}`);
}

// ===== ОБЩИЙ РЕНДЕРЕР =====
const render = (container, items, templateFn) => {
  if (!container || !items) return;
  container.innerHTML = items.map(templateFn).join('');
};

// ===== ШАБЛОНЫ =====
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

  // 1. Инициализация
  updateMenu();
  render(document.querySelector('.testimonials-grid'), testimonials, testTpl);
  render(document.querySelector('.baristas-grid'), baristas, barTpl);

  // ===== АВТООБНОВЛЕНИЕ =====
  setInterval(() => updateMenu(), 60000);

  // ===== ТЕМЫ ВРЕМЕНИ СУТОК =====
  function setTimeTheme() {
    const hour = new Date().getHours();
    let time = 'night';
    if (hour >= 6 && hour < 12) time = 'morning';
    else if (hour < 18) time = 'day';
    else if (hour < 22) time = 'evening';

    body.classList.remove('time-morning', 'time-day', 'time-evening', 'time-night');
    body.classList.add(`time-${time}`);
  }
  setTimeTheme();
  setInterval(setTimeTheme, 60000);

  // ===== СМЕНА НАСТРОЕНИЯ И ВРЕМЕНИ (РУЧНАЯ) =====
  const timeBtns = Array.from(document.querySelectorAll('[data-time]'));
  const moodBtns = Array.from(document.querySelectorAll('[data-mood]'));

  timeBtns.forEach(btn =>
    btn.addEventListener('click', () => {
      const time = btn.dataset.time;
      body.classList.remove('time-morning', 'time-day', 'time-evening', 'time-night');
      body.classList.add(`time-${time}`);
      updateMenu(time);
    })
  );

  moodBtns.forEach(btn =>
    btn.addEventListener('click', () => {
      body.classList.remove('mood-energetic', 'mood-tired', 'mood-calming');
      body.classList.add(`mood-${btn.dataset.mood}`);
    })
  );

  // ===== MOBILE MENU =====
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
  }

  // ===== ВИДЕО МОДАЛКА =====
  const playBtn = document.querySelector('.play-btn');
  const modal = document.getElementById('video-modal');
  const close = document.querySelector('.close');
  if (playBtn && modal) {
    playBtn.addEventListener('click', () => modal.style.display = 'flex');
  }
  if (close && modal) {
    close.addEventListener('click', () => modal.style.display = 'none');
  }
  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // ===== АНИМАЦИИ ПРИ ПРОКРУТКЕ =====
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