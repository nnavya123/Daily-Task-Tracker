let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let today = new Date().toISOString().split("T")[0];
let table = document.getElementById("todayTable");

tasks.forEach((task, index) => {
    if (task.date === today) {
        let row = table.insertRow();

        row.insertCell(0).innerText = task.name;

        let statusCell = row.insertCell(1);
        statusCell.innerText = task.status;
        statusCell.className = task.status === "Completed"
            ? "status-complete"
            : "status-pending";
        statusCell.style.cursor = "pointer";
        statusCell.onclick = () => toggleStatus(index);

        row.insertCell(2).innerText = task.notes;

        let del = row.insertCell(3);
        del.innerHTML = "❌";
        del.style.cursor = "pointer";
        del.onclick = () => deleteTask(index);
    }
});

function toggleStatus(i) {
    tasks[i].status =
        tasks[i].status === "Pending" ? "Completed" : "Pending";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    location.reload();
}

function deleteTask(i) {
    tasks.splice(i, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    location.reload();
}
