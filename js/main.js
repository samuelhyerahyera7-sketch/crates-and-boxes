document.addEventListener("DOMContentLoaded", () => {
  Cart.updateCartBadge();

  const page = document.body.dataset.page;
  if (page === "home") initHome();
  else if (page === "products") initProducts();
  else if (page === "cart") initCart();
  else if (page === "branding") initBranding();
});

// ── HOME PAGE ──────────────────────────────────────────────────────────────
function initHome() {
  const grid = document.getElementById("featured-grid");
  if (!grid) return;

  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  grid.innerHTML = featured.map(productCard).join("");
  attachAddToCart(grid);
}

// ── PRODUCTS PAGE ──────────────────────────────────────────────────────────
function initProducts() {
  const grid = document.getElementById("products-grid");
  const searchInput = document.getElementById("search-input");
  let activeCategory = "all";
  let searchQuery = "";

  function render() {
    let list = PRODUCTS;
    if (activeCategory !== "all") list = list.filter((p) => p.category === activeCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.dimensions.toLowerCase().includes(q)
      );
    }
    grid.innerHTML = list.length
      ? list.map(productCard).join("")
      : `<p class="no-results">No products found.</p>`;
    attachAddToCart(grid);

    document.getElementById("product-count").textContent = `${list.length} product${list.length !== 1 ? "s" : ""}`;
  }

  // Category tabs
  const tabsContainer = document.getElementById("category-tabs");
  tabsContainer.innerHTML = CATEGORIES.map(
    (c) =>
      `<button class="tab-btn${c.id === "all" ? " active" : ""}" data-cat="${c.id}">${c.label}</button>`
  ).join("");

  tabsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab-btn");
    if (!btn) return;
    activeCategory = btn.dataset.cat;
    tabsContainer.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    render();
  });

  // Search
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      render();
    });
  }

  render();
}

// ── CART PAGE ──────────────────────────────────────────────────────────────
function initCart() {
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const summaryEl = document.getElementById("cart-summary");
  const emptyEl = document.getElementById("cart-empty");
  const cartItems = Cart.getCart();

  if (cartItems.length === 0) {
    container.innerHTML = "";
    summaryEl.style.display = "none";
    emptyEl.style.display = "block";
    return;
  }

  emptyEl.style.display = "none";
  summaryEl.style.display = "block";

  container.innerHTML = cartItems
    .map((item) => {
      const p = PRODUCTS.find((p) => p.id === item.id);
      if (!p) return "";
      return `
        <div class="cart-item" data-id="${p.id}">
          <div class="cart-item-visual-wrap">
            <img src="${p.image}" alt="${p.name}" />
          </div>
          <div class="cart-item-info">
            <h3>${p.name}</h3>
            <p class="cart-item-dims">${p.dimensions}</p>
            <p class="cart-item-cat">${p.categoryLabel}</p>
          </div>
          <div class="cart-item-controls">
            <div class="qty-control">
              <button class="qty-btn minus" data-id="${p.id}">−</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn plus" data-id="${p.id}">+</button>
            </div>
            <p class="cart-item-price">R${(p.price * item.qty).toFixed(2)}</p>
            <button class="remove-btn" data-id="${p.id}">Remove</button>
          </div>
        </div>`;
    })
    .join("");

  document.getElementById("subtotal").textContent = `R${Cart.getTotal().toFixed(2)}`;
  document.getElementById("total").textContent = `R${Cart.getTotal().toFixed(2)}`;

  container.querySelectorAll(".qty-btn.minus").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = +btn.dataset.id;
      const item = Cart.getCart().find((i) => i.id === id);
      Cart.updateQty(id, (item?.qty || 1) - 1);
      renderCart();
    });
  });

  container.querySelectorAll(".qty-btn.plus").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = +btn.dataset.id;
      const item = Cart.getCart().find((i) => i.id === id);
      Cart.updateQty(id, (item?.qty || 0) + 1);
      renderCart();
    });
  });

  container.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      Cart.removeItem(+btn.dataset.id);
      renderCart();
    });
  });

  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Clear all items from cart?")) {
        Cart.clearCart();
        renderCart();
      }
    });
  }
}

