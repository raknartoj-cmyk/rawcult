/* RAW CULT — Brand Landing + Drop Store V1.1 */
(() => {
  'use strict';

  const STORAGE_KEY = 'rawcult-cart-v2';
  const config = window.RAWCULT_CONFIG;
  const products = window.RAWCULT_PRODUCTS;
  if (!config || !Array.isArray(products)) return;

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const money = (value) => new Intl.NumberFormat(config.locale, { style: 'currency', currency: config.currency, minimumFractionDigits: 2 }).format(value).replace('PEN', 'S/');
  const state = { category: 'all', cart: loadCart() };

  function getProduct(id) { return products.find((p) => p.id === id); }
  function loadCart() {
    try { const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); return Array.isArray(value) ? value : []; }
    catch { return []; }
  }
  function saveCart() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart)); }
  function escapeHtml(value) { return String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

  function publishedProducts() { return products.filter((p) => p.published !== false); }

  function renderCatalog() {
    const grid = $('#product-grid'); const empty = $('#shop-empty'); if (!grid || !empty) return;
    const filtered = publishedProducts().filter((p) => state.category === 'all' ? true : state.category === 'limited' ? p.tags.includes('limited') : p.category === state.category);
    grid.innerHTML = filtered.map((p) => `<article class="product-card"><div class="product-media">${p.tags.includes('limited') ? '<span class="product-badge">LIMITED</span>' : ''}<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.alt)}" loading="lazy"></div><div class="product-info"><h3>${escapeHtml(p.name)}</h3><p class="product-description">${escapeHtml(p.description)}</p><div class="product-bottom"><span class="product-price">${money(p.price)}</span><button class="product-add" type="button" data-add-product="${escapeHtml(p.id)}" ${p.available ? '' : 'disabled'}>${p.available ? 'ADD TO CART' : 'PRÓXIMAMENTE'}</button></div></div></article>`).join('');
    empty.hidden = filtered.length > 0;
  }

  function renderFeatured() {
    const p = publishedProducts().find((x) => x.featured) || publishedProducts()[0]; if (!p) return;
    $('#featured-image').src = p.image; $('#featured-image').alt = p.alt; $('#featured-name').textContent = p.name; $('#featured-description').textContent = p.description; $('#featured-price').textContent = money(p.price); $('#featured-stock-label').textContent = p.available ? 'DISPONIBLE' : 'PRÓXIMAMENTE'; $('#featured-add').disabled = !p.available; $('#featured-add').textContent = p.available ? 'AGREGAR AL CART' : 'PRÓXIMAMENTE'; $('#featured-add').dataset.productId = p.id;
  }

  function addToCart(productId, variant = null) {
    const p = getProduct(productId); if (!p || !p.available) return;
    if (p.options?.length && !variant) { openProductOptions(p); return; }
    const existing = state.cart.find((i) => i.productId === productId && i.variant === variant);
    if (existing) existing.quantity += 1; else state.cart.push({ productId, variant, quantity: 1 });
    saveCart(); renderCart(); openCart(); closeProductOptions();
  }
  function removeFromCart(productId, variant) { state.cart = state.cart.filter((i) => !(i.productId === productId && i.variant === variant)); saveCart(); renderCart(); }
  function changeQuantity(productId, variant, delta) { const item = state.cart.find((i) => i.productId === productId && i.variant === variant); if (!item) return; item.quantity += delta; if (item.quantity <= 0) removeFromCart(productId, variant); else { saveCart(); renderCart(); } }

  function renderCart() {
    const container = $('#cart-items'), empty = $('#cart-empty'), count = $('#cart-count'), totalEl = $('#cart-total'); if (!container || !empty || !count || !totalEl) return;
    const valid = state.cart.map((i) => ({ ...i, product: getProduct(i.productId) })).filter((i) => i.product);
    count.textContent = String(valid.reduce((s, i) => s + i.quantity, 0)); totalEl.textContent = money(valid.reduce((s, i) => s + i.product.price * i.quantity, 0)); empty.hidden = valid.length > 0;
    container.innerHTML = valid.map(({ product, variant, quantity }) => `<div class="cart-line"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.alt)}"><div><h3>${escapeHtml(product.name)}</h3><p>${variant ? `TALLA ${escapeHtml(variant)} · ` : ''}${money(product.price)}</p><div class="quantity-controls"><button type="button" data-qty="-1" data-product="${product.id}" data-variant="${variant || ''}">−</button><span>${quantity}</span><button type="button" data-qty="1" data-product="${product.id}" data-variant="${variant || ''}">+</button></div></div><button class="cart-remove" type="button" data-remove-product="${product.id}" data-variant="${variant || ''}">REMOVE</button></div>`).join('');
  }

  function openCart() { $('#cart-panel')?.classList.add('is-open'); $('#cart-panel')?.setAttribute('aria-hidden','false'); $('#cart-toggle')?.setAttribute('aria-expanded','true'); $('#cart-backdrop').hidden=false; document.body.classList.add('cart-open'); }
  function closeCart() { $('#cart-panel')?.classList.remove('is-open'); $('#cart-panel')?.setAttribute('aria-hidden','true'); $('#cart-toggle')?.setAttribute('aria-expanded','false'); $('#cart-backdrop').hidden=true; document.body.classList.remove('cart-open'); }

  function openProductOptions(product) {
    const modal = $('#product-options-modal'); if (!modal) return addToCart(product.id, product.options?.[0] || null);
    modal.querySelector('[data-modal-name]').textContent = product.name; modal.dataset.productId = product.id;
    modal.querySelector('[data-size-list]').innerHTML = product.options.map((o) => `<button type="button" class="size-option" data-size="${escapeHtml(o)}">${escapeHtml(o)}</button>`).join(''); modal.hidden = false;
  }
  function closeProductOptions() { const m=$('#product-options-modal'); if(m) m.hidden=true; }

  function updateCountdown() {
    const diff = new Date(config.drop.launchAt).getTime() - Date.now(); const status=$('#drop-status'), cta=$('#hero-cta'), archive=$('#archive-status');
    if (diff <= 0) { ['days','hours','minutes','seconds'].forEach((id)=>$('#'+id).textContent='00'); status.textContent='DROP LIVE'; archive.textContent='LIVE'; if(cta) cta.textContent='COMPRAR DROP'; return; }
    const s=Math.floor(diff/1000); $('#days').textContent=String(Math.floor(s/86400)).padStart(2,'0'); $('#hours').textContent=String(Math.floor((s%86400)/3600)).padStart(2,'0'); $('#minutes').textContent=String(Math.floor((s%3600)/60)).padStart(2,'0'); $('#seconds').textContent=String(s%60).padStart(2,'0'); status.textContent='DROP PROGRAMADO'; archive.textContent='UPCOMING';
  }

  function setup() {
    $('#instagram-link').href=config.social.instagram || '#'; $('#tiktok-link').href=config.social.tiktok || '#'; $('#current-year').textContent=new Date().getFullYear(); $('#hero-drop-name').textContent=config.drop.name;
    $$('[data-category]').forEach((b)=>b.addEventListener('click',()=>{state.category=b.dataset.category; $$('[data-category]').forEach(x=>x.classList.toggle('is-active',x===b)); renderCatalog();}));
    $('#cart-toggle')?.addEventListener('click',openCart); $('#cart-close')?.addEventListener('click',closeCart); $('#cart-backdrop')?.addEventListener('click',closeCart); document.addEventListener('keydown',(e)=>{if(e.key==='Escape'){closeCart();closeProductOptions();}});
    document.addEventListener('click',(e)=>{ const add=e.target.closest('[data-add-product]'); if(add) addToCart(add.dataset.addProduct); const rem=e.target.closest('[data-remove-product]'); if(rem) removeFromCart(rem.dataset.removeProduct,rem.dataset.variant||null); const qty=e.target.closest('[data-qty]'); if(qty) changeQuantity(qty.dataset.product,qty.dataset.variant||null,Number(qty.dataset.qty)); const size=e.target.closest('[data-size]'); if(size){const m=$('#product-options-modal'); addToCart(m.dataset.productId,size.dataset.size);} });
    $('#featured-add')?.addEventListener('click',()=>addToCart($('#featured-add').dataset.productId));
    $('#product-options-close')?.addEventListener('click',closeProductOptions);
    $('#checkout-button')?.addEventListener('click',()=>requestOrder());
    $('#membership-form')?.addEventListener('submit',(e)=>{e.preventDefault(); const email=$('#membership-email')?.value.trim(); const msg=$('#membership-message'); if(!email)return; msg.textContent='Solicitud registrada localmente. Conecta un proveedor de email antes de producción.'; $('#membership-email').value='';});
    updateCountdown(); setInterval(updateCountdown,1000);
  }

  function requestOrder() {
    if (!state.cart.length) { alert('Tu carrito está vacío.'); return; }
    const items=state.cart.map(i=>{const p=getProduct(i.productId); return `${p.name}${i.variant?` (${i.variant})`:''} x${i.quantity}`;}).join('\n');
    const total=state.cart.reduce((s,i)=>{const p=getProduct(i.productId); return s+p.price*i.quantity;},0);
    const message=`RAW CULT — SOLICITUD DE PEDIDO\n\n${items}\n\nTOTAL: ${money(total)}`;
    if(config.order.whatsapp){ window.open(`https://wa.me/${config.order.whatsapp}?text=${encodeURIComponent(message)}`,'_blank','noopener'); }
    else alert(message + '\n\nConfigura config.order.whatsapp para activar pedidos por WhatsApp.');
  }

  setup(); renderFeatured(); renderCatalog(); renderCart();
})();