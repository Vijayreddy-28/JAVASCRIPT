let display = document.querySelector('input[name="display"]');

// add value to display
function append(value) {
  display.value += value;
}

// clear display
function clearAll() {
  display.value = "";
}

// delete last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// calculate result
function Calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}

// handle keyboard input
document.addEventListener("keydown", function (e) {
  const key = e.key;

  // allow numbers, operators, and dot
  if ("0123456789/*-+.".includes(key)) {
    append(key);
  }
  // Enter key to calculate
  else if (key === "Enter") {
    e.preventDefault(); // prevent form submission
    Calculate();
  }
  // Backspace to delete last
  else if (key === "Backspace") {
    deleteLast();
  }
  // Escape key to clear all
  else if (key === "Escape") {
    clearAll();
  }
});
