const products = [
  {
    id: 1,
    name: 'MARGE BURGER',
    description: 'Deliciosa hamburguesa con ingredientes frescos',
    price: {
      simple: 8500,
      doble: 10000,
      triple: 11800
    },
    image: 'marge-burger.jpg',
    category: 'Burgers'
  },
  {
    id: 2,
    name: 'LISA BURGER',
    description: 'Hamburguesa con un toque especial',
    price: {
      simple: 8500,
      doble: 10000,
      triple: 11800
    },
    image: 'lisa-burger.jpg',
    category: 'Burgers'
  },
  {
    id: 3,
    name: 'KRUSTY BURGER',
    description: 'El clásico sabor de Krusty',
    price: {
      simple: 8500,
      doble: 10000,
      triple: 11800
    },
    image: 'krusty-burger.jpg',
    category: 'Burgers'
  },
  {
    id: 4,
    name: 'APU BURGER',
    description: 'Sabor único de la tienda de Apu',
    price: {
      simple: 8500,
      doble: 10000,
      triple: 11800
    },
    image: 'apu-burger.jpg',
    category: 'Burgers'
  },
  {
    id: 5,
    name: 'HOMERO BURGER',
    description: 'La favorita de Homero',
    price: {
      simple: 8500,
      doble: 10000,
      triple: 11800
    },
    image: 'homero-burger.jpg',
    category: 'Burgers'
  },
  {
    id: 6,
    name: 'X BURGER',
    description: 'Nuestra especialidad',
    price: {
      simple: 8500,
      doble: 10000,
      triple: 11800
    },
    image: 'x-burger.jpg',
    category: 'Burgers'
  },
  {
    id: 7,
    name: 'BARNIE BURGER',
    description: 'Para los amantes del sabor intenso',
    price: {
      simple: 8500,
      doble: 10000,
      triple: 11800
    },
    image: 'barnie-burger.jpg',
    category: 'Burgers'
  },
  {
    id: 8,
    name: 'QATAR BURGER',
    description: 'Un toque exótico en cada bocado',
    price: {
      simple: 8500,
      doble: 10000,
      triple: 11800
    },
    image: 'qatar-burger.jpg',
    category: 'Burgers'
  },
  {
    id: 9,
    name: 'BART BURGER',
    description: 'Para los más atrevidos',
    price: {
      simple: 8500,
      doble: 10000,
      triple: 11800
    },
    image: 'bart-burger.jpg',
    category: 'Burgers'
  },
  {
    id: 10,
    name: 'OTTO BURGER',
    description: 'El clásico de Otto',
    price: {
      simple: 8500,
      doble: 10000,
      triple: 11800
    },
    image: 'otto-burger.jpg',
    category: 'Burgers'
  },
  {
    id: 11,
    name: 'NELSON BURGER',
    description: 'Ja, ja!',
    price: {
      simple: 8800
    },
    image: 'nelson-burger.jpg',
    category: 'Burgers'
  },
  {
    id: 12,
    name: 'GORGORI BURGER',
    description: 'La más grande de todas',
    price: {
      simple: 14000
    },
    image: 'gorgori.jpg',
    category: 'Burgers'
  },
  {
    id: 13,
    name: 'Sandwich Grande',
    description: 'Tomate, lechuga, queso y huevo',
    price: 15500,
    image: 'sandwich-grande.jpg',
    category: 'Sanguches'
  }
];

const productContainer = document.getElementById('product-container');

function renderProducts(productsToRender) {
  productContainer.innerHTML = '';
  productsToRender.forEach(product => {
    let price;
    let buttons = '';
    if (product.category === 'Burgers') {
      price = product.price.simple;
      buttons = `
        <div class="size-buttons">
          <button class="size-btn active" data-size="simple">Simple</button>
          <button class="size-btn" data-size="doble">Doble</button>
          <button class="size-btn" data-size="triple">Triple</button>
        </div>
      `;
    } else {
      price = product.price;
    }

    const productCard = `
      <div class="product-card" data-product-id="${product.id}">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-details">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          ${buttons}
          <div class="price">$${price.toFixed(2)}</div>
        </div>
        <div class="price-add">
          <button class="add-btn" data-id="${product.id}">+</button>
        </div>
      </div>
    `;
    productContainer.innerHTML += productCard;
  });
}

