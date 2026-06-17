const form = document.querySelector("form");
const formSubmitBtn = document.querySelector(".form-submit-btn");

const titleInput = document.querySelector("#task-title");
const categoryInput = document.querySelector("#task-category");

const searchInput = document.querySelector("#search-tasks");
const filterCategory = document.querySelector("#filter-category");
const clearFiltersBtn = document.querySelector(".clear-filters");
const clearTasksBtn = document.querySelector(".clear-tasks-btn");

const tasksGrid = document.querySelector("#tasks-grid");
const pendingTasks = document.querySelector(".pending");
const completedTasks = document.querySelector(".completed");

const totalPending = document.querySelectorAll(".total-pending");
const totalCompleted = document.querySelectorAll(".total-completed");
const total = document.querySelector(".total");

const themeSwitcher = document.querySelector(".switcher");

const propertyOutput = document.querySelector("#property-output");
const attributeOutput = document.querySelector("#attribute-output");
const hasAttributeOutput = document.querySelector("#has-attribute-output");
const setAttributeBtn = document.querySelector("#set-attribute-btn");
const removeAttributeBtn = document.querySelector("#remove-attribute-btn");

const eventLog = document.querySelector("#event-log");
const grandparentBox = document.querySelector(".grandparent-box");
const runBubblingBtn = document.querySelector("#run-bubbling");
const runCapturingBtn = document.querySelector("#run-capturing");

const pipelineSection = document.querySelector("#pipeline-section");
const pipelineOutput = document.querySelector("#pipeline-output");

let tasksArr = JSON.parse(localStorage.getItem("tasks")) || [];
let editingTaskId = null;

const pipelineInfo = {
  HTML: "HTML is the raw markup received by the browser.",
  Parsing:
    "Parsing means the browser reads the HTML characters and understands their structure.",
  Tokenization:
    "Tokenization breaks HTML into meaningful tokens like start tags, end tags, and text.",
  "DOM Tree": "The DOM Tree is the object-based structure created from HTML.",
  CSS: "CSS contains the visual rules for styling elements.",
  "CSSOM Tree":
    "The CSSOM Tree is the object-based structure created from CSS rules.",
  "DOM Tree + CSSOM Tree":
    "The browser combines structure from the DOM and styles from the CSSOM.",
  "Render Tree":
    "The Render Tree contains visible nodes with final styles used for layout and painting.",
};

const formatCount = (count) => {
  return count <= 9 ? `0${count}` : count;
};

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
};

const resetFormMode = () => {
  editingTaskId = null;
  formSubmitBtn.textContent = "Add task";
  form.reset();
};

const clearTaskCards = () => {
  document.querySelectorAll(".task-card").forEach((taskCard) => {
    taskCard.remove();
  });
};

const getFilteredTasks = () => {
  const searchValue = searchInput.value.trim().toLowerCase();
  const categoryValue = filterCategory.value;

  return tasksArr.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchValue) ||
      task.category.toLowerCase().includes(searchValue) ||
      task.status.toLowerCase().includes(searchValue);

    const matchesCategory =
      categoryValue === "0" || task.category === categoryValue;

    return matchesSearch && matchesCategory;
  });
};

