import { products } from "./data.js";
import { cartData } from "./state.js";

export function addToCart(id) {
  const item = cartData.find((i) => i.id === id);

  if (item) item.qty++;
  else cartData.push({ id, qty: 1 });

  updateCart();
}

export function removeItem(id) {
  const index = cartData.findIndex((i) => i.id === id);
  if (index !== -1) cartData.splice(index, 1);
  updateCart();
}

export function changeQty(id, delta) {
  const item = cartData.find((i) => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) removeItem(id);
  else updateCart();
}

export function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cartData));

  const cartDiv = document.getElementById("cart-items");
  cartDiv.innerHTML = "";

  let subtotal = 0;
  let qty = 0;

  cartData.forEach((item) => {
    const p = products.find((p) => p.id === item.id);
    if (!p) return;

    const finalPrice = p.price - (p.price * p.discount) / 100;

    subtotal += finalPrice * item.qty;
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
