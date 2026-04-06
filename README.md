# Finance Dashboard Backend

Powerful Node.js Backend API for advanced finance tracking, analytics, and transaction caching. Contains features such as full route securitization, user role architecture, and an enterprise caching pipeline.

## 🚀 Tech Stack

- **Framework**: Node.js + Express
- **Database**: PostgreSQL (via Sequelize ORM)
- **Caching**: Redis (Intelligently applied to high-compute queries with a 5-minute Time-To-Live).
- **Environment**: Containerized securely via Docker & Docker Compose.

## 🧪 Testing and API Validation

**All APIs have been comprehensively and successfully tested using Postman.** 

We have verified the accuracy of all route-guards, Authentication mechanisms, role-based database fetches, and standard Create-Read-Update-Delete endpoints via Postman endpoints. Interactive GUI documentation can also be executed dynamically through Swagger via:
`http://localhost:5000/api-docs`

## 🛠️ Installation & Setup

You can run this project locally on your machine or through an abstracted Docker environment.

### 1. Standard Node Setup
Create a `.env` file mapping the correct database variables (`PORT`, `DB_HOST`, `DB_NAME`, etc.).
```bash
npm install
npm run dev
```

### 2. Docker Compose
Run the API attached securely to independent Postgres and Redis containers by mapping everything within `.env`:
```bash
docker-compose up --build
```
_Note: You may need to stop your local `npm run dev` listener to free up port 5000 prior to spinning up Docker containers._
