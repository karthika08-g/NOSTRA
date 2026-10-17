
const products = [
  { id: 1, name: "Floral Summer Shirt", price: 899, colour: "Blue", occasion: "Summer", tag: "NEW", image: "photo-1596755094514-f87e34085b2c" },
  { id: 2, name: "Classic White Shirt", price: 999, colour: "White", occasion: "Casual", tag: "POPULAR", image: "photo-1603252109303-2751441dd157" },
  { id: 3, name: "Urban Black Shirt", price: 1099, colour: "Black", occasion: "Party", tag: "BESTSELLER", image: "photo-1598033129183-c4f50c736f10" },
  { id: 4, name: "Summer Green Look", price: 799, colour: "Green", occasion: "Beach", tag: "NEW", image: "photo-1515886657613-9f3515b0c78f" },
  { id: 5, name: "Beige Everyday Shirt", price: 949, colour: "Beige", occasion: "Casual", tag: "TRENDING", image: "photo-1591047139829-d91aecb6caea" },
  { id: 6, name: "Blue Weekend Shirt", price: 859, colour: "Blue", occasion: "Beach", tag: "NEW", image: "photo-1521572163474-6864f9cf17ab" },
  { id: 7, name: "Evening Black Style", price: 1299, colour: "Black", occasion: "Party", tag: "POPULAR", image: "photo-1618354691373-d851c5c3a990" },
  { id: 8, name: "White Summer Style", price: 749, colour: "White", occasion: "Summer", tag: "SPECIAL", image: "photo-1602810318383-e386cc2a3ccf" },
  { id: 9, name: "Classic Denim Jacket", price: 1799, colour: "Blue", occasion: "Casual", tag: "NEW", image: "photo-1551028719-00167b16eac5" },
  { id: 10, name: "Premium Black Tee", price: 699, colour: "Black", occasion: "Casual", tag: "POPULAR", image: "photo-1521572163474-6864f9cf17ab" },
  { id: 11, name: "Beige Formal Shirt", price: 1199, colour: "Beige", occasion: "Formal", tag: "TRENDING", image: "photo-1598554747436-c9293d6a588f" },
  { id: 12, name: "Green Casual Shirt", price: 899, colour: "Green", occasion: "Summer", tag: "NEW", image: "photo-1603252109303-2751441dd157" },
  { id: 13, name: "Grey Everyday Hoodie", price: 1499, colour: "Grey", occasion: "Casual", tag: "POPULAR", image: "photo-1556821840-3a63f95609a7" },
  { id: 14, name: "Brown Overshirt", price: 1399, colour: "Brown", occasion: "Casual", tag: "NEW", image: "photo-1591047139829-d91aecb6caea" },
  { id: 15, name: "Pink Summer Top", price: 799, colour: "Pink", occasion: "Summer", tag: "SPECIAL", image: "photo-1525507119028-ed4c629a60a3" },
  { id: 16, name: "Black Party Outfit", price: 1899, colour: "Black", occasion: "Party", tag: "BESTSELLER", image: "photo-1529139574466-a303027c1d8b" },
  { id: 17, name: "White Linen Shirt", price: 1099, colour: "White", occasion: "Summer", tag: "NEW", image: "photo-1603252109303-2751441dd157" },
  { id: 18, name: "Blue Formal Shirt", price: 1299, colour: "Blue", occasion: "Formal", tag: "TRENDING", image: "photo-1598033129183-c4f50c736f10" },
  { id: 19, name: "Sport Active Tee", price: 899, colour: "Grey", occasion: "Sport", tag: "NEW", image: "photo-1523398002811-999ca8dec234" },
  { id: 20, name: "Weekend Beach Shirt", price: 999, colour: "Green", occasion: "Beach", tag: "POPULAR", image: "photo-1596755094514-f87e34085b2c" },
  { id: 21, name: "Classic White Sneakers", price: 1999, colour: "White", occasion: "Casual", tag: "POPULAR", image: "photo-1549298916-b41d501d3772" },
  { id: 22, name: "Urban Black Sneakers", price: 2299, colour: "Black", occasion: "Sport", tag: "NEW", image: "photo-1542291026-7eec264c27ff" },
  { id: 23, name: "Everyday Shoulder Bag", price: 1599, colour: "Brown", occasion: "Casual", tag: "TRENDING", image: "photo-1584917865442-de89df76afd3" },
  { id: 24, name: "Classic Sunglasses", price: 799, colour: "Black", occasion: "Summer", tag: "SPECIAL", image: "photo-1511499767150-a48a237f0083" }
];

