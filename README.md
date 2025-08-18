# AI SaaS Backend

This is an Express.js API project with MySQL and Sequelize ORM.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MySQL](https://www.mysql.com/) server

## Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/themuhammadattaurrehman/backend.git
   cd backend
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Configure environment variables**

   - Copy `.env` file and update values as needed:

     ```
     PORT=5000
     DB_HOST=localhost
     DB_USER=root
     DB_PASS=
     DB_NAME=ai_saas
     JWT_SECRET=your_secret
     JWT_REFRESH_SECRET=your_refresh_secret
     DB_PORT=3307
     ```

4. **Set up the database**

   - Create a MySQL database named `ai_saas`.
   - Import the SQL schema:

     ```sh
     mysql -u root -p ai_saas < "ai_saas (1).sql"
     ```

5. **Run the server**

   ```sh
   node src/server.js
   ```

   Or for development with auto-reload:

   ```sh
   npx nodemon src/server.js
   ```

## API Endpoints

- Auth: `/api/auth`
- Users: `/api/users`
- Tenants: `/api/tenants`
- Notifications: `/api/notifications`

## Notes

- The first time you run the server, a default SuperAdmin user will be seeded:
  - Email: `superadmin@test.com`
  - Password: `123456`
- Update `.env` secrets before deploying to production.

---

**Project structure:**  
See [src/server.js](src/server.js) and [package.json](package.json) for