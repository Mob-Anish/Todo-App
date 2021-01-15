//--------- Selectors -----------//

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//----------- Event Listeners -----------//

// Showing stored data in load
window.addEventListener('load', (e) => {
  getTodo();
});

// Add button
todoButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (todoInput.value !== '') {
    addTodo();
  } else {
    alert('Form is empty!');
  }
});

// Trash/check Button
todoList.addEventListener('click', (e) => {
  const item = e.target;
  if (item.matches('.trash-btn, .trash-btn *')) {
    deleteBtn(item);
  } else if (item.matches('.complete-btn, .complete-btn *')) {
    checkBtn(item);
  }
});

//----------- Functions --------------//

// Add to the list
const addTodo = () => {
  // Displaying the list
  const markup = `
            <div class="todo">
                <li class="todo-item">${todoInput.value}</li>
                <button class="complete-btn">
                    <i class="fas fa-check"></i>
                </button>
                <button class="trash-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
     `;

  todoList.insertAdjacentHTML('beforeend', markup);

  saveLocalTodos(todoInput.value);

  // Clear the input value
  todoInput.value = '';
  /////todoInput.blur();
};

// Delete items from the list
const deleteBtn = (e) => {
  const todo = e.parentElement;

  // Animation
  todo.classList.add('fall');
  removeDataLocals(todo);
  todo.addEventListener('transitionend', () => {
    todo.remove();
  });
};

// Mark items as completed on the list
const checkBtn = (e) => {
  const todo = e.parentElement;
  todo.classList.toggle('completed');
};

// Saving data to the local storage
const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
};

// Displaying the stored data
const getTodo = () => {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach((todo) => {
    const markup = `
        <div class="todo">
            <li class="todo-item">${todo}</li>
            <button class="complete-btn">
                <i class="fas fa-check"></i>
            </button>
            <button class="trash-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        `;

    todoList.insertAdjacentHTML('beforeend', markup);
  });
};

// Removing data from local storage
const removeDataLocals = (todo) => {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const delIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(delIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
};
