import { useAuth } from "../context/auth.context.jsx"
import { UseForm } from "../hooks/useForm.js"


const Login = ()=>{
    const {login} = useAuth();
    const [formData, handlechange] = UseForm({
        email: '',
        password: ''
    })
    const handleSubmit = (e) =>{
        e.preventDefault();
        login(formData);



    }
    return (
        <main className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold gradient-text mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to your account to continue</p>
                </div>
                
                <div className="glass-effect rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                        
                        <button type="submit" className="btn-primary w-full">
                            Sign In
                        </button>
                    </form>
                    
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account? 
                            <a href="/signup" className="text-indigo-600 font-semibold hover:text-indigo-700 ml-1">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Login