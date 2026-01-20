let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let table = document.getElementById("allTasksTable");

function displayTasks(list) {
    table.innerHTML = "";
    if (list.length === 0) {
        table.innerHTML = "<tr><td colspan='4'>No tasks found</td></tr>";
        return;
    }

    list.forEach(task => {
        let row = table.insertRow();
        row.insertCell(0).innerText = task.name;
        row.insertCell(1).innerText = task.date;
        row.insertCell(2).innerText = task.status;
        row.insertCell(3).innerText = task.notes;
    });
}

function searchTasks() {
    let date = document.getElementById("searchDate").value;
    let text = document.getElementById("searchText").value.toLowerCase();

    let filtered = tasks.filter(task =>
        (date === "" || task.date === date) &&
        (text === "" || task.name.toLowerCase().includes(text))
    );

    displayTasks(filtered);
}

displayTasks(tasks);
