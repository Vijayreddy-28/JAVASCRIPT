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
