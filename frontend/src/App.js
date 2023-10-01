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

function App() {
  return (
    <BrowserRouter>
                <ToastContainer theme="colored" position="top-center"/>

     <Header/>
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/posts" element={<PostsPage/>}/>
        <Route path="/posts/create-post" element={<CreatePost/>}/>
        <Route path="/posts/details/:id" element={<PostDetails/>}/>
        <Route path="/admin-dashbored" element={<AdminDashbord/>}/>

     </Routes>
     <Footer/>
    </BrowserRouter>
  );
}

export default App;
