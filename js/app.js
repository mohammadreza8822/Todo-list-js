const taskInput = document.querySelector("#task-input");
const dateInput = document.querySelector("#date-input");
const addButton = document.querySelector("#add-button");
const filterButton = document.querySelectorAll(".filter-todo");
const alertMessage = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("delete-all-button");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const generateId = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
};

const showAlert = (message, type) => {
  alertMessage.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMessage.append(alert);

  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

const displayTodos = () => {
  todosBody.innerHTML = "";
  if (!todos.length) {
    todosBody.innerHTML = "<tr><td colspan='4'>No task found!</td><tr>";
    return;
  }
  todos.forEach((todo) => {
    todosBody.innerHTML += `
      <tr>
        <td>${todo.task}</td>
        <td>${todo.date || "No date"}</td>
        <td>${todo.completed ? "Completed" : "pending"}</td>
        <td>
          <button>Edit</button>
          <button>Do</button>
          <button>Delete</button>
        </td>
      </tr>
    `;
  });
};

const addHandler = (event) => {
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    id: generateId(),
    task,
    date,
    completed: false,
  };
  if (task) {
    todos.push(todo);
    saveToLocalStorage();
    displayTodos();
    taskInput.value = "";
    dateInput.value = "";
    console.log(todos);
    showAlert("Todo added successfully", "success");
  } else {
    showAlert("Please enter todo!", "error");
  }
};

const filterHandler = (event) => {
  const status = event.dataset.status;
};

const deleteAllHandler = () => {
  if (todos.length) {
    todos = [];
    saveToLocalStorage();
    displayTodos();
    showAlert("All todos cleared Successfully.", "success");
  } else {
    showAlert("No todos to clear", "error");
  }
};

window.addEventListener("load", displayTodos);
addButton.addEventListener("click", addHandler);
filterButton.forEach((button) => {
  button.addEventListener("click", filterHandler);
});
deleteAllButton.addEventListener("click", deleteAllHandler);
