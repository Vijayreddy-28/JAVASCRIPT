const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add a new task
function addTask() {
  if (inputBox.value == "") {
    alert("You must write Something !!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

// Handle clicking on tasks or delete buttons
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
  }
});

// Save tasks to local storage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Load tasks from local storage
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

// Display saved tasks on page load
showTask();
