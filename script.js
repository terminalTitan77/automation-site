function loadHistory() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${task} <button onclick="deleteTask(${index})">Delete</button>`;
    historyList.appendChild(li);
  });
}

function runAutomation() {
const input = document.getElementById("taskInput").value.trim();

if (input === "") {
  document.getElementById("errorMessage").innerText = "Please enter a task";
  return;
}

document.getElementById("errorMessage").innerText = "";

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(input);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  document.getElementById("lastResult").innerText = result;

  const count = tasks.length;
  document.getElementById("taskCount").innerText = count;  

  loadHistory();
}

loadHistory();
document.getElementById("taskCount").innerText = tasks.length;

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
document.getElementById("taskInput").value = "";