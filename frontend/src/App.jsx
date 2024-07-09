import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";
import HomePage from "./pages/home/HomePage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./pages/profile/ProfilePage";
import AdminLayout from "./pages/admin/AdminLayout";
import Admin from "./pages/admin/screens/Admin";
import Comment from "./pages/admin/screens/comments/Comment";
import ManagePosts from "./pages/admin/screens/posts/ManagePosts";
import EditPosts from "./pages/admin/screens/posts/EditPosts";
import Categories from "./pages/admin/screens/categories/Categories";
import EditCategories from "./pages/admin/screens/categories/EditCategories";


function App() {
  return (
    <div className="App font-roboto">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<ArticleDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comment />} />
          <Route path="posts/manage" element={<ManagePosts />} />
          <Route path="posts/manage/edit/:slug" element={<EditPosts />} />
          <Route path="categories/manage" element={<Categories />} />
          <Route path="categories/manage/edit/:slug" element={<EditCategories />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
