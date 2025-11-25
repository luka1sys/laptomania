
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.context.jsx";
import { useLaptop } from "../context/laptop.context.jsx";
import Catalog from "./Catalog.jsx";




const AddLaptop = () => {
    const { addLaptop } = useLaptop();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        addLaptop(formData);
    };

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <div className="glass-effect rounded-2xl p-8">
                <h2 className="text-3xl font-bold gradient-text mb-6">Add New Laptop</h2>

                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="flex flex-col gap-3"
                >
                    {/* Required fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="brand" placeholder="Brand" className="input-modern" required />
                        <input name="model" placeholder="Model" className="input-modern" required />
                        <input name="series" placeholder="Series" className="input-modern" required />
                        <input name="release_year" type="number" placeholder="Release Year" className="input-modern" required />
                        <input name="cpu" placeholder="CPU" className="input-modern" required />
                        <input name="gpu" placeholder="GPU" className="input-modern" required />
                        <input name="ram" placeholder="RAM (e.g. 16GB)" className="input-modern" required />
                        <input name="storage" placeholder="Storage (e.g. 512GB)" className="input-modern" required />
                        <input name="storage_type" placeholder="Storage Type (e.g. SSD / HDD)" className="input-modern" required />
                        <input name="os" placeholder="Operating System (e.g. Windows 11)" className="input-modern" required />
                        <input name="display_size" placeholder="Display Size (e.g. 15.6 inch)" className="input-modern" required />
                        <input name="resolution" placeholder="Resolution (e.g. 1920x1080)" className="input-modern" required />
                        <input name="refresh_rate" placeholder="Refresh Rate (e.g. 144Hz)" className="input-modern" required />
                        <input name="panel_type" placeholder="Panel Type (e.g. IPS, OLED)" className="input-modern" required />
                        <select name="touchscreen" className="input-modern" required>
                            <option value="">Touchscreen?</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        <input name="color" placeholder="Color (e.g. Silver, Black)" className="input-modern" required />
                        <input name="price" type="number" placeholder="Price" className="input-modern" required />
                    </div>

                    {/* Optional fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <input name="discount" type="number" placeholder="Discount (%)" className="input-modern" />
                        <input name="stock" type="number" placeholder="Stock Quantity" className="input-modern" />
                        <input name="battery_capacity" placeholder="Battery Capacity (e.g. 70Wh)" className="input-modern" />
                        <input name="charging_speed" placeholder="Charging Speed (e.g. 100W)" className="input-modern" />
                        <input name="battery_life" placeholder="Battery Life (e.g. 10 hours)" className="input-modern" />
                        <input name="weight" placeholder="Weight (e.g. 1.6kg)" className="input-modern" />
                        <input name="material" placeholder="Material (e.g. Aluminum)" className="input-modern" />
                    </div>
                    <textarea
                        name="description"
                        placeholder="Description"
                        className="input-modern mt-4"
                        rows="4"
                    />

                    {/* Image upload */}
                    <div className="mt-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Product Images</label>
                        <input
                            type="file"
                            name="images"
                            multiple
                            accept="image/*"
                            className="input-modern"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="btn-primary w-full mt-6"
                    >
                        Add Laptop to Catalog
                    </button>
                </form>
            </div>
        </div>
    );
};


