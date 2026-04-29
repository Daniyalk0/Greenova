# `Greenova` Fruits & Vegetables E-commerce Web App

### _A modern and responsive full stack web application for an e-commerce platform that sells fresh fruits and vegetables. Built with performance, accessibility, and scalability in mind._

---

## 🚀 Tech Stack Yet...

## Tech Stack

- **Next.js** – React framework for building fast, SEO-friendly applications with App Router  
- **React** – Library for building interactive user interfaces  
- **Tailwind CSS** – Utility-first CSS framework for rapid UI development  
- **TypeScript** – Type-safe development for better reliability and maintainability  

- **Prisma** – Type-safe ORM for database access  
- **Supabase (PostgreSQL)** – Backend database and services  

- **NextAuth.js** – Authentication system with session and OAuth support  

- **Redux Toolkit** – Scalable state management  
- **React Hook Form** – Efficient form handling with validation  
- **Zod** – Schema-based validation for forms and APIs  

- **Razorpay** – Payment gateway integration  

- **Nodemailer** – Email handling for verification and notifications  


---

## 📦 Authentication Features

- Sign Up with email, name & password  
- Login / Logout with secure session management and persistent login state  
- Forgot Password with reset link via email  
- Change Password when signed in  
- Set Password for accounts created via OAuth  
- Google & Facebook login with account merging support  
- Server-side validation with Zod for extra security  
- Middleware-based route protection to restrict private pages  
- Session management to protect routes and persist login  
- Real-time form validation with React Hook Form + Zod  
- Loading states and UX feedback for all auth actions  
- Friendly error handling for invalid credentials, OAuth conflicts, and network issues  



## 🚀 Features

### 🛍️ User Features
- Cart system with localStorage + database sync on login  
- Wishlist functionality  
- Product search with modal interface  
- Product filtering (season & category)  
- Address selection for delivery  
- Delivery availability based on pincode (Active / Limited / Unavailable)
- Complete checkout flow  
- Razorpay (test mode) & Cash on Delivery (COD) support  
- Orders page with detailed summary  

### ⚙️ Admin Features
- Full product management (Create, Read, Update, Delete)  
- User management  
- Order history management  
- Manage serviceable areas via pincodes

### ⚡ Performance & UX
- Optimistic UI updates for faster interactions  
- Skeleton loading for better perceived performance  


## 🧠 Learnings & Challenges

### 📚 Key Learnings
- Implementing authentication with NextAuth (including OAuth + account merging)  
- Managing hybrid state (localStorage + database sync) for cart systems  
- Building a complete checkout and order flow  
- Structuring scalable APIs using Next.js App Router  
- Handling form validation with React Hook Form + Zod  
- Managing global state using Redux Toolkit  
- Integrating Razorpay payment gateway  
- Handling location-based delivery availability logic

### ⚠️ Challenges Faced
- Syncing cart data between localStorage and database on login  
- Handling optimistic updates without UI inconsistencies  
- Managing auth edge cases (especially OAuth account merging)  
- Preventing API errors on slow networks (e.g., incomplete JSON responses)  
- Ensuring consistent UI state during async operations  
- Handling loading states and avoiding UI flickers  
- Keeping delivery availability consistent between client and server

## 🌐 Live Demo

Check out the live version of the app here:  
**[Live Site](https://greenova-pi.vercel.app/)**

---

## 🧪 Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/Daniyalk0/Greenova
cd Greenova
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
