document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  const taskInput = document.getElementById('task-name');
  const timeInput = document.getElementById('task-time');
  const taskList = document.getElementById('task-list');

  // Load saved tasks from local storage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function saveAndRender() {
    // Sort tasks by time ascending
    tasks.sort((a, b) => new Date(a.time) - new Date(b.time));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }

  function renderTasks() {
    taskList.innerHTML = '';
    if (tasks.length === 0) {
      taskList.innerHTML = '<p style="text-align:center; color:#888;">No tasks scheduled.</p>';
      return;
    }

    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      const formattedTime = new Date(task.time).toLocaleString([], {
        dateStyle: 'short',
        timeStyle: 'short'
      });

      li.innerHTML = `
        <div class="task-info">
          <strong>${task.name}</strong>
          <span class="task-time">📅 ${formattedTime}</span>
        </div>
        <button class="delete-btn" onclick="deleteTask(${index})">✕</button>
      `;
      taskList.appendChild(li);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTask = {
      name: taskInput.value,
      time: timeInput.value
    };
    tasks.push(newTask);
    saveAndRender();
    
    taskInput.value = '';
    timeInput.value = '';
  });

  window.deleteTask = function(index) {
    tasks.splice(index, 1);
    saveAndRender();
  };

  renderTasks();
});