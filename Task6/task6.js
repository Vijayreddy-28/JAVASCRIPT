const list = document.getElementById("list");
let draggedItem = null;

const items = document.querySelectorAll("#list li");

items.forEach((item) => {
  // when drag starts
  item.addEventListener("dragstart", () => {
    draggedItem = item;
    item.classList.add("dragging");
  });

  // when drag ends
  item.addEventListener("dragend", () => {
    draggedItem = null;
    item.classList.remove("dragging");
  });

  // when item is dragged over another
  item.addEventListener("dragover", (e) => {
    e.preventDefault();
    item.classList.add("over");
  });

  // when dragged item leaves
  item.addEventListener("dragleave", () => {
    item.classList.remove("over");
  });

  // when item is dropped
  item.addEventListener("drop", () => {
    item.classList.remove("over");

    if (draggedItem !== item) {
      let allItems = [...list.children];
      let draggedIndex = allItems.indexOf(draggedItem);
      let targetIndex = allItems.indexOf(item);

      if (draggedIndex < targetIndex) {
        list.insertBefore(draggedItem, item.nextSibling);
      } else {
        list.insertBefore(draggedItem, item);
      }
    }
  });
});