const createTaskCard = (taskData) => {
  const mainTaskCard = document.createElement("div");
  mainTaskCard.classList.add("task-card");
  mainTaskCard.setAttribute("data-id", taskData.id);
  mainTaskCard.setAttribute("data-status", taskData.status);
  mainTaskCard.setAttribute("data-category", taskData.category);

  if (taskData.isNew) {
    mainTaskCard.classList.add("is-new");
  }

  const taskContent = document.createElement("div");
  taskContent.classList.add("task-content");

  const taskTitle = document.createElement("h3");
  taskTitle.classList.add("task-title");
  const titleTextNode = document.createTextNode(taskData.title);
  taskTitle.append(titleTextNode);

  if (taskData.isNew) {
    const newBadge = document.createElement("span");
    newBadge.classList.add("new-badge");
    newBadge.textContent = "New";
    taskContent.prepend(newBadge);
  }

  const taskMeta = document.createElement("div");
  taskMeta.classList.add("task-meta");

  const category = document.createElement("p");
  category.classList.add("task-category");
  category.innerHTML = `Category: <span>${taskData.category}</span>`;

  const status = document.createElement("p");
  status.classList.add("task-status");
  status.innerHTML = `Status: <span>${taskData.status}</span>`;

  const taskId = document.createElement("p");
  taskId.classList.add("task-id");
  taskId.innerHTML = `ID: <span>${taskData.id}</span>`;

  const taskCardBtns = document.createElement("div");
  taskCardBtns.classList.add("task-card-btns");

  const editTaskBtn = document.createElement("button");
  editTaskBtn.classList.add("edit-task");
  editTaskBtn.type = "button";
  editTaskBtn.textContent = "Edit";

  const completeTaskBtn = document.createElement("button");
  completeTaskBtn.type = "button";

  if (taskData.status === "completed") {
    completeTaskBtn.classList.add("undo-task");
    completeTaskBtn.textContent = "Undo";
  } else {
    completeTaskBtn.classList.add("complete-task");
    completeTaskBtn.textContent = "Complete";
  }

  const deleteTaskBtn = document.createElement("button");
  deleteTaskBtn.classList.add("delete-task");
  deleteTaskBtn.type = "button";
  deleteTaskBtn.textContent = "Delete";

  taskCardBtns.append(editTaskBtn, completeTaskBtn, deleteTaskBtn);

  taskMeta.append(category, status, taskId);
  taskContent.append(taskTitle, taskMeta);
  mainTaskCard.append(taskContent, taskCardBtns);

  return mainTaskCard;
};

const updateTheTotals = () => {
  const pending = tasksArr.filter((task) => task.status === "pending");
  const completed = tasksArr.filter((task) => task.status === "completed");

  totalPending.forEach((pendingCounter) => {
    pendingCounter.textContent = formatCount(pending.length);
  });

  totalCompleted.forEach((completedCounter) => {
    completedCounter.textContent = formatCount(completed.length);
  });

  total.textContent = formatCount(tasksArr.length);
};

function ui() {
  clearTaskCards();

  const filteredTasks = getFilteredTasks();
  const pendingFragment = document.createDocumentFragment();
  const completedFragment = document.createDocumentFragment();

  filteredTasks.forEach((task) => {
    const taskCard = createTaskCard(task);

    if (task.status === "pending") {
      pendingFragment.append(taskCard);
    }

    if (task.status === "completed") {
      completedFragment.append(taskCard);
    }
  });

  pendingTasks.append(pendingFragment);
  completedTasks.append(completedFragment);

  updateTheTotals();
}

const updateTask = (taskId) => {
  const taskData = tasksArr.find((task) => task.id === taskId);

  if (!taskData) return;

  titleInput.value = taskData.title;
  categoryInput.value = taskData.category;
  formSubmitBtn.textContent = "Update task";
  editingTaskId = taskData.id;
};

const completeTask = (taskId) => {
  const findTask = tasksArr.find((task) => task.id === taskId);

  if (!findTask) return;

  findTask.status = "completed";
  findTask.isNew = false;

  saveTasks();
  ui();
};

const undoTask = (taskId) => {
  const findTask = tasksArr.find((task) => task.id === taskId);

  if (!findTask) return;

  findTask.status = "pending";

  saveTasks();
  ui();
};

const deleteTask = (taskId) => {
  tasksArr = tasksArr.filter((task) => task.id !== taskId);

  if (editingTaskId === taskId) {
    resetFormMode();
  }

  saveTasks();
  ui();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const category = categoryInput.value;

  if (title === "" || category === "0") {
    alert("Please fill all the fields");
    return;
  }

  if (editingTaskId !== null) {
    const findTask = tasksArr.find((task) => task.id === editingTaskId);

    if (!findTask) return;

    findTask.title = title;
    findTask.category = category;
    findTask.isNew = false;

    resetFormMode();
  } else {
    const obj = {
      id: Date.now(),
      title,
      category,
      status: "pending",
      isNew: true,
    };

    tasksArr.push(obj);
    form.reset();
  }

  saveTasks();
  ui();
});