const photoURL = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`;

const formatPrice = (price) =>
  "₹" + Number(price).toLocaleString("en-IN");

function readStorage(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    alert("Unable to save your selection in this browser.");
  }
}

let cart = readStorage("nostraCart");
let wishlist = readStorage("nostraWishlist");

function getProduct(id) {
  return products.find(product => product.id === Number(id));
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  document.querySelectorAll(".cart-count").forEach(element => {
    element.textContent = count;
  });
}

function syncWishlistButtons() {
  document.querySelectorAll(".wishlist[data-id]").forEach(button => {
    const active = wishlist.includes(Number(button.dataset.id));
    button.classList.toggle("active", active);
    button.textContent = active ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(active));
  });
}

function makeProductCard(product) {
  const isSaved = wishlist.includes(product.id);

  return `
    <article class="product-card">
      <div class="product-image">
        <img src="${photoURL(product.image)}"
             alt="${product.name}" loading="lazy">

        <span class="product-tag">${product.tag}</span>

        <button class="wishlist ${isSaved ? "active" : ""}"
          data-id="${product.id}"
          type="button"
          aria-label="Add ${product.name} to wishlist"
          aria-pressed="${isSaved}">${isSaved ? "♥" : "♡"}</button>
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.colour} · ${product.occasion}</p>
        <div class="product-actions">
          <div>
            <p class="price">${formatPrice(product.price)}</p>
            <span class="quick-cart-label">Add to cart</span>
          </div>
          <button class="add-cart" data-id="${product.id}"
            type="button" aria-label="Add ${product.name} to cart"
            title="Add to cart">+</button>
        </div>
      </div>
    </article>
  `;
}

// HOME PAGE: render products.
const newArrivalGrid = document.getElementById("newArrivalGrid");
const mostWantedGrid = document.getElementById("mostWantedGrid");

if (newArrivalGrid) {
  newArrivalGrid.innerHTML = products.slice(0, 8)
    .map(makeProductCard).join("");
}

if (mostWantedGrid) {
  mostWantedGrid.innerHTML = products.slice(8, 16)
    .map(makeProductCard).join("");
}

// Left and right buttons for product carousels.
document.querySelectorAll(".product-carousel").forEach(carousel => {
  const track = carousel.querySelector(".product-track");
  const previous = carousel.querySelector(".product-prev");
  const next = carousel.querySelector(".product-next");

  if (!track || !previous || !next) return;

  previous.addEventListener("click", () => {
    track.scrollBy({
      left: -track.clientWidth * 0.8,
      behavior: "smooth"
    });
  });

  next.addEventListener("click", () => {
    track.scrollBy({
      left: track.clientWidth * 0.8,
      behavior: "smooth"
    });
  });
});

// OFFER BAR close button.
const closeOffer = document.getElementById("closeOffer");

if (closeOffer) {
  closeOffer.addEventListener("click", () => {
    const offerBar = document.getElementById("offerBar");
    if (offerBar) offerBar.remove();
  });
}

// MOBILE NAVIGATION.

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.setAttribute("aria-expanded", "false");

  function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.textContent = isOpen ? "×" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", event => {
    if (
      navLinks.classList.contains("open") &&
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
      closeMenu();
    }
  });
}


// HERO IMAGE SLIDER.
const slides = [
  {
    image: "photo-1483985988355-763728e1935b",
    title: "Elevate Your Style.",
    subtitle: "Discover fashion that defines you."
  },
  {
    image: "photo-1515886657613-9f3515b0c78f",
    title: "Own Every Moment.",
    subtitle: "A fresh look for every occasion."
  },
  {
    image: "photo-1529139574466-a303027c1d8b",
    title: "Less Ordinary. More You.",
    subtitle: "Find your next favourite look."
  }
];

let currentSlide = 0;
let sliderTimer;

function showSlide(index) {
  const heroImage = document.getElementById("heroImage");
  if (!heroImage) return;

  currentSlide = (index + slides.length) % slides.length;
  const slide = slides[currentSlide];

  heroImage.style.opacity = "0.3";
  heroImage.src = photoURL(slide.image);

  const title = document.getElementById("heroTitle");
  const subtitle = document.getElementById("heroSubtitle");
  const count = document.getElementById("slideCount");

  if (title) title.textContent = slide.title;
  if (subtitle) subtitle.textContent = slide.subtitle;
  if (count) {
    count.textContent = `0${currentSlide + 1} / 0${slides.length}`;
  }

  heroImage.onload = () => {
    heroImage.style.opacity = "1";
  };

  if (heroImage.complete && heroImage.naturalWidth) {
    heroImage.style.opacity = "1";
  }
}

function startSlider() {
  clearInterval(sliderTimer);
  sliderTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
}

const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

if (prevSlide && nextSlide) {
  prevSlide.addEventListener("click", () => {
    showSlide(currentSlide - 1);
    startSlider();
  });

  nextSlide.addEventListener("click", () => {
    showSlide(currentSlide + 1);
    startSlider();
  });

  startSlider();
}

// ADD PRODUCT TO CART.
function addToCart(id) {
  const product = getProduct(id);
  if (!product) return;

  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: product.id, quantity: 1 });
  }

  saveStorage("nostraCart", cart);
  updateCartCount();

  const message = document.getElementById("checkoutMessage");
  if (message) message.textContent = "";

  alert(`${product.name} added to your cart!`);
}

// WISHLIST: add/remove product.
function toggleWishlist(id) {
  id = Number(id);

  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(itemId => itemId !== id);
  } else {
    wishlist.push(id);
  }

  saveStorage("nostraWishlist", wishlist);
  syncWishlistButtons();
  renderWishlist();
}

// Event delegation for dynamically rendered product cards.
document.addEventListener("click", event => {
  const cartButton = event.target.closest(".add-cart");

  if (cartButton) {
    addToCart(Number(cartButton.dataset.id));
    return;
  }

  const wishlistButton = event.target.closest(".wishlist");

  if (wishlistButton) {
    toggleWishlist(Number(wishlistButton.dataset.id));
  }
});

// COLLECTIONS PAGE: search and filters.
const collectionGrid = document.getElementById("collectionGrid");

if (collectionGrid) {
  const searchInput = document.getElementById("searchInput");
  const resultCount = document.getElementById("resultCount");
  const emptyMessage = document.getElementById("emptyMessage");
  const checkboxes = document.querySelectorAll(
    '.filters input[type="checkbox"]'
  );
  const resetButton = document.getElementById("resetFilters");

  function filterProducts() {
    const query = searchInput.value.trim().toLowerCase();

    const selectedOccasions = [
      ...document.querySelectorAll('input[name="occasion"]:checked')
    ].map(input => input.value);

    const selectedColours = [
      ...document.querySelectorAll('input[name="colour"]:checked')
    ].map(input => input.value);

    const filtered = products.filter(product => {
      const searchText =
        `${product.name} ${product.colour} ${product.occasion} ${product.tag}`
          .toLowerCase();

      const matchesSearch = searchText.includes(query);

      const matchesOccasion =
        selectedOccasions.length === 0 ||
        selectedOccasions.includes(product.occasion);

      const matchesColour =
        selectedColours.length === 0 ||
        selectedColours.includes(product.colour);

      return matchesSearch && matchesOccasion && matchesColour;
    });

    collectionGrid.innerHTML = filtered.map(makeProductCard).join("");
    resultCount.textContent = `${filtered.length} styles`;
    emptyMessage.hidden = filtered.length !== 0;
  }

  searchInput.addEventListener("input", filterProducts);

  checkboxes.forEach(input => {
    input.addEventListener("change", filterProducts);
  });

  resetButton.addEventListener("click", () => {
    searchInput.value = "";
    checkboxes.forEach(input => {
      input.checked = false;
    });
    filterProducts();
  });

  filterProducts();
}

// CART PAGE.
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  if (!cartItems) return;

  cart = cart.filter(item => getProduct(item.id) && item.quantity > 0);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => {
    const product = getProduct(item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  cartItems.innerHTML = cart.map(item => {
    const product = getProduct(item.id);
    if (!product) return "";

    return `
      <article class="cart-item">
        <img src="${photoURL(product.image)}" alt="${product.name}">
        <div>
          <h3>${product.name}</h3>
          <p>${product.colour} · ${product.occasion}</p>
          <p class="cart-item-price">${formatPrice(product.price)}</p>
          <div class="cart-item-controls">
            <button class="quantity-btn" data-cart-action="decrease"
              data-id="${product.id}" aria-label="Decrease quantity">−</button>
            <span class="quantity-number">${item.quantity}</span>
            <button class="quantity-btn" data-cart-action="increase"
              data-id="${product.id}" aria-label="Increase quantity">+</button>
            <button class="remove-item" data-cart-action="remove"
              data-id="${product.id}">Remove</button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  document.getElementById("cartEmpty").hidden = cart.length !== 0;
  document.getElementById("cartSummary").hidden = cart.length === 0;
  document.getElementById("cartItemCount").textContent = itemCount;
  document.getElementById("cartSubtotal").textContent = formatPrice(subtotal);
  document.getElementById("cartTotal").textContent = formatPrice(subtotal);
  document.getElementById("cartDelivery").textContent = "Free";

  saveStorage("nostraCart", cart);
  updateCartCount();
}

