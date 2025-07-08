# MERN Blog - Fullstack Blog Web App

A modern blog web application built with the **MERN stack**, supporting full authentication, rich content editing, admin dashboard, multi-language support, and cloud image upload.

---

## Features

1. **Authentication**: Login, Sign up, Logout using JWT + bcrypt
2. **User & Post CRUD**: Create, read, update, delete
3. **Pagination**: For users and posts list pages
4. **Image Upload**: Upload post images to **Cloudinary** using Multer + Streamifier
5. **Dark Mode**: Theme toggle across UI
6. **Internationalization**: Translate between **English - Vietnamese**
7. **Admin Management**: Manage users, posts, comments, and categories from admin dashboard

---

## Tech Stack

### Frontend

* **React**: UI framework
* **Redux Toolkit**: Global state management
* **React Query**: Data fetching and cache
* **TipTap Editor**: Rich text editor for posts
* **Tailwind CSS**: Utility-first CSS framework

### Backend

* **Node.js & Express.js**: Backend REST API
* **MongoDB + Mongoose**: NoSQL database
* **JWT**: JSON Web Token for secure auth
* **Multer + Cloudinary**: Handle file upload and cloud storage
* **Streamifier**: Convert buffer to stream for direct upload to Cloudinary

---

## Getting Started

1. Clone the repository
2. Configure environment variables:

   * MongoDB URI
   * JWT secret
   * Cloudinary credentials
3. Run the backend & frontend servers
4. Navigate to `http://localhost:4000`

---

## Screenshots (optional)

> Add some screenshots to showcase dark mode, admin panel, and post editor.

---
