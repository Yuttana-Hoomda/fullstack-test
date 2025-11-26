import { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Transaction from "./pages/Transaction";
import type { User } from "./types/type";
import axios from "axios";
import Layout from "./components/Layout";
import DepositAndWithdraw from "./pages/DepositAndWithdraw";
import { useUser } from "./stores/userStore";

function App() {
  const {
    user,
    setUser,
    error,
    setError,
    loading,
    setLoading
  } = useUser()

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
      <Routes>
        <Route path="/login" element={user ? <Navigate to='/'/> : <Login/>}/>
        <Route element={<Layout/>}>
          <Route path="/" element={<DepositAndWithdraw/>}/>
          <Route path="/transaction" element={<Transaction/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