tasksGrid.addEventListener("click", (e) => {
  const clickedButton = e.target;
  const taskCard = clickedButton.closest(".task-card");

  if (!taskCard) return;

  const taskId = Number(taskCard.dataset.id);

  if (clickedButton.classList.contains("edit-task")) {
    updateTask(taskId);
  }

  if (clickedButton.classList.contains("complete-task")) {
    completeTask(taskId);
  }

  if (clickedButton.classList.contains("undo-task")) {
    undoTask(taskId);
  }

  if (clickedButton.classList.contains("delete-task")) {
    deleteTask(taskId);
  }
});

searchInput.addEventListener("input", ui);
filterCategory.addEventListener("change", ui);

clearFiltersBtn.addEventListener("click", () => {
  searchInput.value = "";
  filterCategory.value = "0";
  ui();
});

clearTasksBtn.addEventListener("click", () => {
  const confirmed = confirm("Delete all tasks?");

  if (!confirmed) return;

  tasksArr = [];
  resetFormMode();
  saveTasks();
  ui();
});

themeSwitcher.addEventListener("click", () => {
  const html = document.documentElement;
  const currentTheme = html.dataset.theme;
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  html.dataset.theme = nextTheme;
  document.body.dataset.theme = nextTheme;
  html.setAttribute("data-theme", nextTheme);
  document.body.setAttribute("data-theme", nextTheme);

  document.body.classList.toggle("light-mode", nextTheme === "light");
  themeSwitcher.textContent = nextTheme === "dark" ? "🌛" : "☀️";
});

const updateAttributeDemo = () => {
  propertyOutput.textContent = titleInput.value;
  attributeOutput.textContent = titleInput.getAttribute("value");
  hasAttributeOutput.textContent = titleInput.hasAttribute("data-demo");
};

titleInput.addEventListener("input", updateAttributeDemo);

setAttributeBtn.addEventListener("click", () => {
  titleInput.setAttribute("value", titleInput.value);
  titleInput.setAttribute("data-demo", "true");
  updateAttributeDemo();
});

removeAttributeBtn.addEventListener("click", () => {
  titleInput.removeAttribute("data-demo");
  updateAttributeDemo();
});

const clearEventListeners = () => {
  const currentGrandparent = document.querySelector(".grandparent-box");
  const newGrandparent = currentGrandparent.cloneNode(true);
  currentGrandparent.replaceWith(newGrandparent);

  return {
    grandparent: document.querySelector(".grandparent-box"),
    parent: document.querySelector(".parent-box"),
    child: document.querySelector(".child-btn"),
  };
};

const addLog = (message) => {
  console.log(message);

  const li = document.createElement("li");
  li.textContent = message;
  eventLog.append(li);
};

runBubblingBtn.addEventListener("click", () => {
  eventLog.innerHTML = "";
  const boxes = clearEventListeners();

  boxes.child.addEventListener("click", () => addLog("Child"));
  boxes.parent.addEventListener("click", () => addLog("Parent"));
  boxes.grandparent.addEventListener("click", () => addLog("Grandparent"));

  boxes.child.click();
});

runCapturingBtn.addEventListener("click", () => {
  eventLog.innerHTML = "";
  const boxes = clearEventListeners();

  boxes.grandparent.addEventListener(
    "click",
    () => addLog("Grandparent"),
    true,
  );
  boxes.parent.addEventListener("click", () => addLog("Parent"), true);
  boxes.child.addEventListener("click", () => addLog("Child"), true);

  boxes.child.click();
});

pipelineSection.addEventListener("click", (e) => {
  const card = e.target.closest(".pipeline-card");

  if (!card) return;

  document.querySelectorAll(".pipeline-card").forEach((pipelineCard) => {
    pipelineCard.classList.remove("active");
  });

  card.classList.add("active");
  pipelineOutput.textContent = pipelineInfo[card.dataset.step];
});

const formNote = document.createElement("p");
formNote.classList.add("form-note");
formNote.textContent =
  "Tip: task buttons are handled through one event listener on the board using event delegation.";
form.after(formNote);

updateAttributeDemo();
ui();
