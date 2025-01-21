import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import AdminLayout from './layouts/admin'
import PublicLayout from './layouts/public'
import Home from './pages/public'
import ProductDetail from './components/ProductDetail'
import AdminLayout from './layouts/admin'
import Dashboard from './pages/admin'
import Register from './pages/auth/register'
import Login from './pages/auth/login'
import AdminMovies from './pages/admin/movies'
import GenreMovies from './pages/admin/genres'
import GenreCreate from './pages/admin/genres/create'
import GenreEdit from './pages/admin/genres/edit'
import PayMethods from './pages/admin/payment_methods'
import PaymentMethodCreate from './pages/admin/payment_methods/create'
import PaymentMethodEdit from './pages/admin/payment_methods/edit'
import Studios from './pages/admin/studios'
import StudioEdit from './pages/admin/studios/edit'
import StudioCreate from './pages/admin/studios/create'
import Hero from './components/Hero'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="Movies" element={<Hero />} />
          </Route>

          {/* Auth Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="movies">
                <Route index element={<AdminMovies />} />
                {/* <Route path="create" element={<BookCreate />} />
                <Route path="edit/:id" element={<BookEdit />} /> */}
              </Route>
          <Route path="genres">
                <Route index element={<GenreMovies />} />
                <Route path="create" element={<GenreCreate />} />
                <Route path="edit/:id" element={<GenreEdit />} />
              </Route>   
          <Route path="payment_methods">
                <Route index element={<PayMethods />} />
                <Route path="create" element={<PaymentMethodCreate />} />
                <Route path="edit/:id" element={<PaymentMethodEdit />} />
              </Route>      
          <Route path="studios">
                <Route index element={<Studios />} />
                <Route path="create" element={<StudioCreate />} />
                <Route path="edit/:id" element={<StudioEdit />} />
              </Route>   

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  ) 
}

export default App
