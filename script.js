
"use strict";

// PATITAS MARKET
// Demo catalog. Replace these products, images and prices with your real inventory.

const products = [
  {
    id: 1, name: "Alimento Premium para Perros", category: "perros",
    subcategory: "dogfood", price: 89.90, oldPrice: 105.00, unit: "3 kg",
    description: "Nutrición completa para perros adultos.",
    tag: "POPULAR", image: "photo-1589924691995-400dc9ecc119"
  },
  {
    id: 2, name: "Croquetas para Cachorros", category: "perros",
    subcategory: "dogfood", price: 64.90, unit: "2 kg",
    description: "Fórmula especial para su crecimiento.",
    tag: "FAVORITO", image: "photo-1582798358481-d199fb7347bb"
  },
  {
    id: 3, name: "Alimento para Gatos Adultos", category: "gatos",
    subcategory: "catfood", price: 59.90, oldPrice: 69.90, unit: "2 kg",
    description: "Alimento completo para gatos adultos.",
    tag: "OFERTA", image: "photo-1573865526739-10659fec78a5"
  },
  {
    id: 4, name: "Comida para Gatitos", category: "gatos",
    subcategory: "catfood", price: 42.90, unit: "1.5 kg",
    description: "Nutrición para los primeros meses.",
    image: "photo-1514888286974-6c03e2ca1dba"
  },
  {
    id: 5, name: "Pelota Interactiva para Perros", category: "juguetes",
    price: 24.90, unit: "1 unidad",
    description: "Diversión y ejercicio para tu engreído.",
    tag: "MÁS VENDIDO", image: "photo-1535294435445-d7249524ef2e"
  },
  {
    id: 6, name: "Ratón de Peluche para Gatos", category: "juguetes",
    price: 12.90, unit: "Pack de 2",
    description: "Juguetes para estimular su instinto.",
    image: "photo-1574144611937-0df059b5ef3e"
  },
  {
    id: 7, name: "Juguete Mordedor Resistente", category: "juguetes",
    price: 29.90, unit: "1 unidad",
    description: "Para morder, jugar y mantenerse activo.",
    image: "photo-1583337130417-3346a1be7dee"
  },
  {
    id: 8, name: "Shampoo Suave para Mascotas", category: "higiene",
    price: 32.90, unit: "500 ml",
    description: "Para una rutina de baño delicada.",
    image: "photo-1516734212186-a967f81ad0d7"
  },
  {
    id: 9, name: "Tratamiento Antipulgas y Garrapatas", category: "higiene",
    price: 49.90, unit: "Consultar presentación",
    description: "Elige un producto veterinario adecuado para tu mascota.",
    tag: "CUIDADO", image: "photo-1548199973-03cce0bbc87b"
  },
  {
    id: 10, name: "Cepillo para Perros y Gatos", category: "higiene",
    price: 19.90, unit: "1 unidad",
    description: "Ayuda a retirar el pelo suelto.",
    image: "photo-1516734212186-a967f81ad0d7"
  },
  {
    id: 11, name: "Cortaúñas para Mascotas", category: "higiene",
    price: 22.90, unit: "1 unidad",
    description: "Herramienta práctica para el cuidado de uñas.",
    image: "photo-1541599540903-216a46ca1dc0"
  },
  {
    id: 12, name: "Correa Ajustable", category: "accesorios",
    price: 34.90, unit: "1 unidad",
    description: "Comodidad para sus paseos diarios.",
    tag: "POPULAR", image: "photo-1601758228041-f3b2795255f1"
  },
  {
    id: 13, name: "Plato de Comida Antideslizante", category: "accesorios",
    price: 27.90, unit: "1 unidad",
    description: "Práctico para la hora de comer.",
    image: "photo-1582798358481-d199fb7347bb"
  },
  {
    id: 14, name: "Bebedero para Mascotas", category: "accesorios",
    price: 39.90, unit: "1 unidad",
    description: "Un recipiente para su agua fresca.",
    image: "photo-1601758123927-196e0b7c7c48"
  },
  {
    id: 15, name: "Cama Acolchada para Mascotas", category: "accesorios",
    price: 89.90, unit: "Talla M",
    description: "Un espacio cómodo para descansar.",
    image: "photo-1541599540903-216a46ca1dc0"
  },
  {
    id: 16, name: "Polo Casual para Perros", category: "ropa",
    price: 29.90, unit: "Tallas XS–L",
    description: "Un look adorable para sus paseos.",
    tag: "NUEVO", image: "photo-1551717743-49959800b1f6"
  },
  {
    id: 17, name: "Casaca para Días Frescos", category: "ropa",
    price: 54.90, unit: "Tallas XS–L",
    description: "Abrigo ligero para sus aventuras.",
    image: "photo-1583337130417-3346a1be7dee"
  },
  {
    id: 18, name: "Bandana Estampada", category: "ropa",
    price: 14.90, unit: "Talla ajustable",
    description: "Un accesorio con mucha personalidad.",
    image: "photo-1548199973-03cce0bbc87b"
  }
];

