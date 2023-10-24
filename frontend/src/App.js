import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/Home/Home";
import AdminDashbord from "./pages/admin/AdminDashboard";
import CreatePost from "./pages/Create-post/CreatePost";
import PostsPage from "./pages/post-page/Post-page";
import Register from "./pages/Forms/Register";
import Login from "./pages/Forms/Login";
import Footer from "./components/footer/Footer";
import PostDetails from "./pages/post-details/PostDetails";
import { ToastContainer } from "react-toastify";
import Category from "./pages/category/Category";
import Profile from "./pages/profile/Profile";
import NotFound from "./pages/Not-found/NotFound";
import UsersTable from "./pages/admin/UsersTable";
import PostsTable from "./pages/admin/PostsTable";
import CategoriesTable from "./pages/admin/CategoriesTable";
import CommentsTable from "./pages/admin/CommentsTable";
import ForgotPassword from "./pages/Forms/ForgotPassword";
import Resetpassword from "./pages/Forms/Resetpassword";
import { useSelector } from "react-redux";
function App() {
  const { user } = useSelector(state => state.auth)
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="top-center" />

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to='/' />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/profile/:id" element={<Profile />} />

        <Route path="posts">
          <Route index element={<PostsPage />} />
          <Route path="create-post" element={user ? <CreatePost /> : <Navigate to='/' />} />
          <Route path="details/:id" element={<PostDetails />} /> 
          <Route path="categories/:category" element={<Category />} />
        </Route>

        <Route path="/admin-dashboard">
          <Route index element={user?.isAdmin ? <AdminDashbord /> : <Navigate to='/' />} />
          <Route path="users-table" element={user?.isAdmin ? <UsersTable /> : <Navigate to='/' />} />
          <Route path="posts-table" element={user?.isAdmin ? <PostsTable /> : <Navigate to='/' />} />
          <Route path="categories-table" element={user?.isAdmin ? <CategoriesTable /> : <Navigate to='/' />} />
          <Route path="comments-table" element={user?.isAdmin ? <CommentsTable /> : <Navigate to='/' />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
