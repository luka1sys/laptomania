/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getItem, setItem } from "../components/utils/localstorage.js";

const LaptopContext = createContext();

export const useLaptop = () => useContext(LaptopContext);

const API_URL = import.meta.env.VITE_API_URL + '/api';

export const LaptopProvider = ({ children }) => {
    const [laptops, setLaptops] = useState([]);
    const [cart, setCart] = useState(getItem('cart') || []);


    useEffect(() => {
        setItem('cart', cart)
    }, [cart])

    const addLaptop = async (formData) => {
        const toastId = toast.loading('Adding...');
        try {
            const res = await fetch(`${API_URL}/laptop`, {
                method: "POST",
                credentials: 'include',
                body: formData
            });

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.message);
            }

            const newLaptop = await res.json();
            setLaptops(prev => [...prev, newLaptop]);
            toast.update(toastId, {
                render: 'Added successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
        } catch (err) {
            toast.update(toastId, {
                render: err.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    }

    const getLaptops = async () => {
        try {
            const res = await fetch(`${API_URL}/laptop`);

            if (!res.ok) {
                throw new Error("Something went wrong!");
            }

            const result = await res.json();
            console.log(result.laptops);

            setLaptops(result.laptops);
        } catch (err) {
            alert(err.message);
        }
    };
    console.log(laptops);

    const deleteLaptop = async (id) => {
        const toastId = toast.loading('Deleting...');
        try {
            const res = await fetch(`${API_URL}/laptop/${id}`, {
                method: "DELETE",
                credentials: "include"
            });

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.message);
            }

            setLaptops(prev => prev.filter(laptop => laptop._id !== id));
            toast.update(toastId, {
                render: 'Deleted successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
        } catch (err) {
            toast.update(toastId, {
                render: err.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    }
    const updateLaptop = async (id, formData) => {
        const toastId = toast.loading('Updating...');
        try {
            const res = await fetch(`${API_URL}/laptop/${id}`, {
                method: "PATCH",
                credentials: 'include',
                body: formData
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }

            const index = laptops.findIndex(laptop => laptop._id === result._id);
            const copyLaptops = [...laptops];
            copyLaptops[index] = result;
            setLaptops(copyLaptops);
            toast.update(toastId, {
                render: 'Updated successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
        } catch (err) {
            toast.update(toastId, {
                render: err.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    }
    const addToCart = async (Product) => {
        const laptop = cart.find(obj => obj._id === Product._id);
        if (laptop) {
            setCart(prev => prev.map(obj => obj._id === Product._id ? { ...obj, quantity: obj.quantity + 1 } : obj));
            return;
        }



        setCart(prev => [...prev, { ...Product, quantity: 1 }]);
    }

    const reduceOne = async (Product) => {
        setCart(prev => prev.map(obj => obj._id === Product._id ? { ...obj, quantity: obj.quantity - 1 } : obj).filter(obj => obj.quantity > 0)
        );
    };
    const removeProduct = (Product) => {
        setCart((prev) => prev.filter(obj => obj._id !== Product._id));

    }
    const clearCart = () => {
        setCart([]);
    }






    useEffect(() => {
        getLaptops();
    }, []);

    return (
        <LaptopContext.Provider value={{ laptops, deleteLaptop, updateLaptop, cart, addLaptop, addToCart, reduceOne, clearCart, removeProduct }}>
            {children}
            <ToastContainer />

        </LaptopContext.Provider>
    )
}