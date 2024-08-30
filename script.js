const todos = {
    backlog: ["Task 1", "Task 2", "Task 3"],
    todo: ["Task 4", "Task 5"],
    ongoing: ["Task 6"],
    done: []
};

const statusOrder = ['backlog', 'todo', 'ongoing', 'done'];

function renderTodos(status) {
    const listElement = document.getElementById(`${status}-list`);
    listElement.innerHTML = "";

    todos[status].forEach((todo, index) => {
        const li = document.createElement("li");
        li.textContent = todo;

        const moveLeftBtn = createButton("<", () => moveTodoLeft(status, index));
        const moveRightBtn = createButton(">", () => moveTodoRight(status, index));

        moveLeftBtn.disabled = (status === 'backlog');
        moveRightBtn.disabled = (status === 'done');

        const buttonsDiv = document.createElement("div");
        buttonsDiv.className = "todo-buttons";
        buttonsDiv.appendChild(moveLeftBtn);
        buttonsDiv.appendChild(moveRightBtn);

        li.appendChild(buttonsDiv);
        listElement.appendChild(li);
    });
}

function createButton(text, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.onclick = onClick;
    return button;
}

function moveTodoLeft(currentStatus, index) {
    const currentIndex = statusOrder.indexOf(currentStatus);
    if (currentIndex > 0) {
        const prevStatus = statusOrder[currentIndex - 1];
        const item = todos[currentStatus].splice(index, 1)[0];
        todos[prevStatus].push(item);
        renderTodos(currentStatus);
        renderTodos(prevStatus);
    }
}

function moveTodoRight(currentStatus, index) {
    const currentIndex = statusOrder.indexOf(currentStatus);
    if (currentIndex < statusOrder.length - 1) {
        const nextStatus = statusOrder[currentIndex + 1];
        const item = todos[currentStatus].splice(index, 1)[0];
        todos[nextStatus].push(item);
        renderTodos(currentStatus);
        renderTodos(nextStatus);
    }
}

statusOrder.forEach(status => renderTodos(status));
