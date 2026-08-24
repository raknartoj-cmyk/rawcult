/* ================================================================
   RAW CULT — ARCHIVO DE CONFIGURACIÓN
   ⚠️ SOLO EDITA LA SECCIÓN "CONFIG" DE ABAJO ⚠️
   ================================================================ */

const CONFIG = {
  // ============================================
  // REDES SOCIALES
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
  // Formato: "AÑO-MES-DÍATHora:MINUTO:SEGUNDO-05:00"
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
    videoUrl: "https://tu-cdn.com/pelea-urbana.mp4",
    productImage: "images/drop001-tee.png",
    stockRemaining: 47
  },
  
  // ============================================
  // CATÁLOGO DE PRODUCTOS EN STOCK
  // ✅ ESTÁ DENTRO DE CONFIG AHORA
  // ============================================
  catalog: [
    {
      name: "ETERNAL SKULL TEE",
      image: "images/drop001-tee.png",
      price: "S/ 79.00",
      oldPrice: "S/ 99.00",
      isSale: true,
      link: "https://instagram.com/rawcult.pe"
    }
    // Copia y pega para agregar más productos
  ]
};

/* ================================================================
   ⚠️ NO TOCAR NADA DE AQUÍ PARA ABAJO ⚠️
   ================================================================ */

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  
  console.log('RAW CULT — Iniciando...');
  console.log('Config cargada:', CONFIG);
  
  // ============================================
  // APLICAR LINKS DE REDES SOCIALES
  // ============================================
  document.querySelectorAll('[data-social]').forEach(function(element) {
    var platform = element.getAttribute('data-social');
    if (CONFIG.social[platform]) {
      element.href = CONFIG.social[platform];
      console.log('Social link aplicado:', platform);
    }
  });

  // ============================================
  // APLICAR BOTÓN PRINCIPAL
  // ============================================
  var ctaButton = document.getElementById('cta-link');
  if (ctaButton) {
    ctaButton.textContent = CONFIG.cta.text;
    ctaButton.href = CONFIG.cta.link;
    console.log('CTA configurado');
  } else {
    console.error('❌ No se encontró #cta-link');
  }

  // ============================================
  // APLICAR PEDESTAL Y STOCK
  // ============================================
  var bgVideo = document.getElementById('bg-video');
  var productImg = document.getElementById('product-img');
  var stockLeft = document.getElementById('stock-left');
  
  if (bgVideo) {
    bgVideo.src = CONFIG.pedestal.videoUrl;
    console.log('Video de fondo configurado');
  } else {
    console.error('❌ No se encontró #bg-video');
  }
  
  if (productImg) {
    productImg.src = CONFIG.pedestal.productImage;
    console.log('Imagen de producto configurada');
  } else {
    console.error('❌ No se encontró #product-img');
  }
  
  if (stockLeft) {
    stockLeft.textContent = CONFIG.pedestal.stockRemaining;
    console.log('Stock configurado:', CONFIG.pedestal.stockRemaining);
  } else {
    console.error('❌ No se encontró #stock-left');
  }

  // ============================================
  // SISTEMA DE COUNTDOWN
  // ============================================
  function getNextDrop() {
    var now = new Date();
    var upcomingDrops = CONFIG.drops.filter(function(drop) {
      return drop.status === "upcoming" && new Date(drop.date) > now;
    });
    upcomingDrops.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });
    return upcomingDrops[0] || null;
  }

  function updateCountdown() {
    var drop = getNextDrop();
    var nameElement = document.getElementById('drop-name');
    var ctaElement = document.getElementById('cta-link');
    var countdownElement = document.getElementById('countdown');
    
    if (!nameElement) {
      console.error('❌ No se encontró #drop-name');
      return;
    }
    
    if (!drop) {
      nameElement.textContent = "PRÓXIMO DROP EN PREPARACIÓN";
      if (countdownElement) countdownElement.style.display = 'none';
      return;
    }
    
    nameElement.textContent = drop.name;
    
    var targetTime = new Date(drop.date).getTime();
    var currentTime = new Date().getTime();
    var timeDifference = targetTime - currentTime;
    
    if (timeDifference <= 0) {
      nameElement.textContent = "¡DROP DISPONIBLE AHORA!";
      if (ctaElement) {
        ctaElement.textContent = "COMPRAR AHORA";
        ctaElement.href = CONFIG.social.instagram;
      }
      if (countdownElement) countdownElement.style.display = 'none';
      return;
    }
    
    if (countdownElement) countdownElement.style.display = 'flex';
    
    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    var daysEl = document.getElementById('days');
    var hoursEl = document.getElementById('hours');
    var minutesEl = document.getElementById('minutes');
    var secondsEl = document.getElementById('seconds');
    
    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  // Iniciar countdown
  updateCountdown();
  setInterval(updateCountdown, 1000);
  console.log('Countdown iniciado');

  // ============================================
  // SISTEMA DE CATÁLOGO
  // ============================================
  function renderCatalog() {
    var grid = document.getElementById('catalog-grid');
    
    if (!grid) {
      console.error('❌ No se encontró #catalog-grid');
      return;
    }
    
    if (!CONFIG.catalog || CONFIG.catalog.length === 0) {
      console.warn('⚠️ No hay productos en el catálogo');
      grid.innerHTML = '<p style="text-align:center;color:#666;">Próximamente...</p>';
      return;
    }
    
    console.log('Renderizando', CONFIG.catalog.length, 'productos');
    
    var html = '';
    for (var i = 0; i < CONFIG.catalog.length; i++) {
      var product = CONFIG.catalog[i];
      var badgeHtml = product.isSale ? '<div class="product-badge">OFERTA</div>' : '';
      var oldPriceHtml = product.oldPrice ? '<span class="price-old">' + product.oldPrice + '</span>' : '';
      
      html += '<a href="' + product.link + '" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;">';
      html += '  <div class="product-card">';
      html += '    ' + badgeHtml;
      html += '    <img src="' + product.image + '" alt="' + product.name + '" class="product-img" loading="lazy">';
      html += '    <div class="product-info">';
      html += '      <h3>' + product.name + '</h3>';
      html += '      <div class="product-price">';
      html += '        <span class="price-current">' + product.price + '</span>';
      html += '        ' + oldPriceHtml;
      html += '      </div>';
      html += '    </div>';
      html += '  </div>';
      html += '</a>';
    }
    
    grid.innerHTML = html;
    console.log('✅ Catálogo renderizado correctamente');
  }

  renderCatalog();
  
  console.log('✅ RAW CULT — Todo cargado correctamente');
});