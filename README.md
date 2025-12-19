# 🏰 Braguinho - O teu Amigo de Bragança

O **Braguinho** é um assistente virtual inteligente desenhado para ajudar as crianças a explorar a cidade de Bragança de forma divertida e educativa.

## 🚀 Estrutura do Projeto

O projeto está dividido em duas partes principais:
* **Backend (`/backend`):** Construído com **FastAPI** (Python). É aqui que reside a inteligência e as regras de negócio.
* **Frontend (`/frontend`):** Interface moderna construída em **React** com **Tailwind CSS**, focada na experiência do utilizador infantil.

## 🛠️ Como Utilizar

### 1. Preparar o Backend
Navega até à pasta do backend e instala as dependências:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload