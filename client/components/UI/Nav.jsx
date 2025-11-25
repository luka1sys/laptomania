
import { Link } from 'react-router';

import { useState } from 'react';

import { useAuth } from '../../src/context/auth.context';
import { useLaptop } from '../../src/context/laptop.context';
// import { X } from 'lucide-react'; // icon for close button

const Nav = () => {
    const { user, logout } = useAuth();
    const { cart, addToCart, removeProduct, clearCart, reduceOne } = useLaptop();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="glass-effect sticky top-0 z-30 border-b border-white/20">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="text-3xl font-extrabold gradient-text hover:scale-105 transition-transform duration-300">
                            Laptomania
                        </Link>
                        <ul className="hidden md:flex ml-10 space-x-2">
                            <li>
                                <Link to="/" className="text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-indigo-50">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/laptops" className="text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-indigo-50">
                                    Laptops
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center">
                        {user ? (
                            <ul className="flex items-center space-x-2">
                                <li
                                    onClick={() => setIsOpen(true)}
                                    className="text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer relative transition-all duration-300 hover:bg-indigo-50"
                                >
                                    Cart
                                    {cart.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
                                            {
                                                cart.reduce((prev, cur) => prev + cur.quantity, 0)
                                            }
                                        </span>
                                    )}
                                </li>
                                <li>
                                    <Link to="/panel" className="text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-indigo-50">
                                        Panel
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={logout}
                                        className="text-gray-700 cursor-pointer hover:text-indigo-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-red-50"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        ) : (
                            <ul className="flex items-center space-x-3">
                                <li>
                                    <Link to="/login" className="text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-indigo-50">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signup" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                                        Sign Up
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>

            {/*  Cart Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-96 glass-effect shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-r border-white/20
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
                    <h2 className="text-2xl font-bold gradient-text">Your Cart</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-300 font-bold text-xl"
                    >
                        ×
                    </button>
                </div>

                {/* Cart Items */}
                <div className="p-6 glass-effect space-y-4 overflow-y-auto bg-gray-200  h-[calc(700px-80px)]">
                    {cart.length === 0 ? (
                        <div className="text-center mt-16">
                            <div className="inline-block p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl">
                                <p className="text-gray-500 text-lg font-semibold">
                                    Your cart is empty
                                </p>
                                <p className="text-gray-400 text-sm mt-2">
                                    Add some laptops to get started!
                                </p>
                            </div>
                        </div>
                    ) : (

                        <>
                            {cart.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-gradient-to-br from-white to-indigo-50/30 rounded-2xl p-4 border border-indigo-100 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex gap-4">
                                        <img
                                            src={item.images?.[0]?.url}
                                            alt={item.model}
                                            className="w-20 h-20 object-cover rounded-xl"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-800 text-sm mb-2">
                                                {item.brand} {item.model}
                                            </h3>

                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs text-gray-500 font-semibold">Qty:</span>
                                                <div className="flex items-center bg-white border-2 border-indigo-200 rounded-lg overflow-hidden">
                                                    <button
                                                        onClick={() => reduceOne(item)}
                                                        className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-600 text-sm font-bold transition-all duration-300"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="px-4 text-gray-800 text-sm font-bold select-none">{item.quantity}</span>
                                                    <button
                                                        onClick={() => addToCart(item)}
                                                        className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-600 text-sm font-bold transition-all duration-300"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs text-gray-500">Unit: <span className="font-semibold text-gray-700">${item.price}</span></p>
                                                    <p className="text-sm font-bold text-indigo-600">Total: ${item.price * item.quantity}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeProduct(item)}
                                                    className="text-xs text-red-500 hover:text-red-700 font-semibold px-3 py-1 rounded-lg hover:bg-red-50 transition-all duration-300"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-4 border-t border-gray-200">
                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 font-semibold">Total Items:</span>
                                        <span className="text-xl font-bold text-indigo-600">{cart.reduce((prev, cur) => prev + cur.quantity, 0)}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-gray-600 font-semibold">Total Price:</span>
                                        <span className="text-2xl font-bold gradient-text">${cart.reduce((prev, cur) => prev + (cur.price * cur.quantity), 0)}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={clearCart}
                                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </>
                    )

                    }

                </div>
            </div>

            {/* Overlay (click to close) */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity animate-fadeIn"
                />
            )}
        </header>
    );
};

export default Nav;



// useCallback - გამოიყენება რომ ფუნქცია არ შეიქმნას თავიდან ყოველი render-ისას
// usememo გამოიყენება როცა გაქვს ძალიან მძიმე გამოთვლა და არ გინდა რომ ის ყოველი render–ზე გამოთვალოს.