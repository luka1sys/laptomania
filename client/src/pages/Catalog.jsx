/* eslint-disable react/prop-types */


import { useState } from "react";
import { useLaptop } from "../context/laptop.context.jsx";
import { useAuth } from "../context/auth.context.jsx";

const Laptop = ({ laptop }) => {
    const { deleteLaptop, updateLaptop, addToCart } = useLaptop();
    const { user } = useAuth();
    const [editing, setEditing] = useState(false);

    // Editable fields (excluding DB-related and availability fields)
    const editableFields = Object.keys(laptop).filter(
        (key) => !["_id", "__v", "createdAt", "updatedAt", "isAvailable"].includes(key)
    );

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target); // this captures all inputs

        await updateLaptop(laptop._id, formData);
        setEditing(false);
    };

    return (
        <div className="card-modern group">
            {/* images */}
            <div className="relative overflow-hidden">
                <div className="grid grid-cols-2 gap-1">
                    {laptop.images.map((image) => (
                        <img
                            key={image._id}
                            src={image.url}
                            alt={`${laptop.brand} ${laptop.model}`}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ))}
                </div>
            </div>

            {editing ? (
                <div className="p-6">
                    <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                        {editableFields.map((key) => (
                            <div key={key} className="flex flex-col">
                                <label className="text-xs font-semibold text-gray-600 mb-1 uppercase">{key}</label>

                                {key === "images" ? (
                                    <input
                                        type="file"
                                        name="images"
                                        multiple
                                        className="input-modern"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        name={key}
                                        defaultValue={laptop[key]}
                                        className="input-modern"
                                    />
                                )}
                            </div>
                        ))}

                        <div className="flex gap-3 mt-4">
                            <button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditing(false)}
                                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="p-6">
                    <div className="space-y-3">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {laptop.brand} {laptop.model}
                        </h2>
                        
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                                {laptop.processor || laptop.cpu}
                            </span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                                {laptop.ram}
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                {laptop.storage}
                            </span>
                        </div>
                        
                        <div className="space-y-1 text-sm text-gray-600">
                            <p><span className="font-semibold">Graphics:</span> {laptop.graphics || laptop.gpu}</p>
                            <p><span className="font-semibold">Display:</span> {laptop.display || laptop.display_size}</p>
                            <p><span className="font-semibold">OS:</span> {laptop.os}</p>
                        </div>
                        
                        {laptop.description && (
                            <p className="text-sm text-gray-600 line-clamp-2">{laptop.description}</p>
                        )}

                        <div className="pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <span className="text-3xl font-bold text-indigo-600">${laptop.price}</span>
                                    <span className="text-sm text-gray-500 ml-2">Stock: {laptop.stock}</span>
                                </div>
                            </div>

                            {(user?.role === "admin" || user?.role === "moderator" )  ? (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => deleteLaptop(laptop._id)}
                                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => setEditing(true)}
                                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                                    >
                                        Update
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    onClick={()=>addToCart(laptop)} 
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


const LaptopList = () => {
    const { laptops } = useLaptop();

    if (!laptops || laptops.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="inline-block p-8 glass-effect rounded-2xl">
                    <p className="text-gray-500 text-lg">No laptops found.</p>
                    <p className="text-gray-400 text-sm mt-2">Check back later for new products!</p>
                </div>
            </div>
        );
    }

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {laptops.map((laptop) => {
                return <Laptop key={laptop._id} laptop={laptop} />;
            })}
        </section>
    );
};

const Catalog = () => {
    const { user } = useAuth();

    return (
        <main className="min-h-screen px-4 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold gradient-text mb-4">Laptop Collection</h1>
                    {user ? (
                        <p className="text-gray-600">Welcome back, <span className="font-semibold text-indigo-600">{user.fullname || user.email}</span></p>
                    ) : (
                        <p className="text-gray-600">Discover the perfect laptop for your needs</p>
                    )}
                </div>

                <LaptopList />
            </div>
        </main>
    );
};

export default Catalog;