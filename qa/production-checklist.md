# RAW CULT — Production QA

## Functional
- [x] Catálogo separado de la UI
- [x] Productos no publicados ocultos del catálogo
- [x] Selector de talla para productos con variantes
- [x] Carrito persistente con producto + variante + cantidad
- [x] Incremento/decremento de cantidades
- [x] Eliminación de líneas del carrito
- [x] Total recalculado
- [x] Countdown basado en fecha ISO con zona horaria
- [x] Solicitud de pedido preparada para WhatsApp
- [ ] Configurar número de WhatsApp de producción
- [ ] Conectar proveedor real para early access/newsletter

## Content
- [x] Eliminado producto placeholder del catálogo público
- [x] ETERNAL SKULL TEE como producto featured
- [ ] Revisar stock real antes del lanzamiento
- [ ] Confirmar precio final
- [ ] Confirmar fecha/hora final del DROP 001

## SEO / PWA
- [x] title
- [x] description
- [x] canonical
- [x] Open Graph básico
- [x] Twitter card
- [x] manifest
- [x] favicons

## Responsive / Accessibility
- [x] Skip link
- [x] Focus-visible
- [x] Reduced motion
- [x] Breakpoints desktop/tablet/mobile
- [ ] QA manual en dispositivos reales

## Deploy gate
La rama no debe considerarse producción final hasta completar las tareas marcadas `[ ]`. No hacer merge automático a `main` sin configurar primero WhatsApp, proveedor de early access y validar contenido/stock/fecha.