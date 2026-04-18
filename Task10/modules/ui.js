export function renderProducts(list) {
  const container = document.getElementById("products");

  if (list.length === 0) {
    container.innerHTML = `<p style="text-align:center;">No products found 😕</p>`;
    return;
  }

  let html = "";

  list.forEach((p) => {
    const finalPrice = p.price - (p.price * p.discount) / 100;

    html += `
      <div class="card">
        <img src="${p.img}">
        <h4>${p.name}</h4>

        <div class="price">
          $${finalPrice.toFixed(2)}
          <span style="text-decoration:line-through; color:red;">
            $${p.price}
          </span>
        </div>

        <p style="color:green;">${p.discount}% OFF</p>

        <button class="product-btn" onclick="addToCart(${p.id})">Add</button>
      </div>
    `;
  });

  container.innerHTML = html;
}
