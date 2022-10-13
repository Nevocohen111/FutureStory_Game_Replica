import { createContext, useState } from "react";

const initialState = {
    user: null,
    token: null,
    email: null,
    access: null
};

const AuthContext = createContext({ initialState });

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [logAsNum, setLogAsNum] = useState(0);

    return (
        <AuthContext.Provider value={{ auth, setAuth, logAsNum, setLogAsNum }}>
            {children}
        </AuthContext.Provider>
    )

}
export default AuthContext;