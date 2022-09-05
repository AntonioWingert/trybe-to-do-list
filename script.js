const ol = document.getElementById('lista-tarefas');

function createListItem(value) {
  const li = document.createElement('li');
  li.innerText = value;
  ol.appendChild(li);
}

function createTask() {
  const input = document.getElementById('texto-tarefa');
  if (!input.value) return alert('Input inválido!');
  createListItem(input.value);
  input.value = '';
}

function selectTask(event) {
  const tasks = document.getElementsByTagName('li');
  for (let index = 0; index < tasks.length; index += 1) {
    tasks[index].classList.remove('selected');
  }
  event.classList.add('selected');
}

function completeTask(event) {
  event.classList.toggle('completed');
}

function deleteAll() {
  ol.innerHTML = '';
}

function deleteDone() {
  const done = document.querySelectorAll('.completed');
  for (let index = 0; index < done.length; index += 1) {
    ol.removeChild(done[index]);
  }
}

function saveTasks() {
  localStorage.setItem('tasks', ol.innerHTML);
}

function restoreTasks() {
  if (!localStorage.getItem('tasks')) return;
  ol.innerHTML = localStorage.getItem('tasks');
}

function moveTaskUp() {
  const selTask = document.querySelector('.selected');
  if (selTask && selTask.previousElementSibling) {
    selTask.parentNode.insertBefore(selTask, selTask.previousElementSibling);
  }
}

function moveTaskDown() {
  const selTask = document.querySelector('.selected');
  if (selTask && selTask.nextElementSibling) {
    selTask.parentNode.insertBefore(selTask.nextElementSibling, selTask);
  }
}

function deleteSelected() {
  const selected = document.querySelector('.selected');
  ol.removeChild(selected);
}

function bubble(event) {
  if (event.target.id === 'salvar-tarefas') saveTasks();
  if (event.target.id === 'mover-cima') moveTaskUp();
  if (event.target.id === 'mover-baixo') moveTaskDown();
  if (event.target.id === 'remover-selecionado') deleteSelected();
}

function bubbleFirst(event) {
  if (event.target.id === 'criar-tarefa') createTask();
  if (event.target.matches('li')) selectTask(event.target);
  if (event.target.id === 'apaga-tudo') deleteAll();
  if (event.target.id === 'remover-finalizados') deleteDone();
  bubble(event);
}

function bubbleSecond(event) {
  if (event.target.matches('li')) completeTask(event.target);
}

document.addEventListener('click', bubbleFirst);
document.addEventListener('dblclick', bubbleSecond);

window.addEventListener('load', restoreTasks);