const categoryNames = {
  todos: "Favoritos de la manada",
  perros: "Todo para perros",
  gatos: "Todo para gatos",
  dogfood: "Alimento para perros",
  catfood: "Alimento para gatos",
  juguetes: "Juguetes para mascotas",
  higiene: "Higiene y cuidado",
  accesorios: "Accesorios para mascotas",
  ropa: "Ropita para mascotas"
};

const state = {
  category: "todos",
  search: "",
  sort: "featured",
  showAll: false,
  cart: new Map(),
  favorites: new Set()
};

const $ = (selector) => document.querySelector(selector);

const productGrid = $("#productGrid");
const emptyState = $("#emptyState");
const filterBar = $("#filterBar");
const cartDrawer = $("#cartDrawer");
const drawerOverlay = $("#drawerOverlay");
const toast = $("#toast");

let toastTimer;

function money(amount) {
  return "S/ " + amount.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function imageUrl(photoId, width = 500) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`;
}

function getFilteredProducts() {
  let result = products.filter((product) => {
    const matchesCategory =
      state.category === "todos" ||
      product.category === state.category ||
      product.subcategory === state.category ||
      (state.category === "perros" && product.subcategory === "dogfood") ||
      (state.category === "gatos" && product.subcategory === "catfood");

    const searchable = [
      product.name,
      product.description,
      product.category,
      product.subcategory,
      product.unit
    ].join(" ").toLowerCase();

    return matchesCategory && searchable.includes(state.search.toLowerCase());
  });

  if (state.sort === "price-low") result.sort((a, b) => a.price - b.price);
  if (state.sort === "price-high") result.sort((a, b) => b.price - a.price);
  if (state.sort === "name") result.sort((a, b) => a.name.localeCompare(b.name, "es"));

  return result;
}

function renderProducts() {
  const result = getFilteredProducts();

  $("#productTitle").textContent =
    state.search ? `Resultados para "${state.search}"` :
    categoryNames[state.category] || "Nuestros productos";

  $("#productSubtitle").textContent =
    `${result.length} ${result.length === 1 ? "producto disponible" : "productos disponibles"} · Precios en soles`;

  filterBar.querySelectorAll("[data-category]").forEach((button) => {
    button.classList.toggle("active", button.dataset.category === state.category);
  });

  emptyState.hidden = result.length > 0;
  productGrid.hidden = result.length === 0;

  const visibleProducts = state.showAll ? result : result.slice(0, 8);

  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${imageUrl(product.image)}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/500x400/f5f5f5/183653?text=Patitas+Market'">
        ${product.tag ? `<span class="product-tag ${product.oldPrice ? "sale" : ""}">${escapeHTML(product.tag)}</span>` : ""}
        <button class="favorite-button ${state.favorites.has(product.id) ? "selected" : ""}"
          data-favorite="${product.id}"
          aria-label="${state.favorites.has(product.id) ? "Quitar de favoritos" : "Agregar a favoritos"}"
          aria-pressed="${state.favorites.has(product.id)}">♥</button>
      </div>
      <div class="product-info">
        <div class="product-category">${escapeHTML(categoryNames[product.category] || product.category)}</div>
        <h3 class="product-name">${escapeHTML(product.name)}</h3>
        <p class="product-description">${escapeHTML(product.description)}</p>
        <div class="product-price-row">
          <span class="product-price">${money(product.price)}</span>
          ${product.oldPrice ? `<span class="product-old-price">${money(product.oldPrice)}</span>` : ""}
        </div>
        <div class="product-unit">${escapeHTML(product.unit)}</div>
        <button class="add-button" data-add="${product.id}">
          <span>＋</span> Agregar al carrito
        </button>
      </div>
    </article>
  `).join("");

  const loadMore = $("#loadMore");
  loadMore.hidden = result.length <= 8;
  loadMore.textContent = state.showAll ? "Mostrar menos ↑" : "Ver todos los productos ↓";
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function setCategory(category) {
  state.category = category;
  state.search = "";
  state.showAll = false;
  $("#searchInput").value = "";
  renderProducts();
  $("#productos").scrollIntoView({ behavior: "smooth" });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

// Product category navigation
document.querySelectorAll("[data-category]").forEach((button) => {
  button.addEventListener("click", () => setCategory(button.dataset.category));
});

document.querySelectorAll("[data-nav]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setCategory(link.dataset.nav);
  });
});

