# 📝 Minha Lista de Tarefas (To-Do List)

Uma aplicação simples, elegante e funcional de lista de tarefas desenvolvida com **HTML5, CSS3 e JavaScript puro (Vanilla JS)**. Ideal para quem está dando os primeiros passos no desenvolvimento de software e deseja compreender a integração entre estrutura, estilo e comportamento na web.

---

## ✨ Funcionalidades

- ➕ **Adicionar tarefas**: Insira novas atividades digitando e pressionando `Enter` ou clicando em "Adicionar".
- ✅ **Concluir tarefas**: Marque o checkbox para destacar a tarefa como resolvida (muda para fundo verde, borda indicadora e texto tachado).
- 🔄 **Reverter status**: Desmarque a caixa a qualquer momento para retornar a tarefa ao estado pendente.
- 🗑️ **Remover tarefas**: Exclua itens da lista com um clique no botão de lixeira.
- 📊 **Contador em tempo real**: Acompanhe quantas tarefas ainda estão pendentes.
- 💾 **Persistência com LocalStorage**: Suas tarefas não desaparecem ao recarregar ou fechar a página.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Semântica da estrutura da página (formulário, inputs, listas).
- **CSS3**: Layout flexível (*Flexbox*), gradientes modernos, sombras e transições suaves.
- **JavaScript (ES6+)**: Manipulação dinâmica do DOM, tratamento de eventos e persistência no navegador.
- **Node.js**: Utilizado para execução de testes unitários automatizados.

---

## 📁 Estrutura do Projeto

```text
lista-de-tarefas/
├── index.html   # Estrutura e marcação da aplicação
├── style.css    # Estilização visual e estados (pendente vs concluída)
├── script.js    # Lógica de funcionamento e interação com o usuário
├── test.js      # Bateria de testes automatizados
└── README.md    # Documentação do projeto
```

---

## 🚀 Como Executar Localmente

Não é necessário instalar nenhum servidor ou dependência para utilizar a aplicação:

1. Clone este repositório:
   ```bash
   git clone https://github.com/SEU-USUARIO/lista-de-tarefas.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd lista-de-tarefas
   ```
3. Abra o arquivo `index.html` no seu navegador de preferência (basta dar um duplo clique).

---

## 🧪 Como Rodar os Testes

Para validar se as funcionalidades estão operando corretamente:

```bash
node test.js
```

---

## 💡 Próximos Passos (Ideias para Evoluir)

- [ ] Filtros para visualizar "Todas", "Pendentes" e "Concluídas".
- [ ] Edição de tarefas já criadas.
- [ ] Definição de prazos/datas para entrega.
- [ ] Modo escuro (*Dark Mode*).

---

Feito com dedicação para fins de estudo e prática de programação!
