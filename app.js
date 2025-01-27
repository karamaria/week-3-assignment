let totalCookies = 0;
let cookiesPerClick = 1;
let cookiesPerSecond = 1;

const upgrades = [
  { name: 'Cookies with Milk', cost: 50, cpc: 2, img: 'https://www.bordendairy.com/wp-content/uploads/2023/03/2.jpg' },
  { name: 'Cookie Pie', cost: 200, cpc: 5, img: 'https://images.getrecipekit.com/20240301144734-kinder-20cookie-20pie.jpg?aspect_ratio=1:1&quality=90&' },
  { name: 'Cookie Tree', cost: 1000, cpc: 10, img: 'https://thingswemake.co.uk/wp-content/uploads/2019/12/blogpost-600x600-7-of-7.jpg?w=584&h=584' },
  { name: 'Cookie Company', cost: 5000, cpc: 20, img: 'https://siouxfalls.business/wp-content/uploads/2024/04/cookie-co-exterior-scaled-e1712594012969.jpg' },
  { name: 'Cookie Planet', cost: 20000, cpc: 50, img: 'https://teefury.com/cdn/shop/files/113701-art-file-color-nav_1224d602-6615-41b0-8c91-185d97501d78_571x432_crop_center.jpg?v=1717188198' },
];

const cookieButton = document.getElementById('cookie');
const cookieCounter = document.getElementById('cookie-counter');
const upgradeList = document.getElementById('upgrade-list');

function updateCookieCounter() {
  cookieCounter.textContent = `Cookies: ${totalCookies}`;
}

function saveGameState() {
  localStorage.setItem('cookieGame', JSON.stringify({
    totalCookies,
    cookiesPerClick,
    cookiesPerSecond,
  }));
}

function loadGameState() {
  const savedState = JSON.parse(localStorage.getItem('cookieGame'));
  if (savedState) {
    totalCookies = savedState.totalCookies;
    cookiesPerClick = savedState.cookiesPerClick;
    cookiesPerSecond = savedState.cookiesPerSecond;
    updateCookieCounter();
  }
}

function renderUpgrades() {
  upgradeList.innerHTML = '';
  upgrades.forEach((upgrade, index) => {
    const upgradeItem = document.createElement('li');
    upgradeItem.className = 'upgrade';
    upgradeItem.innerHTML = `
      <img src="${upgrade.img}" alt="${upgrade.name}">
      <span>${upgrade.name} (+${upgrade.cpc} CPC) - ${upgrade.cost} cookies</span>
      <button ${totalCookies < upgrade.cost ? 'disabled' : ''} onclick="purchaseUpgrade(${index})">Buy</button>
    `;
    upgradeList.appendChild(upgradeItem);
  });
}

function purchaseUpgrade(index) {
  const upgrade = upgrades[index];
  if (totalCookies >= upgrade.cost) {
    totalCookies -= upgrade.cost;
    cookiesPerClick += upgrade.cpc;
    cookiesPerSecond += upgrade.cpc;
    upgrade.cost = Math.floor(upgrade.cost * 1.5);
    renderUpgrades();
    updateCookieCounter();
    saveGameState();
  }
}

cookieButton.addEventListener('click', () => {
  totalCookies += cookiesPerClick;
  updateCookieCounter();
  saveGameState();
});

setInterval(() => {
  totalCookies += cookiesPerSecond;
  updateCookieCounter();
  saveGameState();
}, 1000);

loadGameState();
renderUpgrades();