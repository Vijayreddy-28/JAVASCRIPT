import { products } from "./data.js";
import { renderProducts } from "./ui.js";

export function applyAll() {
  let filtered = [...products];

  // elements (safe access)
  const searchEl = document.getElementById("search");
  const minEl = document.getElementById("minRange");
  const maxEl = document.getElementById("maxRange");
  const discountEl = document.getElementById("discountRange");
  const sortEl = document.getElementById("sort");

  // values
  const search = searchEl?.value.toLowerCase() || "";
  const min = Number(minEl?.value || 0);
  const max = Number(maxEl?.value || Infinity);
  const discount = Number(discountEl?.value || 0);
  const sort = sortEl?.value || "";

  // search
  if (search) {
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(search));
  }

  // price
  filtered = filtered.filter((p) => p.price >= min && p.price <= max);

  // discount
  filtered = filtered.filter((p) => p.discount >= discount);

  // sort
  if (sort === "low") filtered.sort((a, b) => a.price - b.price);
  else if (sort === "high") filtered.sort((a, b) => b.price - a.price);
  else if (sort === "name")
    filtered.sort((a, b) => a.name.localeCompare(b.name));

  renderProducts(filtered);
}
