const app = document.getElementById("app");

// routes
const routes = {
  home: `
        <div class="card">
          <h1>🏠 Home</h1>
          <p>Welcome to your beautiful SPA</p>
        </div>
      `,
  about: `
        <div class="card">
          <h1>📖 About</h1>
          <p>This SPA uses hash-based routing</p>
        </div>
      `,
  contact: `
        <div class="card">
          <h1>📞 Contact</h1>
          <p>Get in touch anytime</p>
        </div>
      `,
};

// render page
function render() {
  let hash = window.location.hash.slice(1);
  if (!hash) hash = "home";

  app.innerHTML =
    routes[hash] || `<div class="card"><h1>404</h1><p>Page not found</p></div>`;
}

// route change
window.onhashchange = render;

// initial load
render();
