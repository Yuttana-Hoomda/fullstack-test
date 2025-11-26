export interface User {
    id: number;
    email: string;
}

export interface UserProps {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export interface Amount {
    amount: number | undefined
}

export interface ModalProps {
    isOpen: boolean
    title: string
    content: React.ReactNode
    handleSubmit: () => void
    handleClose: () => void
}

export interface AmountInputProps {
    value: number | undefined
    err: string
    onChange: (value: number | undefined) => void;
}

export type Transaction = {
  id: number
  date: string
  amount: number | undefined
  status: 'dep' | 'with'
  email: string | undefined
}

export interface EditModalProps {
    isOpen: boolean
    transaction: Transaction
    handleClose: () => void
}

export const nfObject = new Intl.NumberFormat('en-US')