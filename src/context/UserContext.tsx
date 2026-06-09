import { createContext, useState, ReactNode } from "react";
import { User } from "../types/user";

type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

type Props = {
    children: ReactNode;
};

export const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
