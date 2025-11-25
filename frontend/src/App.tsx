import { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Transaction from "./pages/Transaction";
import type { User } from "./types/type";
import axios from "axios";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/user', {
          withCredentials: true
        })
        console.log(res.data)
        setUser(res.data)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])
  return (
    <BrowserRouter>
      {user && <Navbar setUser={setUser}/>}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={user ? <Navigate to='/'/> : <Login setUser={setUser}/>}/>
        <Route path="/transaction" element={<Transaction/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
