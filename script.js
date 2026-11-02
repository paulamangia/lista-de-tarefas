// ==========================================
// 1. SELEÇÃO DOS ELEMENTOS DO HTML (DOM)
// ==========================================
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const counter = document.getElementById('counter');

// ==========================================
// 2. ESTADO DA APLICAÇÃO (DADOS)
// ==========================================
// Carrega tarefas salvas no navegador (LocalStorage) ou inicia com lista vazia
let tasks = JSON.parse(localStorage.getItem('minhas_tarefas')) || [];

// Salva a lista de tarefas no armazenamento local do navegador
function salvarTarefas() {
  localStorage.setItem('minhas_tarefas', JSON.stringify(tasks));
}

// Atualiza o contador de pendências
function atualizarContador() {
  const pendentes = tasks.filter(task => !task.completed).length;
  counter.textContent = `${pendentes} tarefa${pendentes === 1 ? '' : 's'} pendente${pendentes === 1 ? '' : 's'}`;
}

// ==========================================
// 3. FUNÇÕES DE MANIPULAÇÃO DAS TAREFAS
// ==========================================

// Renderiza (desenha) todas as tarefas na tela
function renderizarTarefas() {
  // Limpa a lista atual
  todoList.innerHTML = '';

  tasks.forEach((task, index) => {
    // Cria o elemento <li>
    const li = document.createElement('li');
    li.className = `todo-item ${task.completed ? 'completed' : ''}`;

    // Área do checkbox e do texto
    const content = document.createElement('div');
    content.className = 'todo-content';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => alternarConclusao(index));

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = task.text;

    content.appendChild(checkbox);
    content.appendChild(span);

    // Botão de remover (excluir)
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.title = 'Remover tarefa';
    deleteBtn.addEventListener('click', () => removerTarefa(index));

    // Monta o item completo
    li.appendChild(content);
    li.appendChild(deleteBtn);

    // Adiciona na lista visual
    todoList.appendChild(li);
  });

  atualizarContador();
}

// Adiciona uma nova tarefa
function adicionarTarefa(texto) {
  const novaTarefa = {
    text: texto.trim(),
    completed: false
  };

  tasks.push(novaTarefa);
  salvarTarefas();
  renderizarTarefas();
}

// Alterna entre concluída e pendente
function alternarConclusao(index) {
  tasks[index].completed = !tasks[index].completed;
  salvarTarefas();
  renderizarTarefas();
}

// Remove uma tarefa
function removerTarefa(index) {
  tasks.splice(index, 1);
  salvarTarefas();
  renderizarTarefas();
}

// ==========================================
// 4. EVENTOS DO USUÁRIO
// ==========================================

// Ao enviar o formulário (pressionar Enter ou clicar no botão)
todoForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Impede o recarregamento da página

  const texto = todoInput.value;
  if (texto.trim() !== '') {
    adicionarTarefa(texto);
    todoInput.value = ''; // Limpa o campo de texto
    todoInput.focus();
  }
});

// Renderização inicial ao carregar a página
renderizarTarefas();
