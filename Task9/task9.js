const postsContainer = document.getElementById("posts-container");
const loading = document.getElementById("loader");
let limit = 10;
let page = 1;
let isLoading = false;

async function getPosts() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`,
  );
  return await response.json();
}

async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");

    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;

    postsContainer.appendChild(postEl);
  });
}

async function loadMore() {
  if (isLoading) return;

  isLoading = true;
  loading.classList.add("show");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  page++;
  await showPosts();

  loading.classList.remove("show");
  isLoading = false;
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loadMore();
  }
});

showPosts();
