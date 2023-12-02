const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
const pinCheckbox = document.querySelector('#pin-checkbox');

let tasks = [];

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    li.appendChild(checkbox);
    const text = document.createElement('span');
    text.textContent = task.text;
    li.appendChild(text);
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      const newText = prompt('Enter new text', task.text);
      if (newText) {
        task.text = newText;
        renderTasks();
      }
    });
    li.appendChild(editBtn);
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      renderTasks();
    });
    li.appendChild(deleteBtn);
    if (task.pinned) {
      li.classList.add('pinned');
      list.prepend(li);
    } else {
      list.appendChild(li);
    }
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newTask = {
    id: Date.now(),
    text: input.value,
    completed: false,
    pinned: pinCheckbox.checked
  };
  tasks.push(newTask);
  renderTasks();
  input.value = '';
});

list.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
      const id = parseInt(event.target.parentNode.dataset.id);
      const task = tasks.find((t) => t.id === id);
      task.completed = event.target.checked;
      renderTasks();
    }
  });
  
  renderTasks();
  