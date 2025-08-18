# `Greenova` Fruits & Vegetables E-commerce Web App

### _A modern and responsive frontend web application for an e-commerce platform that sells fresh fruits and vegetables. Built with performance, accessibility, and scalability in mind._

---

## 🚀 Tech Stack

- **Next.js** – React framework for building fast, SEO-friendly applications with App Router  
- **Tailwind CSS** – Utility-first CSS framework for rapid UI development  
- **TypeScript** – Type-safe development for reliability 
- **Supabase (PostgreSQL)** – Backend database and API  
- **NextAuth.js** – Authentication system with OAuth

---

# 📦 Authentication Features (Implemented)

## Email & Password Authentication
- ***Sign Up*** – Users can sign up with email, name, and password 
- ***Login / Logout*** – Secure session management with persistent login state
- ***Forgot Password*** – Request a password reset and update password via email
- ***Change Password*** – Users can update their password when signed in
- ***Set Password*** – For users who signed in via OAuth (Google/Facebook), set a password for their account

## OAuth Authentication
- ***Google & Facebook login***
- ***Account Merging*** – Merge accounts if a user signs in with multiple login methods (email + OAuth)

## Security & Validation
- ***Server-side form validation*** with Zod for extra security beyond client-side checks
- ***Middleware-based route protection*** → restricts access to authenticated users only
- ***Session Management*** – Protects authenticated routes and persists sessions

## UX Enhancements
- ***Real-time form validation*** using React Hook Form + Zod
- ***Loading states / UX feedback*** for all authentication actions
- ***Friendly error handling*** for invalid credentials, OAuth conflicts, and network errors
---

## 🌐 Live Demo

Check out the live version of the app here:  
**[Live Site](https://ecommerce-assignment-frontend-eight.vercel.app/)**

---

## 🧪 Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/Daniyalk0/Ecommerce_assignment_frontend
cd Ecommerce_assignment_frontend
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the project locally**

```bash
npm run dev
```
