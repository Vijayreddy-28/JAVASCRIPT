// ---------- DATA ----------
const products = [
  { id: 1, name: "Laptop", price: 1000, img: "images/laptop.jpeg" },
  { id: 2, name: "Phone", price: 500, img: "images/ipone.avif" },
  { id: 3, name: "Shoes", price: 150, img: "images/shoe.jpg" },
  { id: 4, name: "Watch", price: 200, img: "images/watch.jpg" },
  { id: 5, name: "Bed Lamp", price: 400, img: "images/led.jpg" },
  { id: 6, name: "Wall Clock", price: 300, img: "images/wall.jpg" },
  { id: 7, name: "Speaker", price: 250, img: "images/speaker.jpg" },
  { id: 8, name: "College Bag", price: 100, img: "images/college.jpg" },
  { id: 9, name: "Coffee Mug", price: 50, img: "images/coffee.avif" },
  { id: 10, name: "Story Book", price: 20, img: "images/book.jpg" },
];

// ---------- STATE ----------
let cartData = JSON.parse(localStorage.getItem("cart")) || [];

// ---------- ELEMENTS ----------
const cartBtn = document.getElementById("cart-btn");
const cartEl = document.getElementById("cart");
const closeBtn = document.getElementById("close-btn");
const productsContainer = document.getElementById("products");

// ---------- CART TOGGLE ----------
cartBtn.onclick = () => cartEl.classList.add("show");
closeBtn.onclick = () => cartEl.classList.remove("show");

// ---------- RENDER PRODUCTS ----------
function renderProducts(filter = "") {
  let html = "";

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase()),
  );

  filtered.forEach((p) => {
    html += `
      <div class="card">
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <div class="price">$${p.price}</div>
        <button class="product-btn" onclick="addToCart(${p.id})">Add</button>
      </div>
    `;
  });

  productsContainer.innerHTML = html;
}

// ---------- ADD TO CART ----------
function addToCart(id) {
  const item = cartData.find((i) => i.id === id);

  if (item) {
    item.qty++;
  } else {
    cartData.push({ id, qty: 1 });
  }

  update();
}

// ---------- REMOVE ----------
function removeItem(id) {
  cartData = cartData.filter((i) => i.id !== id);
  update();
}

// ---------- CHANGE QTY ----------
function changeQty(id, delta) {
  const item = cartData.find((i) => i.id === id);
  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    removeItem(id);
  } else {
    update();
  }
}

// ---------- UPDATE UI ----------
function update() {
  localStorage.setItem("cart", JSON.stringify(cartData));

  const cartDiv = document.getElementById("cart-items");
  cartDiv.innerHTML = "";

  let subtotal = 0;
  let qty = 0;

  cartData.forEach((item) => {
    const p = products.find((p) => p.id === item.id);
    if (!p) return;

    subtotal += p.price * item.qty;
    qty += item.qty;

    cartDiv.innerHTML += `
      <div class="item">
        <img src="${p.img}">
        <div>
          <strong>${p.name}</strong>
          <div>
            <button class="toggle" onclick="changeQty(${item.id}, -1)">-</button>
            ${item.qty}
            <button class="toggle" onclick="changeQty(${item.id}, 1)">+</button>
            <button class="toggle" onclick="removeItem(${item.id})">X</button>
          </div>
        </div>
      </div>
    `;
  });

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("tax").textContent = tax.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2);
  document.getElementById("cart-count").textContent = qty;
}

// ---------- SEARCH ----------
document.getElementById("search").addEventListener("input", (e) => {
  renderProducts(e.target.value);
});

window.addToCart = addToCart;
window.removeItem = removeItem;
window.changeQty = changeQty;

// ---------- INIT ----------
renderProducts();
update();