document.querySelectorAll("[data-promo]").forEach((button) => {
  button.addEventListener("click", () => setCategory(button.dataset.promo));
});

// Search
$("#searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.search = $("#searchInput").value.trim();
  state.category = "todos";
  state.showAll = true;
  renderProducts();
  $("#productos").scrollIntoView({ behavior: "smooth" });
});

$("#searchInput").addEventListener("input", () => {
  state.search = $("#searchInput").value.trim();
  state.category = "todos";
  state.showAll = true;
  renderProducts();
});

$("#sortSelect").addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderProducts();
});

$("#loadMore").addEventListener("click", () => {
  state.showAll = !state.showAll;
  renderProducts();
});

$("#resetFilters").addEventListener("click", () => {
  state.category = "todos";
  state.search = "";
  state.showAll = false;
  $("#searchInput").value = "";
  renderProducts();
});

// Favorites and adding items
productGrid.addEventListener("click", (event) => {
  const favoriteButton = event.target.closest("[data-favorite]");
  const addButton = event.target.closest("[data-add]");

  if (favoriteButton) {
    const id = Number(favoriteButton.dataset.favorite);

    if (state.favorites.has(id)) {
      state.favorites.delete(id);
      showToast("Producto eliminado de favoritos");
    } else {
      state.favorites.add(id);
      showToast("¡Agregado a tus favoritos!");
    }

    renderProducts();
    return;
  }

  if (addButton) addToCart(Number(addButton.dataset.add));
});

function addToCart(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;

  const current = state.cart.get(id) || 0;
  state.cart.set(id, current + 1);

  renderCart();
  showToast(`${product.name} agregado al carrito`);
}

function cartQuantity() {
  return [...state.cart.values()].reduce((total, quantity) => total + quantity, 0);
}

function cartSubtotal() {
  return [...state.cart.entries()].reduce((total, [id, quantity]) => {
    const product = products.find((item) => item.id === id);
    return total + (product ? product.price * quantity : 0);
  }, 0);
}

