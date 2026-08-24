/* RAW CULT — catálogo V1
   Este archivo será sustituido por una base de datos cuando conectemos el e-commerce.
   Mientras tanto mantiene el catálogo separado de la interfaz. */

const RAWCULT_PRODUCTS = Object.freeze([
  {
    id: 'eternal-skull-tee',
    name: 'ETERNAL SKULL TEE',
    category: 'wear',
    tags: ['limited', 'drop-001'],
    price: 79,
    currency: 'PEN',
    image: 'images/drop001-tee.png',
    alt: 'ETERNAL SKULL TEE — RAW CULT DROP 001',
    description: 'Pieza principal del DROP 001. Gráfica ETERNAL con una estética cruda y directa.',
    available: true,
    featured: true,
    options: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'eternal-mug',
    name: 'ETERNAL MUG',
    category: 'objects',
    tags: ['limited', 'drop-001'],
    price: 39,
    currency: 'PEN',
    image: 'images/drop001-tee.png',
    alt: 'ETERNAL MUG — RAW CULT DROP 001',
    description: 'Objeto de colección del DROP 001. Placeholder visual hasta cargar la fotografía real.',
    available: false,
    featured: false,
    options: []
  }
]);