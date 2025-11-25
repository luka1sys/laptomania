import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/auth.context.jsx'
import { BrowserRouter } from 'react-router'
import { LaptopProvider } from './context/laptop.context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <LaptopProvider>
        <App />
      </LaptopProvider>
    </AuthProvider>
  </BrowserRouter>
)