const Panel = () => {
    const { user, users, logout, getUsers } = useAuth();
    const [activeView, setActiveView] = useState(null); // null, 'laptops', 'users', 'addLaptop'

    useEffect(() => {
        getUsers();
    }, []);


    return (
        <main className="min-h-screen px-4 py-12">
            <div className="max-w-7xl mx-auto">
                {/* User Dashboard Section */}
                <div className="glass-effect rounded-2xl p-8 mb-8">
                    <h1 className="text-4xl font-bold gradient-text mb-8 text-center">User Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                            <span className="block text-indigo-600 text-sm font-semibold mb-2">Full Name</span>
                            <p className="text-2xl font-bold text-gray-800">{user.fullname}</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                            <span className="block text-blue-600 text-sm font-semibold mb-2">Email</span>
                            <p className="text-lg font-bold text-gray-800 break-all">{user.email}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                            <span className="block text-purple-600 text-sm font-semibold mb-2">Role</span>
                            <p className="text-2xl font-bold text-gray-800 capitalize">{user.role}</p>
                        </div>
                    </div>
                    <button onClick={logout} className="btn-secondary w-full mt-6">
                        Logout
                    </button>
                </div>

                {/* Admin/Moderator Controls */}
                {(user.role === "admin" || user.role === "moderator") && (
                    <>
                        {/* Navigation Buttons */}
                        <div className="glass-effect rounded-2xl p-8 mb-8">
                            <h2 className="text-2xl font-bold gradient-text mb-6 text-center">Management Panel</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <button
                                    onClick={() => setActiveView(activeView === 'laptops' ? null : 'laptops')}
                                    className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                                        activeView === 'laptops'
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                            : 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 hover:from-indigo-200 hover:to-purple-200'
                                    }`}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span>Laptops</span>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setActiveView(activeView === 'users' ? null : 'users')}
                                    className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                                        activeView === 'users'
                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                                            : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 hover:from-blue-200 hover:to-cyan-200'
                                    }`}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        <span>Users</span>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setActiveView(activeView === 'addLaptop' ? null : 'addLaptop')}
                                    className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                                        activeView === 'addLaptop'
                                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                                            : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 hover:from-green-200 hover:to-emerald-200'
                                    }`}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        <span>Add Laptop</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Conditional Content Rendering */}
                        <div className="transition-all duration-500 ease-in-out">
                            {activeView === 'laptops' && (
                                <div className="animate-fadeIn">
                                    <Catalog />
                                </div>
                            )}

                            {activeView === 'users' && (
                                <div className="animate-fadeIn">
                                    <div className="glass-effect rounded-2xl p-8">
                                        <h2 className="text-3xl font-bold gradient-text mb-6">Users List</h2>
                                        {users.length > 0 ? (
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                {users.map((user) => (
                                                    <div
                                                        key={user._id}
                                                        className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                                                    >
                                                        {/* Header with Avatar and Name */}
                                                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                                                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                                                {user.fullname?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div className="flex-1">
                                                                <h3 className="text-lg font-bold text-gray-800 mb-1">{user.fullname}</h3>
                                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                                                    user.role === 'admin' 
                                                                        ? 'bg-red-100 text-red-700' 
                                                                        : user.role === 'moderator'
                                                                        ? 'bg-orange-100 text-orange-700'
                                                                        : 'bg-blue-100 text-blue-700'
                                                                }`}>
                                                                    {user.role}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* User Details */}
                                                        <div className="space-y-3">
                                                            {/* ID */}
                                                            <div className="flex items-start gap-2">
                                                                <span className="text-xs font-semibold text-gray-500 uppercase min-w-[80px]">ID:</span>
                                                                <span className="text-sm text-gray-700 font-mono break-all">{user._id}</span>
                                                            </div>

                                                            {/* Email */}
                                                            <div className="flex items-start gap-2">
                                                                <span className="text-xs font-semibold text-gray-500 uppercase min-w-[80px]">Email:</span>
                                                                <div className="flex items-center gap-2 flex-1">
                                                                    <svg className="w-4 h-4 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                                    </svg>
                                                                    <span className="text-sm text-gray-700 break-all">{user.email}</span>
                                                                </div>
                                                            </div>

                                                            {/* Password (masked) */}
                                                            <div className="flex items-start gap-2">
                                                                <span className="text-xs font-semibold text-gray-500 uppercase min-w-[80px]">Password:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                                    </svg>
                                                                    <span className="text-sm text-gray-500 font-mono">••••••••</span>
                                                                    <span className="text-xs text-gray-400">(hashed)</span>
                                                                </div>
                                                            </div>

                                                            {/* Status Badges */}
                                                            <div className="flex items-start gap-2">
                                                                <span className="text-xs font-semibold text-gray-500 uppercase min-w-[80px]">Status:</span>
                                                                <div className="flex flex-wrap gap-2">
                                                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                                                                        user.isVerified 
                                                                            ? 'bg-green-100 text-green-700' 
                                                                            : 'bg-yellow-100 text-yellow-700'
                                                                    }`}>
                                                                        {user.isVerified ? (
                                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                            </svg>
                                                                        ) : (
                                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                                            </svg>
                                                                        )}
                                                                        {user.isVerified ? 'Verified' : 'Not Verified'}
                                                                    </span>
                                                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                                                                        user.isActive 
                                                                            ? 'bg-blue-100 text-blue-700' 
                                                                            : 'bg-gray-100 text-gray-700'
                                                                    }`}>
                                                                        <span className={`w-2 h-2 rounded-full ${
                                                                            user.isActive ? 'bg-blue-500' : 'bg-gray-400'
                                                                        }`}></span>
                                                                        {user.isActive ? 'Active' : 'Inactive'}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {/* Timestamps */}
                                                            <div className="pt-3 border-t border-gray-200 space-y-2">
                                                                <div className="flex items-start gap-2">
                                                                    <span className="text-xs font-semibold text-gray-500 uppercase min-w-[80px]">Created:</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                        </svg>
                                                                        <span className="text-xs text-gray-600">
                                                                            {new Date(user.createdAt).toLocaleString('en-US', {
                                                                                year: 'numeric',
                                                                                month: 'short',
                                                                                day: 'numeric',
                                                                                hour: '2-digit',
                                                                                minute: '2-digit'
                                                                            })}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-start gap-2">
                                                                    <span className="text-xs font-semibold text-gray-500 uppercase min-w-[80px]">Updated:</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                                        </svg>
                                                                        <span className="text-xs text-gray-600">
                                                                            {new Date(user.updatedAt).toLocaleString('en-US', {
                                                                                year: 'numeric',
                                                                                month: 'short',
                                                                                day: 'numeric',
                                                                                hour: '2-digit',
                                                                                minute: '2-digit'
                                                                            })}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Version */}
                                                            <div className="flex items-start gap-2">
                                                                <span className="text-xs font-semibold text-gray-500 uppercase min-w-[80px]">Version:</span>
                                                                <span className="text-xs text-gray-600 font-mono">v{user.__v}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-12">
                                                <p className="text-gray-500 text-lg">No users found.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeView === 'addLaptop' && (
                                <div className="animate-fadeIn">
                                    <AddLaptop />
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </main>
    )
}

export default Panel;
