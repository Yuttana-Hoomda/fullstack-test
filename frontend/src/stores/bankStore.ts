import { create } from 'zustand'
import { persist, } from 'zustand/middleware'
import type { Transaction } from '../types/type'

type BankAccount = {
    balance: number
    transaction: Transaction[]
    deposit: (amount: number | undefined, email: string | undefined) => void
    withdraw: (amount: number | undefined, email: string | undefined) => void
    editTransaction: (id: number, amount: number | undefined) => void
    removeTransaction: (id: number) => void
}

const formatDate = (date: Date) => {
   return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    })
}

export const useBankStore = create<BankAccount>()(
  persist(
    (set, get) => ({
      balance: 1000000,
      transaction: [],
      deposit: (amount: number | undefined, email: string | undefined) => { 
        const newtransaction:Transaction = {
            id: Date.now(),
            date: formatDate(new Date()),
            amount: amount,
            status: 'dep',
            email: email
        }
        set({
            balance: get().balance +  (amount ?? 0),
            transaction: [...get().transaction, newtransaction]
        })
        console.log(get().transaction)
    },
      withdraw: (amount: number | undefined, email: string | undefined) => {
        const newtransaction:Transaction = {
            id: Date.now(),
            date: formatDate(new Date()),
            amount: amount,
            status: 'with',
            email: email
        }
        set({
            balance: get().balance -  (amount ?? 0),
            transaction: [...get().transaction, newtransaction]
        })
      },
      editTransaction: (id: number, amount: number | undefined) => {
        const transaction = get().transaction
        const target = transaction.find(t => t.id === id)
        if(!target) return

        const diffAmount = (amount ?? 0) - (target.amount ?? 0)
        const newBalance = get().balance + diffAmount

        const updatedTransaction = transaction.map(t =>
            t.id === id ? { ...t, amount } : t
        )
        set({
            balance: newBalance,
            transaction: updatedTransaction
        })
      },
      removeTransaction: (id: number) => set({
        transaction: get().transaction.filter((t) => t.id !== id)
    })
    }),
    {
      name: 'bank-balance', 
    },
  ),
)
