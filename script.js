let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
    let taskName = document.getElementById("taskName").value;
    let taskDate = document.getElementById("taskDate").value;
    let taskStatus = document.getElementById("taskStatus").value;
    let taskNotes = document.getElementById("taskNotes").value;

    if (taskName === "" || taskDate === "") {
        alert("Please enter task name and date");
        return;
    }

    let task = {
        name: taskName,
        date: taskDate,
        status: taskStatus,
        notes: taskNotes
    };

    tasks.push(task);
    saveAndRefresh();
    clearForm();
}

function displayTasks() {
    let table = document.getElementById("taskTable");
    table.innerHTML = "";

    tasks.forEach((task, index) => {
        let row = table.insertRow();

        row.insertCell(0).innerText = task.name;
        row.insertCell(1).innerText = task.date;

        // Status cell
        let statusCell = row.insertCell(2);
        statusCell.innerText = task.status;
        statusCell.className =
            task.status === "Completed" ? "status-complete" : "status-pending";
        statusCell.style.cursor = "pointer";
        statusCell.onclick = () => toggleStatus(index);

        row.insertCell(3).innerText = task.notes;

        // Delete button
        let deleteCell = row.insertCell(4);
        let delBtn = document.createElement("button");
        delBtn.innerHTML = "❌";
        delBtn.title = "Delete Task";
        delBtn.onclick = () => deleteTask(index);
        delBtn.style.background = "#d32f2f";
        delBtn.style.color = "white";
        delBtn.style.border = "none";
        delBtn.style.padding = "6px 10px";
        delBtn.style.cursor = "pointer";
        deleteCell.appendChild(delBtn);
    });

    updateSummary();
}

function toggleStatus(index) {
    tasks[index].status =
        tasks[index].status === "Pending" ? "Completed" : "Pending";
    saveAndRefresh();
}

function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        saveAndRefresh();
    }
}

function updateSummary() {
    let today = new Date().toISOString().split("T")[0];

    let totalTasks = tasks.length;
    let todayTasks = tasks.filter(task => task.date === today);
    let completed = todayTasks.filter(task => task.status === "Completed").length;
    let pending = todayTasks.filter(task => task.status === "Pending").length;

    document.getElementById("summary").innerText =
        `Total Tasks: ${totalTasks} | Today: ${todayTasks.length} | Completed: ${completed} | Pending: ${pending}`;
}

function saveAndRefresh() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function clearForm() {
    document.getElementById("taskName").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("taskNotes").value = "";
}

displayTasks();
function goToHistory() {
    window.location.href = "history.html";
}
