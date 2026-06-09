/* ═══════════════════════════════════════════════
   MENU — Card rendering + hover glow tracking
   ═══════════════════════════════════════════════ */

const menuData = [
  {
    name: 'Matcha Cloud',
    desc: 'Ceremonial matcha gracefully blanketed in a velvety, sweet vanilla milk cloud.',
    price: '49 / ₱59',
    cat: 'iced',
    icon: 'ph-duotone ph-cloud',
    tag: 'Signature',
  },
  {
    name: 'Biscoff',
    desc: 'A warm embrace of spiced speculoos cookie butter dissolved in rich espresso and textured milk.',
    price: '49 / ₱59',
    cat: 'sweet',
    icon: 'ph-duotone ph-cookie',
    tag: 'Indulgent',
  },
  {
    name: 'Strawberry Matcha',
    desc: 'The vibrant, grounded earthiness of matcha beautifully balanced with a bright crush of fresh strawberries.',
    price: '49 / ₱59',
    cat: 'iced',
    icon: 'ph-duotone ph-flower-lotus',
    tag: 'Refreshing',
  },
  {
    name: 'Spanish Latte',
    desc: 'A delicately sweetened, creamy classic featuring bold espresso and rich condensed milk.',
    price: '49 / ₱59',
    cat: 'morning',
    icon: 'ph-duotone ph-coffee',
    tag: 'Classic',
  },
  {
    name: 'Cloud9',
    desc: 'Our secret recipe espresso, double-shaken over ice and topped with a celestial layer of soft cream.',
    price: '49 / ₱59',
    cat: 'sweet',
    icon: 'ph-duotone ph-star-four',
    tag: 'House Special',
  },
  {
    name: 'Caramel',
    desc: 'Deep, structured espresso swirled with buttery, house-crafted caramel and finished with a dash of sea salt.',
    price: '49 / ₱59',
    cat: 'sweet',
    icon: 'ph-duotone ph-drop',
    tag: 'Sweet Comfort',
  },
  {
    name: 'Chocolate',
    desc: 'Rich, deeply roasted cocoa melted into silken whole milk. Pure, nostalgic warmth in a cup.',
    price: '49 / ₱59',
    cat: 'calm',
    icon: 'ph-duotone ph-coffee',
    tag: 'Cozy',
  },
  {
    name: 'Einspanner',
    desc: 'A beautiful Viennese tradition—robust, chilled black coffee crowned with a dense, indulgent whipped cream cap.',
    price: '49 / ₱59',
    cat: 'morning',
    icon: 'ph-duotone ph-brandy',
    tag: 'Elegant',
  },
];

export function renderMenuCards() {
  const container = document.getElementById('menu-grid');
  if (!container) return;

  container.innerHTML = menuData
    .map(
      (item) => `
    <div class="menu-card" data-category="${item.cat}">
      <i class="card-icon ${item.icon}"></i>
      <span class="card-tag">${item.tag}</span>
      <h3 class="card-name">${item.name}</h3>
      <p class="card-desc">${item.desc}</p>
      <div class="card-price">₱${item.price}</div>
    </div>
  `
    )
    .join('');

  // Track mouse for glow effect
  container.querySelectorAll('.menu-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
}
