import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { ProtectComponentProps } from "./types";

export const ProtectedComponent: React.FC<ProtectComponentProps> = ({ replace, children }) => {
    const token = useAppSelector((state) => state.token.value);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        token ? setIsLoggedIn(true) : setIsLoggedIn(false);
    }, [token]);
    return isLoggedIn ? children : replace;
}