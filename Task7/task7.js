const chatBox = document.getElementById("chatBox");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// get current time
function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// add message to chat
function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.classList.add("message", type);

  msg.innerHTML = `
    ${text}
    <div class="timestamp">${getTime()}</div>
  `;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// send message
function sendMessage() {
  const text = input.value.trim();
  if (text === "") return;

  addMessage(text, "sent");
  input.value = "";

  simulateReply();
}

// auto reply
function simulateReply() {
  const replies = [
    "Hello!",
    "How are you?",
    "Nice!",
    "Tell me more!",
    "Sounds good!",
    "Okay 👍",
  ];

  const randomReply = replies[Math.floor(Math.random() * replies.length)];

  setTimeout(
    () => {
      addMessage(randomReply, "received");
    },
    Math.random() * 2000 + 1000,
  );
}

// send button click
sendBtn.addEventListener("click", sendMessage);

// enter key press
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// auto messages
setInterval(() => {
  const autoMessages = ["Hey!", "Ping!", "Are you there?", "Let's chat!"];
  const msg = autoMessages[Math.floor(Math.random() * autoMessages.length)];
  addMessage(msg, "received");
}, 10000);
