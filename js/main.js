// 국가동물24 — Main A1 페이지 상호작용 (camelCase 식별자)

const protectionAnimals = [
  { name: '봄이', meta: '암컷 · 믹스견 · 2살', loc: '서울특별시 동물보호센터', status: 'protected', statusLabel: '보호중', photo: 'protect-animal-photo-1.png' },
  { name: '미미', meta: '수컷 · 말티즈 · 4살', loc: '서울특별시 동물보호센터', status: 'treatment', statusLabel: '치료중', photo: 'protect-animal-photo-2.png' },
  { name: '순이', meta: '수컷 · 믹스견 · 2살', loc: '서울특별시 동물보호센터', status: 'adoption', statusLabel: '입양가능', photo: 'protect-animal-photo-3.png' },
  { name: '순이', meta: '수컷 · 믹스견 · 2살', loc: '서울특별시 동물보호센터', status: 'reserved', statusLabel: '입양예약', photo: 'protect-animal-photo-4.png' },
  { name: '순이', meta: '수컷 · 믹스견 · 2살', loc: '서울특별시 동물보호센터', status: 'protected', statusLabel: '보호중', photo: 'protect-animal-photo-5.png' },
  { name: '순이', meta: '수컷 · 믹스견 · 2살', loc: '서울특별시 동물보호센터', status: 'ended', statusLabel: '보호종료', photo: 'protect-animal-photo-6.png' },
  { name: '순이', meta: '수컷 · 믹스견 · 2살', loc: '서울특별시 동물보호센터', status: 'emergency', statusLabel: '긴급보호', photo: 'protect-animal-photo-7.png' },
  { name: '순이', meta: '수컷 · 믹스견 · 2살', loc: '서울특별시 동물보호센터', status: 'protected', statusLabel: '보호중', photo: 'protect-animal-photo-8.png' },
];

function renderAnimalGrid() {
  const grid = document.getElementById('animalGrid');
  if (!grid) return;

  grid.innerHTML = protectionAnimals.map((animal) => `
    <article class="animal_card">
      <div class="animal_card__inner">
        <div class="animal_card__photo_wrap">
          <img src="../assets/${animal.photo}" alt="${animal.name}">
        </div>
        <span class="status_badge status_badge_${animal.status}">${animal.statusLabel}</span>
        <button type="button" class="favorite_btn" aria-pressed="false" aria-label="찜하기">
          <img src="../assets/protect-favorite-heart.svg" alt="">
        </button>
        <div class="animal_card__body">
          <p class="animal_card__name">${animal.name}</p>
          <p class="animal_card__meta">${animal.meta}</p>
          <p class="animal_card__loc">${animal.loc}</p>
        </div>
        <a class="animal_card__detail" href="#">상세보기</a>
      </div>
    </article>
  `).join('');

  grid.addEventListener('click', (event) => {
    const favoriteButton = event.target.closest('.favorite_btn');
    if (!favoriteButton) return;
    event.preventDefault();
    const isPressed = favoriteButton.getAttribute('aria-pressed') === 'true';
    favoriteButton.setAttribute('aria-pressed', String(!isPressed));
  });
}

function setupHeaderScrollShadow() {
  const header = document.getElementById('globalHeader');
  if (!header) return;
  const updateScrollState = () => header.classList.toggle('is_scrolled', window.scrollY > 4);
  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });
}

function setupTypeTabs() {
  const tabBar = document.getElementById('typeTabs');
  if (!tabBar) return;
  tabBar.addEventListener('click', (event) => {
    const tab = event.target.closest('.filter_tab');
    if (!tab) return;
    tabBar.querySelectorAll('.filter_tab').forEach((t) => t.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');
  });
}

function setupHeroSearch() {
  const form = document.getElementById('heroSearchForm');
  if (!form) return;
  form.addEventListener('submit', (event) => event.preventDefault());
}

function setupThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  const lightButton = toggle.querySelector('[data-theme-value="light"]');
  const darkButton = toggle.querySelector('[data-theme-value="dark"]');

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    lightButton.setAttribute('aria-pressed', String(theme === 'light'));
    darkButton.setAttribute('aria-pressed', String(theme === 'dark'));
  };

  toggle.addEventListener('click', (event) => {
    const button = event.target.closest('[data-theme-value]');
    if (!button) return;
    applyTheme(button.dataset.themeValue);
  });
}

function setupPubsvcCarousel() {
  const carousel = document.getElementById('pubsvcCarousel');
  const prevButton = document.getElementById('pubsvcPrev');
  const nextButton = document.getElementById('pubsvcNext');
  if (!carousel || !prevButton || !nextButton) return;

  const scrollByCard = (direction) => {
    const card = carousel.querySelector('.service_card');
    const distance = card ? card.getBoundingClientRect().width + 24 : 300;
    carousel.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  prevButton.addEventListener('click', () => scrollByCard(-1));
  nextButton.addEventListener('click', () => scrollByCard(1));
}

renderAnimalGrid();
setupHeaderScrollShadow();
setupTypeTabs();
setupHeroSearch();
setupThemeToggle();
setupPubsvcCarousel();
