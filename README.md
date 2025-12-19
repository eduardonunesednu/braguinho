# Braguinho 🏰

Bem-vindo ao **Braguinho**, uma aplicação interativa e educativa para crianças descobrirem a cidade de Bragança!

## 🚀 Estrutura do Projeto

O projeto está dividido em duas partes principais:

- **Backend**: API desenvolvida em Python com **FastAPI**.
- **Frontend**: Aplicação web desenvolvida em **React** com Vite e Tailwind CSS.

---

## 🛠️ Pré-requisitos

Antes de começar, garante que tens instalado no teu computador:

1.  **Git**: Para clonar o repositório.
2.  **Miniconda** ou **Anaconda**: Para gerir o ambiente Python.
3.  **Node.js** (versão 18 ou superior): Para correr o frontend.

---

## 📥 Instalação

### 1. Clonar o Repositório

Evita erros de pastas: abre o terminal e corre:

```bash
git clone https://github.com/eduardonunesednu/braguinho.git
cd braguinho
```

### 2. Configurar o Backend (API)

Este passo instala o Python e as bibliotecas necessárias isoladamente.

```bash
cd backend
conda env create -f environment.yml
conda activate braguinho-backend
cd ..
```
*(Nota: Sempre que abrires um novo terminal para o backend, terás de correr `conda activate braguinho-backend`)*

### 3. Configurar o Frontend (App)

Este passo instala as bibliotecas de Javascript (React, Tailwind, etc).

```bash
cd frontend
npm install
cd ..
```

---

## ▶️ Como Executar

Para teres a aplicação completa a funcionar, precisas de dois terminais abertos ao mesmo tempo.

### Terminal 1: Backend

```bash
cd backend
conda activate braguinho-backend
uvicorn main:app --reload --port 8000
```
- A API ficará disponível em: [http://localhost:8000](http://localhost:8000)
- Documentação interativa: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Status Check**: [http://localhost:8000/status](http://localhost:8000/status)

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```
- A Aplicação abrirá em: [http://localhost:5173](http://localhost:5173)

---

## 📱 Acesso na Rede Local (Wi-Fi)

Se quiseres testar noutro dispositivo (telemóvel, tablet) ligado à mesma rede Wi-Fi:

1.  Olha para o terminal do **frontend**.
2.  Procura a linha que diz `Network:` (ex: `http://192.168.1.5:5173/`).
3.  Abre esse endereço no browser do telemóvel.

---

## 🤝 Contribuição

Desenvolvido para ajudar crianças de 6 a 10 anos a explorar a cidade de forma divertida.