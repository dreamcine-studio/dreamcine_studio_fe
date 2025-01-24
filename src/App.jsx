import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import AdminLayout from './layouts/admin'
import PublicLayout from './layouts/public'
import Home from './pages/public'
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
import Schedules from './pages/admin/schedules'
import ScheduleCreate from './pages/admin/schedules/create'
import ScheduleEdit from './pages/admin/schedules/edit'
import MovieEdit from './pages/admin/movies/edit'
import MovieCreate from './pages/admin/movies/create'
import Team from './components/Team'
import Contact from './components/Contact'
import Seats from './pages/admin/seats'
import Payments from './pages/admin/payments'
import PaymentEdit from './pages/admin/payments/edit'
import MovieDetail from './components/MovieDetail'
import BookingPublic from './pages/public/booking/booking.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="Movies" element={<Hero />} />
            <Route path="teams" element={<Team />} />
            <Route path="contacts" element={<Contact />} />

            <Route path="moviedetail" element={<MovieDetail />} />
            <Route path="moviebooking" element={<BookingPublic />} />
          </Route>

          {/* Auth Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="movies">
                <Route index element={<AdminMovies />} />
                <Route path="create" element={<MovieCreate />} />
                <Route path="edit/:id" element={<MovieEdit />} />
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

          <Route path="payments">
                <Route index element={<Payments />} />
                <Route path="edit/:id" element={<PaymentEdit />} />
          </Route>

          <Route path="studios">
                <Route index element={<Studios />} />
                <Route path="create" element={<StudioCreate />} />
                <Route path="edit/:id" element={<StudioEdit />} />
          </Route>

          <Route path="schedules">
                <Route index element={<Schedules />} />
                <Route path="create" element={<ScheduleCreate />} />
                <Route path="edit/:id" element={<ScheduleEdit />} />
          </Route> 

          <Route path="seats">
                <Route index element={<Seats />} />
                <Route path="create" element={<ScheduleCreate />} />
                <Route path="edit" element={<ScheduleEdit />} />
          </Route> 
          </Route>

          <Route path="*" element={<NotFound404/>} />
          {/* <Route path="*">
            <Route index element={<NotFound404 />} />
         </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  ) 
}

export default App
