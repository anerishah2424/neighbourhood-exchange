import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PostItem from "./pages/PostItem"; 
import MyBarter from "./pages/MyBarter"; // Correct path based on your project structure
import Requests from "./pages/Requests";
import ItemDetails from "./pages/ItemDetails";
import EditItem from "./pages/EditItem";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUser(token);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Redirect to login if not authenticated */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/my-barter" element={<MyBarter />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/item/:id" element={<ItemDetails />} /> {/* Item details route */}
        <Route path="/edit-item/:id" element={<EditItem />} />
        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Route */}
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/post-item" element={<PostItem />} /> {/* New Route */}
      </Routes>
    </Router>
  );
};

export default App;
