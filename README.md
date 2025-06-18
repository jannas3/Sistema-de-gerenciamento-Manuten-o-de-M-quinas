
# Sistema de Gerenciamento de Manutenção de Máquinas

## 🛠 Tecnologias
- Frontend: React + MUI + Vite
- Backend: Node.js + Express + Prisma
- Banco: MySQL
- Docker + Docker Compose

## 🚀 Rodando com Docker
```bash
docker-compose up --build
```
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

## 💻 Rodando Localmente

### Backend
```bash
#na raiz do projeto
docker-compose up -d
docker-compose exec backend npx prisma migrate dev --name init
docker-compose up


```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔗 API Principais Rotas
- `/api/machines`
- `/api/maintenances`


