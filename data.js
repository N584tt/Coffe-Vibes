// data.js
export const menuByTime = {
  morning: [
    { img: "./images/coffe/latte.jpg", title: "Латте с авторской пенкой", desc: "Молочный, лёгкий, с нежным ароматом — пробуждает мягко.", price: "250 ₸" },
    { img: "./images/coffe/capuchino-cor.jpg", title: "Капучино с корицей", desc: "Пряный, уютный вкус и запах утреннего тепла.", price: "280 ₸" },
    { img: "./images/coffe/vanil-raf.jpg", title: "Ванильный раф", desc: "Сливочная сладость с бодрящей ноткой эспрессо.", price: "300 ₸" },
    { img: "./images/coffe/honey-latte.jpg", title: "Медовый латте", desc: "Молоко, мёд и кофе — как солнечные лучи в чашке.", price: "270 ₸" },
    { img: "./images/coffe/flat-whate.jpg", title: "Флэт уайт", desc: "Баланс силы и мягкости — вдохновение для утренних идей.", price: "260 ₸" },
    { img: "./images/coffe/coconut-capuchino.jpg", title: "Кокосовый капучино", desc: "Нежный тропический аромат и лёгкое настроение утра.", price: "310 ₸" }
  ],
  day: [
    { img: "./images/coffe/americano.jpg", title: "Американо", desc: "Чистый вкус кофе, чтобы держать фокус на дне.", price: "180 ₸" },
    { img: "./images/coffe/flat-whate.jpg", title: "Флэт уайт", desc: "Мощный, но сбалансированный. Для деловых будней.", price: "270 ₸" },
    { img: "./images/coffe/ice-latte.jpg", title: "Айс-латте", desc: "Охлаждающий кофе для жарких или напряжённых дней.", price: "260 ₸" },
    { img: "./images/coffe/espresso-tonic.jpg", title: "Эспрессо-тоник", desc: "Идеальная свежесть — бодрит и освежает.", price: "290 ₸" },
    { img: "./images/coffe/caramel-latte.jpg", title: "Карамельный латте", desc: "Лёгкая сладость для короткой паузы в потоке дел.", price: "280 ₸" },
    { img: "./images/coffe/cold-brew.jpg", title: "Колд Брю", desc: "Медленно заваренный, чистый и мощный — кофе для фокуса.", price: "300 ₸" }
  ],
  evening: [
    { img: "./images/coffe/mocha.jpg", title: "Мокка с шоколадом", desc: "Гармония кофе и какао — тёплое завершение дня.", price: "290 ₸" },
    { img: "./images/coffe/caramel-macchiato.jpg", title: "Карамельный макиато", desc: "Сладкий аромат и мягкий вкус для уютного вечера.", price: "280 ₸" },
    { img: "./images/coffe/raf-lavanda.jpg", title: "Лавандовый раф", desc: "Цветочная нежность и спокойствие в каждой чашке.", price: "320 ₸" },
    { img: "./images/coffe/hazelnut-latte.jpg", title: "Ореховый латте", desc: "Насыщенный ореховый вкус и сливочная текстура.", price: "310 ₸" },
    { img: "./images/coffe/irish-cofe.jpg", title: "Айриш кофе", desc: "Кофе с кремом и каплей тепла — для медленных разговоров.", price: "350 ₸" },
    { img: "./images/coffe/cinamon-mocha.jpg", title: "Шоколад с корицей", desc: "Пряный и сладкий — тёплое завершение дня.", price: "300 ₸" }
  ],
  night: [
    { img: "./images/coffe/double-espresso.jpg", title: "Двойной эспрессо", desc: "Максимум энергии в минимальном объёме.", price: "200 ₸" },
    { img: "./images/coffe/black-coffe.jpg", title: "Чёрный кофе без сахара", desc: "Чистая сила, чистый фокус.", price: "180 ₸" },
    { img: "./images/coffe/ristretto.jpg", title: "Ристретто", desc: "Концентрированная энергия ночных идей.", price: "220 ₸" },
    { img: "./images/coffe/espresso-tonic.jpg", title: "Эспрессо-тоник", desc: "Искра бодрости и прохлады для долгой ночи.", price: "290 ₸" },
    { img: "./images/coffe/nitro-brew.jpg", title: "Нитро-брю", desc: "Холодный кофе с азотом — мягкий, мощный, эффектный.", price: "330 ₸" },
    { img: "./images/coffe/spicy-mocha.jpg", title: "Острый мокка", desc: "Шоколад, специи и кофе — как вдохновение перед рассветом.", price: "310 ₸" }
  ]
};

export const testimonials = [
  { quotes: ["«Лучший кофе в городе. Прихожу сюда уже третий год.»", "«Атмосфера как дома, только вкуснее.»"], name: "Айгерим", role: "постоянный гость" },
  { quotes: ["«Латте-арт на уровне искусства. Фото получаются огонь.»", "«Персонал всегда улыбается.»"], name: "Дамир", role: "фотограф" },
  { quotes: ["«Работаю здесь по утрам — лучший коворкинг.»", "«Розетки везде и Wi-Fi летает.»"], name: "Алина", role: "фрилансер" },
  { quotes: ["«Даже просто чёрный кофе — шедевр.»", "«Зёрна меняют каждую неделю.»"], name: "Марат", role: "бариста в душе" },
  { quotes: ["«Десерты под кофе — отдельная любовь.»", "«Круассан с заварным кремом — бомба.»"], name: "Сабина", role: "сладкоежка" },
  { quotes: ["«Привожу сюда всех друзей из других городов.»", "«Говорят: “Теперь понимаю, почему ты тут живёшь.”»"], name: "Руслан", role: "гид по Алматы" },
  { quotes: ["«Каждый раз пробую новое. Никогда не разочаровываюсь.»", "«Особенно люблю сезонные сиропы.»"], name: "Ерлан", role: "кофеман" },
  { quotes: ["«Здесь я написал свою дипломную работу.»", "«Кофе + тишина = продуктивность.»"], name: "Айжан", role: "студентка" },
  { quotes: ["«Не просто кофе, а настроение в чашке.»", "«Каждый день — новый вкус и атмосфера.»"], name: "Нурай", role: "кофе-энтузиаст" }
];

export const baristas = [
  { img: "./images/barista/artem.jpg", title: "Новый вкус недели от Артёма", desc: "Каждую пятницу — лимитированная обжарка и авторский напиток.", name: "Артём", role: "хэд-бариста" },
  { img: "./images/barista/aim.jpg", title: "Латте-арт чемпионка Айым", desc: "Рисует на пенке всё — от котиков до портретов.", name: "Айым", role: "латте-арт мастер" },
  { img: "./images/barista/maxim.jpg", title: "Максим — мастер холодного кофе", desc: "Колд брю, нитро, айс-латте — всё идеально.", name: "Максим", role: "холодный бариста" }
];

export const times = {
  morning: { bg: '#fdf6e3', text: '#5d4037' },
  day:     { bg: '#fff8e1', text: '#3e2723' },
  evening: { bg: '#efebe9', text: '#4e342e' },
  night:   { bg: '#121212', text: '#e0e0e0' }
};

export const moods = {
  energetic: { name: 'Энергичный', accent: '#ff5722', btn: '#e64a19', font: "'Roboto', sans-serif" },
  tired:     { name: 'Уставший', accent: '#795548', btn: '#5d4037', font: "'Playfair Display', serif" },
  calming:   { name: 'Успокаивающий', accent: '#4caf50', btn: '#388e3c', font: "'Roboto', sans-serif" }
};
