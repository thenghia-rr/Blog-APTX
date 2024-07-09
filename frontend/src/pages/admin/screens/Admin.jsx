// Admin.jsx
// import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-8 mx-4 lg:mx-auto mt-8 max-w-5xl">
      <h1 className="text-5xl font-semibold text-[#18a] mb-6">
        Admin Dashboard
      </h1>
      <p className="text-gray-700 text-lg mb-4">
        Welcome to the admin dashboard for your blog website. Here you can
        manage posts, users, and other administrative tasks.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/admin/posts/manage">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Manage Posts
            </h2>
            <p className="text-gray-700">
              View, edit, and delete blog posts. Manage categories and tags
              associated with posts.
            </p>
          </div>
        </Link>
        <Link to="/admin/comments">
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-green-800 mb-2">
            Manage Comments
          </h2>
          <p className="text-gray-700">
            Approve or Unapprove comments. Delete comments of any user by admin
          </p>
        </div>
        </Link>
        <Link to="/admin/categories/manage">
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">
            Manage Categories
          </h2>
          <p className="text-gray-700">
            Monitor website traffic, user engagement, and other analytics
            metrics.
          </p>
        </div>
        </Link>
        <Link to="/admin/users/manage">
        <div className="bg-purple-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-purple-800 mb-2">
            Manage Users
          </h2>
          <p className="text-gray-700">
            Configure website settings, SEO, and other administrative
            configurations.
          </p>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
