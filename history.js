let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function searchTasks() {
    let date = document.getElementById("searchDate").value;
    let text = document.getElementById("searchText").value.toLowerCase();

    let table = document.getElementById("historyTable");
    table.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        return (
            (date === "" || task.date === date) &&
            (text === "" || task.name.toLowerCase().includes(text))
        );
    });

    if (filteredTasks.length === 0) {
        table.innerHTML = "<tr><td colspan='4'>No tasks found</td></tr>";
        return;
    }

    filteredTasks.forEach(task => {
        let row = table.insertRow();
        row.insertCell(0).innerText = task.name;
        row.insertCell(1).innerText = task.date;
        row.insertCell(2).innerText = task.status;
        row.insertCell(3).innerText = task.notes;
    });
}

function goBack() {
    window.location.href = "index.html";
}
