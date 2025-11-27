import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import type { UserProps } from '../types/type';
import { useUser } from '../stores/userStore';

const Login = () => {
    const {setUser} = useUser()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'http://localhost:5000/api/auth/login',
                form, {withCredentials: true}
            );
            setUser(res.data.user)
            navigate("/")
        } catch (error) {
            setErr("Invalid email or password")
        }
    }
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <form 
                className='flex flex-col space-y-4 w-full max-w-[400px] max-lg:px-8 max-md:space-y-6'
                onSubmit={handleSubmit}
                >
                <div className='space-y-2'>
                    <h2 className='text-lg'>Email *</h2>
                    <input
                        placeholder='Email'
                        type='email'
                        className='formInput'
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                </div>
                <div className='space-y-2'>
                    <h2 className='text-lg'>Password *</h2>
                    <input
                        placeholder='Password'
                        type='password'
                        className='formInput'
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                    {err && (
                        <p className='text-red-500'>{err}</p>
                    )}
                </div>
                <button 
                    className='bg-gray-700 text-white p-2 w-full mt-4 rounded-xl max-md:py-4 text-xl'>
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login