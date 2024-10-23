const taskInput = document.querySelector("#task-input");
const dateInput = document.querySelector("#date-input");
const addButton = document.querySelector("#add-button");
const filterButton = document.querySelectorAll(".filter-todo");
const alertMessage = document.getElementById("alert-message");

const todos = JSON.parse(localStorage.getItem("todos")) || [];

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

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
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

addButton.addEventListener("click", addHandler);
filterButton.forEach((button) => {
  button.addEventListener("click", filterHandler);
});
