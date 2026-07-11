//client/src/context/useAuth.js

import { useContext } from "react";
import { AuthContext } from "./AuthContext"

// Custom hook so we don't have to write useContext(AuthContext) everywhere
export function useAuth() {
    return useContext(AuthContext);
}