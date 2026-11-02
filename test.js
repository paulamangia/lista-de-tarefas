// Teste automatizado para validar a lógica da Lista de Tarefas
// Simula o DOM e LocalStorage do navegador em Node.js

const assert = require('assert');

// 1. Simulação do LocalStorage
const storage = {};
global.localStorage = {
  getItem: (key) => storage[key] || null,
  setItem: (key, val) => { storage[key] = String(val); },
  clear: () => { for (let k in storage) delete storage[k]; }
};

// 2. Simulação básica do DOM
class ElementMock {
  constructor(tagName = 'div') {
    this.tagName = tagName;
    this.children = [];
    this.className = '';
    this.textContent = '';
    this.value = '';
    this.checked = false;
    this.listeners = {};
  }
  addEventListener(event, callback) {
    this.listeners[event] = callback;
  }
  dispatchEvent(event, data = {}) {
    if (this.listeners[event]) {
      this.listeners[event]({ preventDefault: () => {}, ...data });
    }
  }
  appendChild(child) {
    this.children.push(child);
  }
  set innerHTML(val) {
    if (val === '') this.children = [];
  }
  focus() {}
}

const elements = {
  'todo-form': new ElementMock('form'),
  'todo-input': new ElementMock('input'),
  'todo-list': new ElementMock('ul'),
  'counter': new ElementMock('span')
};

global.document = {
  getElementById: (id) => elements[id],
  createElement: (tag) => new ElementMock(tag)
};

// 3. Execução do script da aplicação
console.log('🔄 Carregando script.js...');
require('./script.js');

// 4. Bateria de testes das funcionalidades
console.log('\n--- INICIANDO TESTES ---');

// Teste 1: Estado inicial
assert.strictEqual(elements['todo-list'].children.length, 0, 'A lista inicial deve estar vazia');
assert.strictEqual(elements['counter'].textContent, '0 tarefas pendentes', 'Contador inicial incorreto');
console.log('✅ Teste 1 passou: Estado inicial limpo verificado.');

// Teste 2: Adicionar uma tarefa
elements['todo-input'].value = 'Comprar leite';
elements['todo-form'].dispatchEvent('submit');

assert.strictEqual(elements['todo-list'].children.length, 1, 'Deve haver 1 tarefa na lista');
assert.strictEqual(elements['todo-input'].value, '', 'O campo de input deve ser limpo após adicionar');
assert.strictEqual(elements['counter'].textContent, '1 tarefa pendente', 'Contador deve marcar 1 pendente');

const item1 = elements['todo-list'].children[0];
assert.strictEqual(item1.className.includes('completed'), false, 'Tarefa recém criada não deve ter classe completed');
console.log('✅ Teste 2 passou: Adição de tarefa funcionando corretamente.');

// Teste 3: Adicionar segunda tarefa
elements['todo-input'].value = 'Estudar JavaScript';
elements['todo-form'].dispatchEvent('submit');

assert.strictEqual(elements['todo-list'].children.length, 2, 'Deve haver 2 tarefas na lista');
assert.strictEqual(elements['counter'].textContent, '2 tarefas pendentes', 'Contador deve marcar 2 pendentes');
console.log('✅ Teste 3 passou: Múltiplas tarefas adicionadas com sucesso.');

// Teste 4: Concluir uma tarefa (marcar checkbox)
const checkboxItem1 = item1.children[0].children[0]; // checkbox do primeiro item
checkboxItem1.dispatchEvent('change');

// Após alternar, a lista é re-renderizada
const item1Atualizado = elements['todo-list'].children[0];
assert.strictEqual(item1Atualizado.className.includes('completed'), true, 'Elemento concluído deve receber classe completed');
assert.strictEqual(elements['counter'].textContent, '1 tarefa pendente', 'Contador deve atualizar para 1 pendente');
console.log('✅ Teste 4 passou: Conclusão de tarefa e atribuição de classe visual funcionam.');

// Teste 5: Desmarcar tarefa (voltar a pendente)
const checkboxItem1Atualizado = item1Atualizado.children[0].children[0];
checkboxItem1Atualizado.dispatchEvent('change');

const item1Desmarcado = elements['todo-list'].children[0];
assert.strictEqual(item1Desmarcado.className.includes('completed'), false, 'Não deve mais conter completed');
assert.strictEqual(elements['counter'].textContent, '2 tarefas pendentes', 'Contador deve retornar para 2 pendentes');
console.log('✅ Teste 5 passou: Desmarcar tarefa restaura estado pendente.');

// Teste 6: Remover uma tarefa
const botaoRemover = item1Desmarcado.children[1]; // Botão de deletar
botaoRemover.dispatchEvent('click');

assert.strictEqual(elements['todo-list'].children.length, 1, 'Deve restar apenas 1 tarefa');
assert.strictEqual(elements['todo-list'].children[0].children[0].children[1].textContent, 'Estudar JavaScript', 'Tarefa restante deve ser a segunda');
assert.strictEqual(elements['counter'].textContent, '1 tarefa pendente', 'Contador deve atualizar após remoção');
console.log('✅ Teste 6 passou: Remoção de tarefa funcionando.');

// Teste 7: Persistência no LocalStorage
const dadosSalvos = JSON.parse(storage['minhas_tarefas']);
assert.strictEqual(dadosSalvos.length, 1, 'LocalStorage deve manter sincronizada a quantidade');
assert.strictEqual(dadosSalvos[0].text, 'Estudar JavaScript', 'Dado no LocalStorage confere com a tarefa ativa');
console.log('✅ Teste 7 passou: Sincronização com LocalStorage verificada.');

console.log('\n🎉 TODOS OS TESTES PASSARAM COM SUCESSO!\n');
