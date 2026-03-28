function loadHistory() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerText = task;
    historyList.appendChild(li);
  });
}

function runAutomation() {
  const input = document.getElementById("taskInput").value;
  let result = "";

  if (input.toLowerCase().includes("learn")) {
    result = "Step 1: Start → Step 2: Practice → Step 3: Build";
  } else if (input.toLowerCase().includes("fitness")) {
    result = "Step 1: Warm up → Step 2: Exercise → Step 3: Diet";
  } else {
    result = "Try: learn coding / fitness plan";
  }

  document.getElementById("output").innerText = result;

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