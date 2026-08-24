/* ================================================================
   RAW CULT — ARCHIVO DE CONFIGURACIÓN
   ⚠️ SOLO EDITA LA SECCIÓN "CONFIG" DE ABAJO ⚠️
   El resto del código funciona automáticamente.
   ================================================================ */

const CONFIG = {
  // ============================================
  // REDES SOCIALES (cambia las URLs por las tuyas)
  // ============================================
  social: {
    instagram: "https://instagram.com/rawcult.pe",
    tiktok: "https://tiktok.com/@rawcult.pe"
  },
  
  // ============================================
  // BOTÓN PRINCIPAL
  // ============================================
  cta: {
    text: "AVISARME EN INSTAGRAM",
    link: "https://instagram.com/rawcult.pe"
  },
  
  // ============================================
  // DROPS PROGRAMADOS
  // Para agregar un nuevo drop, copia y pega un bloque
  // completo y cambia la fecha y el nombre.
  // Formato fecha: "AÑO-MES-DÍAThora:MINUTO:SEGUNDO-05:00"
  // (el -05:00 es la zona horaria de Perú)
  // ============================================
  drops: [
    {
      name: "DROP 001 — ETERNAL",
      date: "2026-09-15T20:00:00-05:00",
      status: "upcoming"
    }
  ],
  
  // ============================================
  // SECCIÓN PEDESTAL (PRENDA DESTACADA)
  // ============================================
  pedestal: {
    // Video de fondo (MP4 corto, 5-10 segundos)
    videoUrl: "https://tu-cdn.com/pelea-urbana.mp4",
    
    // Imagen de la prenda (PNG con fondo transparente)
    productImage: "images/drop001-tee.png",
    
    // Stock restante (número)
    stockRemaining: 47
  }
};

// ============================================
  // CATÁLOGO DE PRODUCTOS EN STOCK
  // ============================================
  catalog: [
    {
      name: "ETERNAL SKULL TEE",
      image: "images/drop001-tee.png", // Asegúrate de que el nombre sea correcto
      price: "S/ 79.00",
      oldPrice: "S/ 99.00", // Si no hay oferta, déjalo vacío: ""
      isSale: true, // Pon true si está en oferta, false si es precio normal
      link: "https://instagram.com/rawcult.pe" // Link donde compran (IG, WhatsApp, etc)
    }
    // Puedes copiar y pegar el bloque de arriba para agregar más productos
  ]
};
/* ================================================================
   ⚠️ NO TOCAR NADA DE AQUÍ PARA ABAJO ⚠️
   Todo funciona automáticamente.
   ================================================================ */

// Aplicar links de redes sociales
document.querySelectorAll('[data-social]').forEach(element => {
  const platform = element.getAttribute('data-social');
  if (CONFIG.social[platform]) {
    element.href = CONFIG.social[platform];
  }
});

// Aplicar configuración del botón principal
const ctaButton = document.getElementById('cta-link');
ctaButton.textContent = CONFIG.cta.text;
ctaButton.href = CONFIG.cta.link;

// Aplicar configuración del pedestal
document.getElementById('bg-video').src = CONFIG.pedestal.videoUrl;
document.getElementById('product-img').src = CONFIG.pedestal.productImage;
document.getElementById('stock-left').textContent = CONFIG.pedestal.stockRemaining;

