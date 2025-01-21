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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  ) 
}

export default App