document.addEventListener("click", event => {
  const button = event.target.closest("[data-cart-action]");
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.cartAction;
  const item = cart.find(cartItem => cartItem.id === id);

  if (!item) return;

  if (action === "increase") {
    item.quantity += 1;
  } else if (action === "decrease") {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      cart = cart.filter(cartItem => cartItem.id !== id);
    }
  } else if (action === "remove") {
    cart = cart.filter(cartItem => cartItem.id !== id);
  }

  saveStorage("nostraCart", cart);
  renderCart();
});

// Wishlist page.
function renderWishlist() {
  const wishlistGrid = document.getElementById("wishlistGrid");
  if (!wishlistGrid) return;

  wishlist = wishlist.filter(id => getProduct(id));
  wishlistGrid.innerHTML = products
    .filter(product => wishlist.includes(product.id))
    .map(makeProductCard)
    .join("");

  document.getElementById("wishlistEmpty").hidden = wishlist.length !== 0;
  saveStorage("nostraWishlist", wishlist);
}

const checkoutButton = document.getElementById("checkoutButton");

if (checkoutButton) {
  checkoutButton.addEventListener("click", () => {
    const message = document.getElementById("checkoutMessage");

    if (cart.length === 0) {
      message.textContent = "Your cart is empty.";
      return;
    }

    message.textContent =
      "Your cart is ready! A payment and order backend is needed to complete checkout.";
  });
}

// CONTACT FORM: front-end validation and feedback.
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    document.getElementById("contactMessage").textContent =
      "Thank you! Your form is valid. Connect a backend to send your message.";
    contactForm.reset();
  });
}

// NEWSLETTER FORM.
const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", event => {
    event.preventDefault();
    document.getElementById("newsletterMessage").textContent =
      "Thank you for your interest in Nostra!";
    newsletterForm.reset();
  });
}

// Initialise common features on every page.
updateCartCount();
syncWishlistButtons();
renderCart();
renderWishlist();
