let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let today = new Date().toISOString().split("T")[0];

let total = tasks.length;
let todayCount = tasks.filter(t => t.date === today).length;
let completed = tasks.filter(t => t.status === "Completed").length;
let pending = tasks.filter(t => t.status === "Pending").length;

document.getElementById("dashboardSummary").innerText =
    `Total Tasks: ${total} | Today: ${todayCount} | Completed: ${completed} | Pending: ${pending}`;
