function loadHistory() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const historyList = document.getElementById("historyList");

  historyList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${task} <button onclick="deleteTask(${index})">Delete</button>`;
    historyList.appendChild(li);
  });

  document.getElementById("taskCount").innerText = tasks.length;
}

async function runAutomation() {
  const input = document.getElementById("taskInput").value.trim();

  if (input === "") {
    document.getElementById("errorMessage").innerText = "Please enter a message";
    return;
  }

  document.getElementById("errorMessage").innerText = "";
  document.getElementById("output").innerText = "Thinking...";

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt: input })
  });

  const data = await response.json();

  document.getElementById("output").innerText = data.reply;
  document.getElementById("lastResult").innerText = data.reply;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(input);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  loadHistory();
  document.getElementById("taskInput").value = "";
}

function clearTasks() {
  localStorage.removeItem("tasks");
  document.getElementById("historyList").innerHTML = "";
  document.getElementById("taskCount").innerText = 0;
  document.getElementById("output").innerText = "";
  document.getElementById("lastResult").innerText = "No result yet";
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadHistory();
}

loadHistory();