renderProducts(products);

const searchInput = document.querySelector('.search input');

searchInput.addEventListener('keyup', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchTerm) ||
           product.description.toLowerCase().includes(searchTerm);
  });
  renderProducts(filteredProducts);
});

const cartCount = document.getElementById('cart-count');
let cart = {};

productContainer.addEventListener('click', (e) => {
  // Add to cart button
  if (e.target.classList.contains('add-btn')) {
    const addButton = e.target;
    const productId = addButton.dataset.id;
    const product = products.find(p => p.id == productId);

    if (product.category === 'Burgers') {
        const productCard = addButton.closest('.product-card');
        const activeButton = productCard.querySelector('.size-btn.active');
        const size = activeButton.dataset.size;
        addToCart(productId, size);
    } else {
        addToCart(productId);
    }
  }

  // Size selection button
  if (e.target.classList.contains('size-btn')) {
    const sizeButton = e.target;
    const size = sizeButton.dataset.size;
    const productCard = sizeButton.closest('.product-card');
    const productId = productCard.dataset.productId;
    const product = products.find(p => p.id == productId);
    const priceElement = productCard.querySelector('.price');

    // Update price display
    priceElement.textContent = `$${product.price[size].toFixed(2)}`;

    // Update active button
    const sizeButtons = productCard.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => btn.classList.remove('active'));
    sizeButton.classList.add('active');
  }
});

function addToCart(productId, size = null) {
  const product = products.find(p => p.id == productId);
  let cartItemId;

  if (product.category === 'Burgers' && size) {
    cartItemId = `${productId}-${size}`;
  } else {
    cartItemId = productId.toString();
  }

  if (cart[cartItemId]) {
    cart[cartItemId]++;
  } else {
    cart[cartItemId] = 1;
  }
  updateCartCount();
}

function updateCartCount() {
  const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0);
  cartCount.textContent = totalItems;
}

const cartModal = document.getElementById('cart-modal');
const closeModal = document.querySelector('.close-button');
const cartButton = document.querySelector('.cart-button');

cartButton.addEventListener('click', () => {
  renderCart();
  cartModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target == cartModal) {
    cartModal.style.display = 'none';
  }
});

const cartItemsContainer = document.getElementById('cart-items');

cartItemsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-from-cart')) {
    const cartItemId = e.target.dataset.id;
    removeFromCart(cartItemId);
  }
});

function removeFromCart(cartItemId) {
  if (cart[cartItemId] > 1) {
    cart[cartItemId]--;
  } else {
    delete cart[cartItemId];
  }
  updateCartCount();
  renderCart();
}

function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalContainer = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = '';
  let total = 0;

  for (const cartItemId in cart) {
    let productId;
    let size = null;
    if (cartItemId.includes('-')) {
      [productId, size] = cartItemId.split('-');
    } else {
      productId = cartItemId;
    }

    const product = products.find(p => p.id == productId);
    const quantity = cart[cartItemId];
    
    let price;
    let name = product.name;
    if (size) {
      price = product.price[size];
      name = `${product.name} (${size})`;
    } else {
      price = product.price;
    }

    total += price * quantity;

    const cartItem = `
      <div class="cart-item">
        <div class="cart-item-details">
          <span>${name}</span>
          <span>x${quantity}</span>
          <span>$${(price * quantity).toFixed(2)}</span>
        </div>
        <button class="remove-from-cart" data-id="${cartItemId}">🗑️</button>
      </div>
    `;
    cartItemsContainer.innerHTML += cartItem;
  }

  cartTotalContainer.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
}

const tabs = document.querySelector('.tabs');

tabs.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const category = e.target.dataset.category;
    if (category === 'all') {
      renderProducts(products);
    } else {
      const filteredProducts = products.filter(product => product.category === category);
      renderProducts(filteredProducts);
    }
  }
});
