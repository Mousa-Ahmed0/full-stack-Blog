import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/Home/Home";
import AdminDashbord from "./pages/admin/AdminDashboard";
import CreatePost from "./pages/Create-post/CreatePost";
import PostsPage from "./pages/post-page/Post-page";
import Register from "./pages/Forms/Register";
import Login from "./pages/Forms/Login";

function App() {
  return (
    <BrowserRouter>
     <Header/>
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/posts" element={<PostsPage/>}/>
        <Route path="/postes/create-post" element={<CreatePost/>}/>
        <Route path="/admin-dashbored" element={<AdminDashbord/>}/>

     </Routes>
    </BrowserRouter>
  );
}

export default App;