// ============================================
// SISTEMA DE COUNTDOWN AUTOMÁTICO
// ============================================
function getNextDrop() {
  const now = new Date();
  const upcomingDrops = CONFIG.drops
    .filter(drop => drop.status === "upcoming" && new Date(drop.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  
  return upcomingDrops[0] || null;
}

function updateCountdown() {
  const drop = getNextDrop();
  const nameElement = document.getElementById('drop-name');
  const ctaElement = document.getElementById('cta-link');
  
  // Si no hay drops próximos
  if (!drop) {
    nameElement.textContent = "PRÓXIMO DROP EN PREPARACIÓN";
    document.getElementById('countdown').style.display = 'none';
    return;
  }
  
  nameElement.textContent = drop.name;
  
  // Calcular tiempo restante
  const targetTime = new Date(drop.date).getTime();
  const currentTime = new Date().getTime();
  const timeDifference = targetTime - currentTime;
  
  // Si el countdown llegó a cero
  if (timeDifference <= 0) {
    nameElement.textContent = "¡DROP DISPONIBLE AHORA!";
    ctaElement.textContent = "COMPRAR AHORA";
    ctaElement.href = CONFIG.social.instagram;
    return;
  }
  
  // Calcular días, horas, minutos y segundos
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
  // Mostrar en la página
  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Iniciar countdown y actualizar cada segundo
updateCountdown();
setInterval(updateCountdown, 1000);
// ============================================
// SISTEMA DE CATÁLOGO AUTOMÁTICO
// ============================================
function renderCatalog() {
  const grid = document.getElementById('catalog-grid');
  if (!grid || !CONFIG.catalog) return;
  
  grid.innerHTML = CONFIG.catalog.map(product => `
    <a href="${product.link}" target="_blank" rel="noopener" style="text-decoration: none; color: inherit;">
      <div class="product-card">
        ${product.isSale ? '<div class="product-badge">OFERTA</div>' : ''}
        <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
        <div class="product-info">
          <h3>${product.name}</h3>
          <div class="product-price">
            <span class="price-current">${product.price}</span>
            ${product.oldPrice ? `<span class="price-old">${product.oldPrice}</span>` : ''}
          </div>
        </div>
      </div>
    </a>
  `).join('');
}

// Iniciar catálogo
renderCatalog();
/* ================================================================
   RAW CULT — ARCHIVO DE CONFIGURACIÓN
   ⚠️ SOLO EDITA LA SECCIÓN "CONFIG" DE ABAJO ⚠️
   El resto del código funciona automáticamente.
   ================================================================ */

const CONFIG = {
  // ============================================
  // REDES SOCIALES (cambia las URLs por las tuyas)
  // ============================================
  social: {
    instagram: "https://instagram.com/rawcult.pe",
    tiktok: "https://tiktok.com/@rawcult.pe"
  },
  
  // ============================================
  // BOTÓN PRINCIPAL
  // ============================================
  cta: {
    text: "AVISARME EN INSTAGRAM",
    link: "https://instagram.com/rawcult.pe"
  },
  
  // ============================================
  // DROPS PROGRAMADOS
  // Para agregar un nuevo drop, copia y pega un bloque
  // completo y cambia la fecha y el nombre.
  // Formato fecha: "AÑO-MES-DÍAThora:MINUTO:SEGUNDO-05:00"
  // (el -05:00 es la zona horaria de Perú)
  // ============================================
  drops: [
    {
      name: "DROP 001 — ETERNAL",
      date: "2026-09-15T20:00:00-05:00",
      status: "upcoming"
    }
  ],
  
  // ============================================
  // SECCIÓN PEDESTAL (PRENDA DESTACADA)
  // ============================================
  pedestal: {
    // Video de fondo (MP4 corto, 5-10 segundos)
    videoUrl: "https://tu-cdn.com/pelea-urbana.mp4",
    
    // Imagen de la prenda (PNG con fondo transparente)
    productImage: "images/drop001-tee.png",
    
    // Stock restante (número)
    stockRemaining: 47
  }
};

// ============================================
  // CATÁLOGO DE PRODUCTOS EN STOCK
  // ============================================
  catalog: [
    {
      name: "ETERNAL SKULL TEE",
      image: "images/drop001-tee.png", // Asegúrate de que el nombre sea correcto
      price: "S/ 79.00",
      oldPrice: "S/ 99.00", // Si no hay oferta, déjalo vacío: ""
      isSale: true, // Pon true si está en oferta, false si es precio normal
      link: "https://instagram.com/rawcult.pe" // Link donde compran (IG, WhatsApp, etc)
    }
    // Puedes copiar y pegar el bloque de arriba para agregar más productos
  ]
};
/* ================================================================
   ⚠️ NO TOCAR NADA DE AQUÍ PARA ABAJO ⚠️
   Todo funciona automáticamente.
   ================================================================ */

// Aplicar links de redes sociales
document.querySelectorAll('[data-social]').forEach(element => {
  const platform = element.getAttribute('data-social');
  if (CONFIG.social[platform]) {
    element.href = CONFIG.social[platform];
  }
});

// Aplicar configuración del botón principal
const ctaButton = document.getElementById('cta-link');
ctaButton.textContent = CONFIG.cta.text;
ctaButton.href = CONFIG.cta.link;

// Aplicar configuración del pedestal
document.getElementById('bg-video').src = CONFIG.pedestal.videoUrl;
document.getElementById('product-img').src = CONFIG.pedestal.productImage;
document.getElementById('stock-left').textContent = CONFIG.pedestal.stockRemaining;

// ============================================
// SISTEMA DE COUNTDOWN AUTOMÁTICO
// ============================================
function getNextDrop() {
  const now = new Date();
  const upcomingDrops = CONFIG.drops
    .filter(drop => drop.status === "upcoming" && new Date(drop.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  
  return upcomingDrops[0] || null;
}

function updateCountdown() {
  const drop = getNextDrop();
  const nameElement = document.getElementById('drop-name');
  const ctaElement = document.getElementById('cta-link');
  
  // Si no hay drops próximos
  if (!drop) {
    nameElement.textContent = "PRÓXIMO DROP EN PREPARACIÓN";
    document.getElementById('countdown').style.display = 'none';
    return;
  }
  
  nameElement.textContent = drop.name;
  
  // Calcular tiempo restante
  const targetTime = new Date(drop.date).getTime();
  const currentTime = new Date().getTime();
  const timeDifference = targetTime - currentTime;
  
  // Si el countdown llegó a cero
  if (timeDifference <= 0) {
    nameElement.textContent = "¡DROP DISPONIBLE AHORA!";
    ctaElement.textContent = "COMPRAR AHORA";
    ctaElement.href = CONFIG.social.instagram;
    return;
  }
  
  // Calcular días, horas, minutos y segundos
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
  // Mostrar en la página
  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Iniciar countdown y actualizar cada segundo
updateCountdown();
setInterval(updateCountdown, 1000);
// ============================================
// SISTEMA DE CATÁLOGO AUTOMÁTICO
// ============================================
function renderCatalog() {
  const grid = document.getElementById('catalog-grid');
  if (!grid || !CONFIG.catalog) return;
  
  grid.innerHTML = CONFIG.catalog.map(product => `
    <a href="${product.link}" target="_blank" rel="noopener" style="text-decoration: none; color: inherit;">
      <div class="product-card">
        ${product.isSale ? '<div class="product-badge">OFERTA</div>' : ''}
        <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
        <div class="product-info">
          <h3>${product.name}</h3>
          <div class="product-price">
            <span class="price-current">${product.price}</span>
            ${product.oldPrice ? `<span class="price-old">${product.oldPrice}</span>` : ''}
          </div>
        </div>
      </div>
    </a>
  `).join('');
}

// Iniciar catálogo
renderCatalog();