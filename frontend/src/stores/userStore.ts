import { create } from 'zustand'
import type { User } from '../types/type'

type UserStore = {
    user: User | null
    loading: boolean
    error: string
    setUser: (user: User | null) => void
    setLoading: (bool: boolean) => void
    setError: (err: string) => void
}

export const useUser = create<UserStore>((set) => ({
  user: null,
  loading: true,
  error: "",
  setUser: (newUser) => set({user: newUser}),
  setLoading: (bool: boolean) => set({loading: bool}),
  setError: (err: string) => set({error: err})
}))