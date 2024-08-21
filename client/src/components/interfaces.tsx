import { ReactNode } from "react";

interface AuthContextType {
    user: Object | null;
    logout?: () => void;
}

interface PrivateRouteProps {
    children: ReactNode;
    accessible?: boolean;
}

export type { AuthContextType, PrivateRouteProps };