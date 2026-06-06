const Cart = (() => {
  const STORAGE_KEY = "cratesAndBoxesCart";

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
  }

  function addItem(productId, qty = 1) {
    const cart = getCart();
    const existing = cart.find((i) => i.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: productId, qty });
    }
    saveCart(cart);
    showToast("Added to cart");
  }

  function removeItem(productId) {
    saveCart(getCart().filter((i) => i.id !== productId));
  }

  function updateQty(productId, qty) {
    if (qty < 1) return removeItem(productId);
    const cart = getCart();
    const item = cart.find((i) => i.id === productId);
    if (item) item.qty = qty;
    saveCart(cart);
  }

  function clearCart() {
    saveCart([]);
  }

  function getCount() {
    return getCart().reduce((sum, i) => sum + i.qty, 0);
  }

  function getTotal() {
    const cart = getCart();
    return cart.reduce((sum, i) => {
      const product = PRODUCTS.find((p) => p.id === i.id);
      return sum + (product ? product.price * i.qty : 0);
    }, 0);
  }

  function updateCartBadge() {
    const badge = document.getElementById("cart-badge");
    if (!badge) return;
    const count = getCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  }

  function showToast(message) {
    let toast = document.getElementById("cart-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "cart-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove("show"), 2500);
  }

  return { getCart, addItem, removeItem, updateQty, clearCart, getCount, getTotal, updateCartBadge };
})();
