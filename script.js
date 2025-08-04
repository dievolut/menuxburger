const products = [
  {
    id: 1,
    name: 'Tacos Regulares',
    description: 'Carne, cebolla y cilantro',
    price: 3.75,
    image: 'https://images.pexels.com/photos/8474723/pexels-photo-8474723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Tacos'
  },
  {
    id: 2,
    name: 'Tacos de Suadero',
    description: 'Suadero, cebolla y cilantro',
    price: 4.00,
    image: 'https://images.pexels.com/photos/5639433/pexels-photo-5639433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Tacos'
  },
  {
    id: 3,
    name: 'Tacos de Pastor',
    description: 'Carne al pastor, piña, cebolla y cilantro',
    price: 4.25,
    image: 'https://images.pexels.com/photos/2092916/pexels-photo-2092916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Tacos'
  },
  {
    id: 4,
    name: 'Quesadilla Sencilla',
    description: 'Tortilla de harina con queso',
    price: 5.00,
    image: 'https://cdn.pixabay.com/photo/2022/05/23/19/57/quesadillas-7216839_1280.jpg',
    category: 'Quesadillas'
  },
  {
    id: 5,
    name: 'Quesadilla con Carne',
    description: 'Tortilla de harina con queso y carne a elegir',
    price: 6.50,
    image: 'https://cdn.pixabay.com/photo/2017/02/01/16/39/quesadilla-2030648_1280.jpg',
    category: 'Quesadillas'
  },
  {
    id: 6,
    name: 'Burrito de Frijoles',
    description: 'Tortilla de harina con frijoles y queso',
    price: 7.00,
    image: 'https://cdn.pixabay.com/photo/2018/05/28/19/29/burrito-3436980_1280.jpg',
    category: 'Burritos'
  },
  {
    id: 7,
    name: 'Burrito de Carne Asada',
    description: 'Tortilla de harina con carne asada, arroz y frijoles',
    price: 9.50,
    image: 'https://cdn.pixabay.com/photo/2016/04/05/18/25/burrito-1310315_1280.jpg',
    category: 'Burritos'
  },
  {
    id: 8,
    name: 'Guacamole con Totopos',
    description: 'Aguacate fresco con pico de gallo y totopos',
    price: 6.00,
    image: 'https://cdn.pixabay.com/photo/2020/05/21/18/01/guacamole-5201334_1280.jpg',
    category: 'Appetizers'
  },
  {
    id: 9,
    name: 'Nachos con Queso',
    description: 'Totopos con queso caliente y jalapeños',
    price: 5.50,
    image: 'https://cdn.pixabay.com/photo/2017/04/04/19/23/nachos-2202971_1280.jpg',
    category: 'Appetizers'
  }
];

const productContainer = document.getElementById('product-container');

function renderProducts(productsToRender) {
  productContainer.innerHTML = '';
  productsToRender.forEach(product => {
    const productCard = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-details">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="price">$${product.price.toFixed(2)}</div>
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
  if (e.target.classList.contains('add-btn')) {
    const productId = e.target.dataset.id;
    addToCart(productId);
  }
});

function addToCart(productId) {
  if (cart[productId]) {
    cart[productId]++;
  } else {
    cart[productId] = 1;
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
    const productId = e.target.dataset.id;
    removeFromCart(productId);
  }
});

function removeFromCart(productId) {
  if (cart[productId] > 1) {
    cart[productId]--;
  } else {
    delete cart[productId];
  }
  updateCartCount();
  renderCart();
}

function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalContainer = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = '';
  let total = 0;

  for (const productId in cart) {
    const product = products.find(p => p.id == productId);
    const quantity = cart[productId];
    total += product.price * quantity;

    const cartItem = `
      <div class="cart-item">
        <div class="cart-item-details">
          <span>${product.name}</span>
          <span>x${quantity}</span>
          <span>$${(product.price * quantity).toFixed(2)}</span>
        </div>
        <button class="remove-from-cart" data-id="${product.id}">🗑️</button>
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
