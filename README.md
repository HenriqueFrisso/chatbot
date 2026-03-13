# 🤖 Chatbot – LES

Este repositório contém o desenvolvimento de um **chatbot** como parte da disciplina de **LES (Laboratório de Engenharia de Software)**.
O projeto tem como objetivo aplicar conceitos de engenharia de software no **planejamento, desenvolvimento e evolução** de um sistema conversacional.

---

## ⚡ Funcionalidades

* Respostas automáticas baseadas no codigo e documentação da RoboCup Soccer Simulation 2D.
* Estrutura modular para facilitar manutenção e evolução.
* Integração com **MySQL** para armazenamento de dados.

---

## 🛠 Tecnologias

* **Node.js & npm**
* **Docker & Docker Compose**
* **MySQL**

---

## 🚀 Como rodar o projeto

### 1️⃣ Instalar o npm (apenas na primeira execução)

```bash
npm install
```

### 2️⃣ Iniciar a aplicação

```bash
npm run dev
```

### 3️⃣ Reiniciar o banco de dados (opcional)

```bash
docker compose down -v
docker compose up -d #Inicia automaticamente ao iniciar o projeto
```

### 4️⃣ Acessar o container do banco

```bash
docker exec -it chatbot-db mysql -u chatbot -p
```

Senha: `chatbot`

---

## 📂 Estrutura do projeto

```text
├── backend/                  # Código do servidor e lógica de negócio
│   ├── config/               # Configurações do servidor e variáveis de ambiente
│   ├── controllers/          # Recebem e processam as requisições do usuário
│   ├── services/             # Contêm a lógica de negócio e regras do chatbot
│   ├── repositories/         # Acesso e manipulação de dados no banco
│   └── routes/               # Definição e gerenciamento das rotas da API
├── frontend/                 # Interface e experiência do usuário
│   ├── assets/               # Recursos estáticos como imagens e estilos
│   ├── pages/                # Páginas e telas da aplicação
│   └── services/             # Comunicação com o backend e consumo de APIs
├── database/                 # Scripts e configuração do banco de dados
│   └── init.sql              # Scripts de criação e populamento inicial
├── package.json              # Configuração e dependências do Node.js
└── README.md                 # Documentação do projeto
```

---

## ⚠️ Observações

* Certifique-se de ter o **Docker** e o **Node.js** instalados.
* Este projeto é uma aplicação prática de estudo; adaptações são possíveis para expandir funcionalidades.
