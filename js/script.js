console.log ()

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const todoDateInput = document.getElementById("todo-date-input");
  const addTodoButton = document.getElementById("add-todo-button");
  const tasksList = document.querySelector(".tasks");
  const filterButton = document.querySelector("button:nth-of-type(1)"); 
  const resetButton = document.querySelector("button:nth-of-type(2)");
  const initialSlots = document.querySelectorAll(".task");
  
  initialSlots.forEach(setupCheckbox);

  addTodoButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    const taskDate = todoDateInput.value;

    if (!todoInput.value.trim() || !todoDateInput.value) {
        let errorBox = document.querySelector(".error-message");

    if (!errorBox) {
        errorBox = document.createElement("div");
        errorBox.className = "error-message";
        todoInput.parentElement.appendChild(errorBox);
    }

    errorBox.textContent = "⚠️ Please fill in all fields before adding a task!";
    errorBox.style.display = "block";

    return;
  
}
    let errorBox = document.querySelector(".error-message");
       if (errorBox) {
       errorBox.style.display = "none";
       
}

    let filled = false;
    for (let slot of initialSlots) {
      const title = slot.querySelector(".title");
      const meta = slot.querySelector(".meta");

      if (!title.textContent || title.textContent.startsWith("Empty Task")) {
        title.textContent = taskText;
        meta.textContent = taskDate;
        filled = true;
        break;
      }
    }

    if (!filled) {
      const newTask = document.createElement("li");
      newTask.classList.add("task");

      newTask.innerHTML = `
        <div class="checkbox" role="checkbox" aria-checked="false"></div>
        <div class="title">${taskText}</div>
        <div class="meta">${taskDate}</div>
    `;

      tasksList.appendChild(newTask);
      setupCheckbox(newTask);
    }

    todoInput.value = "";
    todoDateInput.value = "";
  });

  filterButton.addEventListener("click", () => {
    const allTasks = document.querySelectorAll(".task");
    allTasks.forEach(task => {
      const checkbox = task.querySelector(".checkbox");
      const checked = checkbox.getAttribute("aria-checked") === "true";
      task.style.display = checked ? "none" : "flex";
    });
  });

  resetButton.addEventListener("click", () => {
    const allTasks = document.querySelectorAll(".task");
    allTasks.forEach(task => {
      task.style.display = "flex";
    });
    todoInput.value = "";
    todoDateInput.value = "";
  });

  function setupCheckbox(task) {
    const checkbox = task.querySelector(".checkbox");
    const title = task.querySelector(".title");

    checkbox.addEventListener("click", () => {
      const checked = checkbox.getAttribute("aria-checked") === "true";
      checkbox.setAttribute("aria-checked", !checked);
      title.style.textDecoration = !checked ? "line-through" : "none";
    });

  }
})
    filterBtn.addEventListener("click", () => {
    const tasks = document.querySelectorAll(".task");
    tasks.forEach(task => {
    const title = task.querySelector(".title").textContent.toLowerCase();

    if (!title.includes("study")) {
    task.style.display = "none";
    } else {
    task.style.display = "flex";
    }
    
});
});

    document.querySelector(".tasks").addEventListener("click", function (e) {
  if (e.target.classList.contains("checkbox")) {
    let taskItem = e.target.closest(".task");
    let isChecked = e.target.getAttribute("aria-checked") === "true";

    if (isChecked) {
      e.target.setAttribute("aria-checked", "false");
      taskItem.classList.remove("completed");
    } else {
      e.target.setAttribute("aria-checked", "true");
      taskItem.classList.add("completed");
    }
  }
});