// ── BRANDING PAGE ──────────────────────────────────────────────────────────
function initBranding() {
  const grid = document.getElementById("branding-grid");
  if (!grid) return;
  grid.innerHTML = BRANDING_OPTIONS.map(
    (b) => `
    <div class="branding-card">
      <span class="branding-icon">${b.icon}</span>
      <h3>${b.title}</h3>
      <p>${b.description}</p>
    </div>`
  ).join("");
}

// ── HELPERS ────────────────────────────────────────────────────────────────
function productCard(p) {
  const imgs = p.images && p.images.length > 1 ? p.images : [p.image];
  const multi = imgs.length > 1;
  return `
    <div class="product-card" data-id="${p.id}">
      <div class="product-visual${multi ? ' has-gallery' : ''}">
        <div class="gallery-track" data-current="0">
          ${imgs.map((src, i) => `<img src="${src}" alt="${p.name} – view ${i+1}" class="gallery-img${i === 0 ? ' active' : ''}" loading="lazy" />`).join('')}
        </div>
        ${multi ? `
          <button class="gallery-btn prev" onclick="galleryNav(this,-1)" aria-label="Previous">&#8249;</button>
          <button class="gallery-btn next" onclick="galleryNav(this,1)" aria-label="Next">&#8250;</button>
          <div class="gallery-dots">
            ${imgs.map((_,i) => `<button class="gallery-dot${i===0?' active':''}" onclick="galleryGoto(this,${i})" aria-label="View ${i+1}"></button>`).join('')}
          </div>
        ` : ''}
        <span class="product-category-tag">${p.categoryLabel}</span>
      </div>
      <div class="product-info">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-dims">${p.dimensions}</p>
        <p class="product-desc">${p.description}</p>
        <div class="product-footer">
          <span class="product-price">R${p.price.toFixed(2)} <small>ex VAT</small></span>
          <button class="add-to-cart-btn" data-id="${p.id}">Add to Cart</button>
        </div>
      </div>
    </div>`;
}

// ── GALLERY NAVIGATION ─────────────────────────────────────────────────────
function galleryNav(btn, dir) {
  const visual = btn.closest('.product-visual');
  const track  = visual.querySelector('.gallery-track');
  const imgs   = track.querySelectorAll('.gallery-img');
  const dots   = visual.querySelectorAll('.gallery-dot');
  let cur = parseInt(track.dataset.current) || 0;
  cur = (cur + dir + imgs.length) % imgs.length;
  imgs.forEach(i => i.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  imgs[cur].classList.add('active');
  if (dots[cur]) dots[cur].classList.add('active');
  track.dataset.current = cur;
}

function galleryGoto(dot, idx) {
  const visual = dot.closest('.product-visual');
  const track  = visual.querySelector('.gallery-track');
  const imgs   = track.querySelectorAll('.gallery-img');
  const dots   = visual.querySelectorAll('.gallery-dot');
  imgs.forEach(i => i.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  imgs[idx].classList.add('active');
  dots[idx].classList.add('active');
  track.dataset.current = idx;
}

function attachAddToCart(container) {
  container.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      Cart.addItem(+btn.dataset.id);
      btn.textContent = "Added!";
      btn.classList.add("added");
      setTimeout(() => {
        btn.textContent = "Add to Cart";
        btn.classList.remove("added");
      }, 1500);
    });
  });
}

function isLightColor(hex) {
  if (!hex || !hex.startsWith("#")) return true;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

function boxSVG(bgColor) {
  const isLight = isLightColor(bgColor);
  const stroke = isLight ? "#1A1A1A" : "#FFFFFF";
  const fill = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.15)";
  return `
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="box-svg">
      <rect x="10" y="30" width="60" height="40" rx="2" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
      <rect x="6" y="22" width="68" height="12" rx="2" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
      <line x1="40" y1="22" x2="40" y2="70" stroke="${stroke}" stroke-width="1.5" stroke-dasharray="4 3"/>
      <path d="M32 22 Q36 14 40 10 Q44 14 48 22" stroke="${stroke}" stroke-width="2" fill="none"/>
    </svg>`;
}
