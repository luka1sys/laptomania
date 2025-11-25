import { Route, Routes, Link } from "react-router"

import SignUp from "./pages/Signup"
import Login from "./pages/Login"
import Panel from "./pages/Panel"
import Protect from "../components/utils/Protect"
import Product from "./pages/Catalog"
import Nav from "./components/UI/Nav"

const Home = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-extrabold gradient-text mb-6 animate-fadeIn">
              Welcome to Laptomania
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover the perfect laptop for your needs. Premium quality, unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/laptops" className="btn-primary text-lg px-8 py-4">
                Browse Laptops
              </Link>
              <Link to="/signup" className="btn-secondary text-lg px-8 py-4">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center gradient-text mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-modern p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💎</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Premium Quality</h3>
              <p className="text-gray-600">Only the best laptops from top brands, carefully selected for you.</p>
            </div>
            <div className="card-modern p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping to get your laptop to you fast.</p>
            </div>
            <div className="card-modern p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Secure Shopping</h3>
              <p className="text-gray-600">Your data is safe with our secure payment and checkout process.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold gradient-text mb-4">Ready to Find Your Perfect Laptop?</h2>
            <p className="text-gray-600 text-lg mb-8">Join thousands of satisfied customers today!</p>
            <Link to="/laptops" className="btn-primary text-lg px-10 py-4 inline-block">
              Start Shopping Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function App() {


  return (
    <>

      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="panel" element={<Protect><Panel /></Protect>} />
        <Route path="laptops" element={<Product />} />

      </Routes>

    </>
  )
}

export default App
