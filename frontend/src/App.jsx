import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";
import HomePage from "./pages/home/HomePage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./pages/profile/ProfilePage";
import BlogPage from "./pages/blog/BlogPage";
import AdminLayout from "./pages/admin/AdminLayout";
import Admin from "./pages/admin/screens/Admin";
import Comment from "./pages/admin/screens/comments/Comment";
import ManagePosts from "./pages/admin/screens/posts/ManagePosts";
import EditPosts from "./pages/admin/screens/posts/EditPosts";
import Categories from "./pages/admin/screens/categories/Categories";
import EditCategories from "./pages/admin/screens/categories/EditCategories";
import Users from "./pages/admin/screens/users/Users";
import AboutPage from "./pages/about/AboutPage";
import MyPostsPage from "./pages/post/MyPostsPage";
import MySavedPostsPage from "./pages/post/MySavedPostsPage";
import ForgotPasswordPage from "./pages/forgotPassword/ForgotPasswordPage";
import ResetPasswordPage from "./pages/forgotPassword/ResetPasswordPage";


function App() {
  return (
    <div className="App font-roboto">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<ArticleDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:resetToken" element={<ResetPasswordPage />} />
        <Route path="/me/profile" element={<ProfilePage />} />
        <Route path="/me/posts" element={<MyPostsPage />} />
        <Route path="/me/saved-posts" element={<MySavedPostsPage />} />
        <Route path="posts/edit/:slug" element={<EditPosts />} />
        <Route path="/admin" element={<AdminLayout />}> 
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comment />} />
          <Route path="posts/manage" element={<ManagePosts />} />
          <Route path="users/manage" element={<Users />} />
          <Route path="categories/manage" element={<Categories />} />
          <Route
            path="categories/manage/edit/:slug"
            element={<EditCategories />}
          />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
