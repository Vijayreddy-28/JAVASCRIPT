import { applyAll } from "./filters.js";
import { addToCart, removeItem, changeQty, updateCart } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  // ---------- CART ----------
  const cartBtn = document.getElementById("cart-btn");
  const cartEl = document.getElementById("cart");
  const closeBtn = document.getElementById("close-btn");

  if (cartBtn && cartEl) {
    cartBtn.onclick = () => cartEl.classList.add("show");
  }

  if (closeBtn && cartEl) {
    closeBtn.onclick = () => cartEl.classList.remove("show");
  }

  // ---------- ELEMENTS ----------
  const searchEl = document.getElementById("search");
  const sortEl = document.getElementById("sort");

  const minRange = document.getElementById("minRange");
  const maxRange = document.getElementById("maxRange");
  const discountRange = document.getElementById("discountRange");

  const minVal = document.getElementById("minVal");
  const maxVal = document.getElementById("maxVal");
  const discountVal = document.getElementById("discountVal");

  // ---------- EVENTS ----------
  searchEl?.addEventListener("input", applyAll);
  sortEl?.addEventListener("change", applyAll);

  // min slider
  minRange?.addEventListener("input", () => {
    if (+minRange.value > +maxRange.value) {
      minRange.value = maxRange.value;
    }

    if (minVal) minVal.textContent = minRange.value;

    applyAll();
  });

  // max slider
  maxRange?.addEventListener("input", () => {
    if (+maxRange.value < +minRange.value) {
      maxRange.value = minRange.value;
    }

    if (maxVal) maxVal.textContent = maxRange.value;

    applyAll();
  });

  // discount slider
  discountRange?.addEventListener("input", () => {
    if (discountVal) discountVal.textContent = discountRange.value;

    applyAll();
  });

  // ---------- GLOBAL ----------
  window.addToCart = addToCart;
  window.removeItem = removeItem;
  window.changeQty = changeQty;

  // ---------- INIT VALUES ----------
  if (minVal) minVal.textContent = minRange?.value || 0;
  if (maxVal) maxVal.textContent = maxRange?.value || 1000;
  if (discountVal) discountVal.textContent = discountRange?.value || 0;

  // ---------- INIT ----------
  applyAll();
  updateCart();
});