function renderCart() {
  const count = cartQuantity();
  const items = [...state.cart.entries()];
  const isEmpty = items.length === 0;

  $("#cartCount").textContent = count;
  $("#drawerCount").textContent = `(${count})`;
  $("#cartEmpty").hidden = !isEmpty;
  $("#cartSummary").hidden = isEmpty;
  $("#cartItems").hidden = isEmpty;
  $("#cartSubtotal").textContent = money(cartSubtotal());
  $("#checkoutTotal").textContent = money(cartSubtotal());

  $("#cartItems").innerHTML = items.map(([id, quantity]) => {
    const product = products.find((item) => item.id === id);
    if (!product) return "";

    return `
      <div class="cart-line">
        <img src="${imageUrl(product.image, 180)}"
          alt="${escapeHTML(product.name)}"
          onerror="this.onerror=null;this.src='https://placehold.co/180x180/f5f5f5/183653?text=Producto'">
        <div>
          <h3>${escapeHTML(product.name)}</h3>
          <div class="line-price">${money(product.price * quantity)}</div>
          <div class="quantity-control">
            <button data-quantity="${id}" data-change="-1" aria-label="Restar uno">−</button>
            <span>${quantity}</span>
            <button data-quantity="${id}" data-change="1" aria-label="Agregar uno">+</button>
          </div>
        </div>
        <button class="remove-item" data-remove="${id}">Quitar</button>
      </div>
    `;
  }).join("");
}

$("#cartItems").addEventListener("click", (event) => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");

  if (quantityButton) {
    const id = Number(quantityButton.dataset.quantity);
    const change = Number(quantityButton.dataset.change);
    const nextQuantity = (state.cart.get(id) || 0) + change;

    if (nextQuantity <= 0) state.cart.delete(id);
    else state.cart.set(id, nextQuantity);

    renderCart();
  }

  if (removeButton) {
    state.cart.delete(Number(removeButton.dataset.remove));
    renderCart();
    showToast("Producto eliminado del carrito");
  }
});

// Cart drawer
function openCart() {
  cartDrawer.classList.add("open");
  drawerOverlay.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  $("#closeCart").focus();
}

function closeCart() {
  cartDrawer.classList.remove("open");
  drawerOverlay.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

$("#openCart").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
drawerOverlay.addEventListener("click", closeCart);

$("#continueShopping").addEventListener("click", () => {
  closeCart();
  $("#productos").scrollIntoView({ behavior: "smooth" });
});

// Demo checkout
function openCheckout() {
  if (cartQuantity() === 0) {
    showToast("Agrega al menos un producto a tu carrito");
    return;
  }

  closeCart();
  $("#checkoutTotal").textContent = money(cartSubtotal());
  $("#checkoutMessage").hidden = true;
  $("#checkoutForm").hidden = false;
  $("#checkoutModal").classList.add("open");
  document.body.style.overflow = "hidden";
  $("#checkoutModal input").focus();
}

function closeCheckout() {
  $("#checkoutModal").classList.remove("open");
  document.body.style.overflow = "";
}

$("#checkoutButton").addEventListener("click", openCheckout);
$("#closeCheckout").addEventListener("click", closeCheckout);

$("#checkoutModal").addEventListener("click", (event) => {
  if (event.target === $("#checkoutModal")) closeCheckout();
});

$("#checkoutForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const order = {
    reference: "PM-" + Date.now().toString().slice(-8),
    customer: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    notes: formData.get("notes"),
    items: [...state.cart.entries()].map(([id, quantity]) => {
      const product = products.find((item) => item.id === id);
      return {
        name: product.name,
        quantity,
        unitPrice: product.price
      };
    }),
    subtotal: cartSubtotal(),
    currency: "PEN"
  };

  // Intentionally no payment or order transmission.
  // Connect a real backend before accepting customer orders.
  $("#checkoutForm").hidden = true;
  $("#checkoutMessage").hidden = false;
  $("#checkoutMessage").innerHTML = `
    <strong>¡Gracias, ${escapeHTML(order.customer)}!</strong><br>
    Tu solicitud de demostración ${escapeHTML(order.reference)} está preparada.<br>
    Total de productos: <strong>${money(order.subtotal)}</strong><br><br>
    Esta es una vista de demostración: tu pedido no ha sido enviado
    ni se ha realizado ningún cobro.
  `;

  console.log("Demo order — not transmitted:", order);
});

$("#newsletterForm").addEventListener("submit", (event) => {
  event.preventDefault();
  $("#newsletterMessage").textContent =
    "¡Gracias por tu interés! El registro de correos aún no está conectado.";
  event.currentTarget.reset();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();
    closeCheckout();
  }
});

// Initial render
renderProducts();
renderCart();
