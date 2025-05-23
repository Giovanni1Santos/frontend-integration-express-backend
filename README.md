## Link do vídeo: https://www.loom.com/share/6b9cd60116ed40098ce800594cf6b94d?sid=9b34aaa7-a48c-49c7-9baf-821c49a52e5d

---

## 📋 Projeto: Dashboard de Tarefas — Frontend React integrado a Backend Express

Este projeto é um **dashboard de gerenciamento de tarefas** (To-Do list), desenvolvido com **React + Vite** no frontend, integrado a um backend **Node.js + Express + Sequelize + JWT**.

Ele permite:

* 📑 Listar todas as tarefas
* ➕ Criar novas tarefas
* ✅ Marcar tarefas como concluídas
* ❌ Deletar tarefas
* 🔍 Visualizar detalhes de uma tarefa específica

O foco do projeto é demonstrar a integração entre frontend e backend de forma organizada e moderna.

---

## 📦 Tecnologias e dependências utilizadas

### 🚀 Frontend:

* **React** — Biblioteca JavaScript para construção de interfaces
* **Vite** — Bundler rápido para projetos frontend
* **Axios** — Cliente HTTP para consumir a API backend
* **React Router DOM** — Gerenciamento de rotas no React
* **ESLint + eslint-config** — Análise de código e boas práticas

Instaladas via:

```bash
npm install react axios react-router-dom
npm install --save-dev eslint
```

---

## 🖥️ Como rodar este projeto na sua máquina

### 1️⃣ Pré-requisitos:

* **Node.js** (versão 18 ou superior)
* **npm** (gerenciador de pacotes do Node)

Verifique se estão instalados:

```bash
node -v
npm -v
```

### 2️⃣ Clone o repositório:

```bash
git clone https://github.com/seu-usuario/frontend-integration-express-backend.git
```

### 3️⃣ Navegue até a pasta do projeto:

```bash
cd frontend-integration-express-backend
```

### 4️⃣ Instale as dependências:

```bash
npm install
```

### 5️⃣ Crie o arquivo `.env`

Configure as variáveis de ambiente necessárias. Exemplo:

```
VITE_API_URL=http://localhost:3000
```

### 6️⃣ Rode a aplicação:

```bash
npm run dev
```

O frontend estará disponível em: [http://localhost:5173](http://localhost:5173)

---

## 📂 Estrutura de pastas

```
├── public/               # Imagens e arquivos estáticos
├── src/
│   ├── components/       # Componentes reutilizáveis React
│   ├── pages/            # Páginas da aplicação
│   ├── services/         # Configuração do Axios
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
└── vite.config.js
```

---

## 📌 Observações

Para o projeto funcionar corretamente, é necessário também rodar o backend (API REST com Node/Express/Sequelize). Certifique-se de que ele está disponível na URL definida em `VITE_API_URL` no arquivo `.env`.

---

