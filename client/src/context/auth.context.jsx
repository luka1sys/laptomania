import { createContext, use, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const authContext = createContext();
export const useAuth = () => useContext(authContext);
const API_URL = import.meta.env.VITE_API_URL + "/api";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    // auto login პირველ რენდერზეე გაეშევაბა 
    useEffect(() => {
        const autoLogin = (async () => {
            const res = await fetch(`${API_URL}/auth/auto-login`, {
                method: 'POST',
                credentials: 'include'
            })
            const result = await res.json();
            if (res.ok) {
                console.log(result);
                setUser(result);
                navigate('/panel');

            }
        })
        autoLogin();


    }, [])

        

    const signUp = async (formData) => {
        const toastId = toast.loading('signing...');
        try {
            const res = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)

            })
            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message);
            }

            toast.update(toastId, {
                render: 'Added successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
            navigate('/login')



        } catch (err) {
            toast.update(toastId, {
                render: err.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });

        }


    }

    const login = async (formData) => {
        const toastId = toast.loading('logining...');
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            })
            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message);
            }

            toast.update(toastId, {
                render: 'Login successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })

            setUser(result.user);
            navigate('/panel');


        } catch (err) {
            toast.update(toastId, {
                render: err.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });

        }


    }

    const getUsers = async () => {
        try {
            const res = await fetch(`${API_URL}/auth/users`, {
                method: 'GET',
                credentials: 'include'
            })
            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message);
            }
            setUsers(result.users);
        }
        catch (err) {
            console.log(err);
        }
    }


    const logout = async () => {
        const toastId = toast.loading('logout...');
        try {
            const res = await fetch(`${API_URL}/auth/logout`, {
                method: 'GET',
                credentials: 'include'
            })
            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message);
            }

            toast.update(toastId, {
                render: 'Logout successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
            setUser(null);
            navigate('/login');


        } catch (err) {
            toast.update(toastId, {
                render: err.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    }
    return (
        <authContext.Provider value={{ user,users, signUp, login, logout, getUsers }}>
            {children}
        </authContext.Provider>
    )
}