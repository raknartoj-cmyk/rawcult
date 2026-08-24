/* RAW CULT — lógica Brand Landing + Drop Store V1 */

(() => {
  'use strict';

  const STORAGE_KEY = 'rawcult-cart-v1';
  const config = window.RAWCULT_CONFIG;
  const products = window.RAWCULT_PRODUCTS;

  if (!config || !Array.isArray(products)) {
    console.error('RAW CULT: falta config.js o products.js.');
    return;
  }

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const money = (value) => new Intl.NumberFormat(config.locale, {
    style: 'currency', currency: config.currency, minimumFractionDigits: 2
  }).format(value).replace('PEN', 'S/');

  const state = { category: 'all', cart: loadCart() };

  function loadCart() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn('RAW CULT: no se pudo leer el carrito.', error);
      return [];
    }
  }

  function saveCart() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart)); }
  function getProduct(id) { return products.find((product) => product.id === id); }

  function renderCatalog() {
    const grid = $('#product-grid');
    const empty = $('#shop-empty');
    if (!grid || !empty) return;

    const filtered = products.filter((product) => {
      if (state.category === 'all') return true;
      if (state.category === 'limited') return product.tags.includes('limited');
      return product.category === state.category;
    });

    grid.innerHTML = filtered.map((product) => {
      const disabled = !product.available;
      return `<article class="product-card">
        <div class="product-media">
          ${product.tags.includes('limited') ? '<span class="product-badge">LIMITED</span>' : ''}
          <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.alt)}" loading="lazy" />
        </div>
        <div class="product-info">
          <h3>${escapeHtml(product.name)}</h3>
          <p class="product-description">${escapeHtml(product.description)}</p>
          <div class="product-bottom">
            <span class="product-price">${money(product.price)}</span>
            <button class="product-add" type="button" data-add-product="${product.id}" ${disabled ? 'disabled' : ''}>
              ${disabled ? 'PRÓXIMAMENTE' : 'ADD TO CART'}
            </button>
          </div>
        </div>
      </article>`;
    }).join('');
    empty.hidden = filtered.length > 0;
  }

  function renderFeatured() {
    const product = products.find((item) => item.featured) || products[0];
    if (!product) return;
    $('#featured-image').src = product.image;
    $('#featured-image').alt = product.alt;
    $('#featured-name').textContent = product.name;
    $('#featured-description').textContent = product.description;
    $('#featured-price').textContent = money(product.price);
    $('#featured-stock-label').textContent = product.available ? 'DISPONIBLE' : 'PRÓXIMAMENTE';
    $('#featured-add').disabled = !product.available;
    $('#featured-add').textContent = product.available ? 'AGREGAR AL CART' : 'PRÓXIMAMENTE';
    $('#featured-add').dataset.productId = product.id;
  }

  function addToCart(productId) {
    const product = getProduct(productId);
    if (!product || !product.available) return;
    const existing = state.cart.find((item) => item.productId === productId);
    if (existing) existing.quantity += 1;
    else state.cart.push({ productId, quantity: 1 });
    saveCart();
    renderCart();
    openCart();
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter((item) => item.productId !== productId);
    saveCart();
    renderCart();
  }

  function renderCart() {
    const container = $('#cart-items');
    const empty = $('#cart-empty');
    const count = $('#cart-count');
    const totalElement = $('#cart-total');
    if (!container || !empty || !count || !totalElement) return;

    const validItems = state.cart.map((item) => ({ ...item, product: getProduct(item.productId) })).filter((item) => item.product);
    const totalItems = validItems.reduce((sum, item) => sum + item.quantity, 0);
    const total = validItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    count.textContent = String(totalItems);
    totalElement.textContent = money(total);
    empty.hidden = validItems.length > 0;
    container.innerHTML = validItems.map(({ product, quantity }) => `<div class="cart-line">
      <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.alt)}" />
      <div><h3>${escapeHtml(product.name)}</h3><p>${quantity} × ${money(product.price)}</p></div>
      <button class="cart-remove" type="button" data-remove-product="${product.id}">REMOVE</button>
    </div>`).join('');
  }

  function openCart() {
    $('#cart-panel')?.classList.add('is-open');
    $('#cart-panel')?.setAttribute('aria-hidden', 'false');
    $('#cart-toggle')?.setAttribute('aria-expanded', 'true');
    $('#cart-backdrop').hidden = false;
    document.body.classList.add('cart-open');
  }

  function closeCart() {
    $('#cart-panel')?.classList.remove('is-open');
    $('#cart-panel')?.setAttribute('aria-hidden', 'true');
    $('#cart-toggle')?.setAttribute('aria-expanded', 'false');
    $('#cart-backdrop').hidden = true;
    document.body.classList.remove('cart-open');
  }

  function updateCountdown() {
    const target = new Date(config.drop.launchAt).getTime();
    const difference = target - Date.now();
    const status = $('#drop-status');
    const cta = $('#hero-cta');
    const archive = $('#archive-status');

    if (difference <= 0) {
      ['days', 'hours', 'minutes', 'seconds'].forEach((id) => { $('#' + id).textContent = '00'; });
      status.textContent = 'DROP LIVE';
      archive.textContent = 'LIVE';
      if (cta) cta.textContent = 'COMPRAR DROP';
      return;
    }

    const seconds = Math.floor(difference / 1000);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    $('#days').textContent = String(days).padStart(2, '0');
    $('#hours').textContent = String(hours).padStart(2, '0');
    $('#minutes').textContent = String(minutes).padStart(2, '0');
    $('#seconds').textContent = String(secs).padStart(2, '0');
    status.textContent = 'DROP PROGRAMADO';
    archive.textContent = 'UPCOMING';
  }

  function setupCategories() {
    $$('[data-category]').forEach((button) => button.addEventListener('click', () => {
      state.category = button.dataset.category;
      $$('[data-category]').forEach((item) => item.classList.toggle('is-active', item === button));
      renderCatalog();
    }));
  }

  function setupCart() {
    $('#cart-toggle')?.addEventListener('click', openCart);
    $('#cart-close')?.addEventListener('click', closeCart);
    $('#cart-backdrop')?.addEventListener('click', closeCart);
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeCart(); });
    document.addEventListener('click', (event) => {
      const addButton = event.target.closest('[data-add-product]');
      if (addButton) addToCart(addButton.dataset.addProduct);
      const removeButton = event.target.closest('[data-remove-product]');
      if (removeButton) removeFromCart(removeButton.dataset.removeProduct);
    });
    $('#featured-add')?.addEventListener('click', () => {
      const id = $('#featured-add').dataset.productId;
      if (id) addToCart(id);
    });
    $('#checkout-button')?.addEventListener('click', () => {
      if (!state.cart.length) { alert('Tu carrito está vacío.'); return; }
      alert('V1: tu selección está lista. En la siguiente fase conectaremos checkout y pago automático.');
    });
  }

  function setupMembership() {
    $('#membership-form')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = $('#membership-email');
      const message = $('#membership-message');
      if (!input || !message || !input.value.trim()) return;
      localStorage.setItem('rawcult-member-email', input.value.trim());
      message.textContent = 'LISTO. TE AVISAREMOS DEL PRÓXIMO DROP.';
      input.value = '';
    });
  }

  function setupGlobalData() {
    $('#instagram-link').href = config.instagram;
    $('#tiktok-link').href = config.tiktok;
    $('#current-year').textContent = String(new Date().getFullYear());
    $('#hero-drop-name').textContent = config.drop.name;
  }

  function escapeHtml(value) {
    return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
  }

  setupGlobalData();
  renderFeatured();
  renderCatalog();
  renderCart();
  setupCategories();
  setupCart();
  setupMembership();
  updateCountdown();
  window.setInterval(updateCountdown, 1000);
})();