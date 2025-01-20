import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import AdminLayout from './layouts/admin'
import PublicLayout from './layouts/public'
import Home from './pages/public'
import ProductDetail from './components/ProductDetail'
import AdminLayout from './layouts/admin'
import Dashboard from './pages/admin'
import Register from './pages/auth/register'
import Login from './pages/auth/login'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="Movies" element={<ProductDetail />} />
          </Route>

          {/* Auth Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  ) 
}

export default App
