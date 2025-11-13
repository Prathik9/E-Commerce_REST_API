# 🛒 E-Commerce REST API

This is a simple **E-Commerce REST API** built using **Node.js**, **Express**, **PostgreSQL**, **Sequelize**, and **Cloudinary**.

It supports:
- User authentication (Admin & Customer)
- Product and Category CRUD
- Cart and Order Management
- Cloudinary Image Uploads
- Swagger API documentation

---

## 🚀 How to Run the Project

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/E-Commerce_REST_API.git
cd E-Commerce_REST_API
```

2️⃣ Install Dependencies
```
npm install
```

3️⃣ Setup PostgreSQL Database\
Create a new user and database:
```
sudo -u postgres psql
CREATE USER ecommerce_user WITH PASSWORD 'password123';
CREATE DATABASE ecommerce_db OWNER ecommerce_user;
\q
```

4️⃣ Create a .env File\
Create a .env file in the project root and add the following:
```
PORT=4000

DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=ecommerce_user
DB_PASS=password123
DB_NAME=ecommerce_db
DB_DIALECT=postgres

JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

5️⃣ Run Database Migrations

If you’re using Sequelize CLI, initialize Sequelize and migrate models:
```
npx sequelize-cli db:migrate
```
6️⃣ Seed the Database (Add Dummy Data)
```
npm run seed
```
```
This will create:

Admin: admin@example.com / password123

Customer: user@example.com / password123

Dummy Categories & Products
````

7️⃣ Start the Server

For development:
```
npm run dev

```
Or for production:
```
npm start

```
```
Server runs on:

http://localhost:4000
```
8️⃣ Test APIs using Swagger

Open Swagger UI in your browser:
```
http://localhost:4000/api-docs


Click Authorize, and enter your JWT token:

Bearer <your-token>

```
You can now test all routes directly in Swagger.
