We selected the MERN stack because it provides a cohesive, full-stack JavaScript solution that is both efficient and well-suited for rapid development. Given the time constraints of the hackathon and the need to deliver a complete and functional application, MERN allowed us to move quickly without compromising on quality or scalability.

There are tons of libraries, tools, and pre-built components available for things like routing, authentication, form handling, charts, and even UI design. That meant we could bootstrap our application quickly, focus on building core features, and avoid wasting time reinventing the wheel.
React gave us a modern, responsive UI built from reusable components. Express and Node.js let us build a lightweight API layer, while MongoDB’s flexible schema structure made it easy to model and seed our data.

Another key reason for choosing MERN was familiarity. It’s the stack we were most comfortable with. Our team had prior experience working with React for frontend development, and we were confident using Node.js and Express for building APIs. This gave us a major head start and let us focus on building features instead of learning new frameworks on the fly.

We were able to build, test, and connect features with minimal overhead. This consistency reduced context switching and made the development process more streamlined for the entire team.
React enabled us to create a responsive, component-driven user interface that could easily handle dynamic data updates — a key requirement for features like the alerts dashboard and user preferences. On the backend, Express.js gave us a lightweight yet powerful way to build out our API routes, while MongoDB offered a flexible, schema-less database that was ideal for working with JSON-based data structures.

We implemented JWT-based authentication to secure all user-specific routes and features. This approach integrates naturally into the MERN stack and gave us full control over session handling and route protection without adding unnecessary complexity.

In terms of scalability and real-time performance, Node.js is well known for its non-blocking, event-driven architecture. This was an advantage for a project like ours, where real-time alerts and asynchronous data handling are core to the experience.

Finally, the MERN ecosystem supports a strong testing environment. We used tools such as Jest, Supertest, and React Testing Library to cover our core functionality, including authentication flows, database interactions, and CRUD operations.



# MERN API Backend – Setup Guide

This is the backend API for a MERN stack application using **Node.js**, **Express**, **React.js** and **MongoDB**.

---

## Technologies Used

- Node.js
- Express
- MongoDB (via Mongoose)
- JSON Web Tokens (JWT) for auth
- dotenv (optional for `.env` usage)

---

## 🛠️ Setup Instructions

Follow the steps below to get the API running locally.

---

### 1. 📁 Clone the Repository

```bash
git clone git@github.com:lindelwa122/monkey-and-river-hackathon.git
cd monkey-and-river-hackathon/api


### 2.  Install Dependencies

```bash
npm install


### 3. 🔐 Set Environment Variables (Using export)
Before running the server, set these environment variables in your terminal:

```bash
export mongoDB="your_mongodb_connection_string"
export JWT_SECRET="your_jwt_secret"
export PORT=5000


# 🚀 How to Run the Client (Vite App)

This document provides step-by-step instructions to set up and run the client-side of a Vite application.

---

## 🧾 Prerequisites

Make sure the following tools are installed on your machine:

- **Node.js** (v16 or higher) – [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **Yarn**

---

📁 Step 1: Navigate to the Client Directory

If your Vite client lives inside a subfolder (e.g., `client/`), navigate to it:

```bash
cd client


📦 Step 2: Install Dependencies

Install all required packages listed in package.json:
npm install


🚀 Step 3: Run the Development Server

Start the Vite dev server:
npm run dev

You will see an output like:
  VITE vX.X.X  ready in xxx ms

  ➜  Local:   http://localhost:5173/
✅ Open the provided URL in your browser to see the app running.


