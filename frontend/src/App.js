import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
                <ToastContainer theme="colored" position="top-center"/>

     <Header/>
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>

        <Route path="posts">
          <Route index element={<PostsPage/>}/>
          <Route path="create-post" element={<CreatePost/>}/>
          <Route path="details/:id" element={<PostDetails/>}/>
          <Route path="categories/:category" element={<Category/>}/>
        </Route>

        <Route path="/admin-dashbored" element={<AdminDashbord/>}/>

     </Routes>
     <Footer/>
    </BrowserRouter>
  );
}

export default App;
