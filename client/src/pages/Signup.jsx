import { useAuth } from "../context/auth.context.jsx"
import { UseForm } from "../hooks/useForm.js"


const SignUp = () => {
    const { signUp,googleAuth } = useAuth();
    const [formData, handlechange] = UseForm({
        fullname: '',
        email: '',
        password: ''
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        signUp(formData);



    }
    return (
        <main className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold gradient-text mb-2">Create Account</h1>
                    <p className="text-gray-600">Join us and start your journey</p>
                </div>

                <div className="glass-effect rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handlechange}
                                placeholder="John Doe"
                                className="input-modern"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handlechange}
                                placeholder="you@example.com"
                                className="input-modern"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={handlechange}
                                name="password"
                                placeholder="••••••••"
                                className="input-modern"
                                required
                            />
                        </div>

                        <button type="submit" className="btn-primarys w-full">
                            Create Account
                        </button>

                    </form>
                    <button onClick={googleAuth} className="btn-primary w-full">Google</button>
                    

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?
                            <a href="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 ml-1">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default SignUp