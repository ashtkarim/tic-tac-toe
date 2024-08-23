import { ReactNode } from "react";

interface AuthContextType {
    user: IUser | null;
    logout?: () => void;
}

interface PrivateRouteProps {
    children: ReactNode;
    accessible?: boolean;
}

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

export type { AuthContextType, PrivateRouteProps, IUser };
