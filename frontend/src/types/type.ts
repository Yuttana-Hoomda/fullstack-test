export interface User {
    id: number;
    email: string;
}

export interface UserProps {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

