# Electrovese-AAssignment
SmartTodo – Clustered TODO Management API with JWT, Redis Cache, and Timezone Support

# node-todo-app

A fully-featured TODO app backend built with **Node.js**, **Express**, **PostgreSQL**, **Sequelize**, and **Redis**.  
It supports JWT-based authentication, single session per user, timezone-aware TODO handling, paginated caching, clustering with Node’s `cluster` module, and clean design patterns like Observer.

---

# Features

- ✅ User Signup & Login with JWT (single session per user using Redis)
- ✅ CRUD APIs for TODOs with timezone conversion
- ✅ Redis-based caching with pagination per user
- ✅ Observer pattern to decouple event logic
- ✅ Clustered server using all CPU cores
- ✅ Modular folder structure
- ✅ Route validation using express-validator

---

# Tech Stack

- Node.js + Express
- MySQL + Sequelize
- Redis (for auth tokens and TODO cache)
- JWT for session auth
- Moment.js for timezone conversion
- Cluster module for multi-core scaling

---

# Clone the Repository

- git clone https://github.com/yourusername/node-todo-app.git
- cd node-todo-app


# Installation Guide
- npm install

# Start Redis Server
 - redis-server

# Start the Application
- npm start
