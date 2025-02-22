import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/public";
import Home from "./pages/public";
import AdminLayout from "./layouts/admin";
import Dashboard from "./pages/admin";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import AdminMovies from "./pages/admin/movies";
import GenreCreate from "./pages/admin/genres/create";
import GenreEdit from "./pages/admin/genres/edit";
import PaymentMethodCreate from "./pages/admin/payment_methods/create";
import PaymentMethodEdit from "./pages/admin/payment_methods/edit";
import StudioEdit from "./pages/admin/studios/edit";
import StudioCreate from "./pages/admin/studios/create";
import ScheduleCreate from "./pages/admin/schedules/create";
import ScheduleEdit from "./pages/admin/schedules/edit";
import MovieEdit from "./pages/admin/movies/edit";
import MovieCreate from "./pages/admin/movies/create";
import Team from "./components/Team";
import Contact from "./components/Contact";
import AdminGenres from "./pages/admin/genres";
import AdminPaymentMethods from "./pages/admin/payment_methods";
import AdminPayments from "./pages/admin/payments";
import AdminStudios from "./pages/admin/studios";
import AdminSchedules from "./pages/admin/schedules";
import AdminSeats from "./pages/admin/seats";
import AdminBookings from "./pages/admin/bookings/index.jsx";
import MovieSeat from "./pages/public/movieseat/index.jsx";
import AdminUsers from "./pages/admin/users/index.jsx";
import Payment from "./pages/public/payment/pay.jsx";
import BookingPage from "./pages/public/payment/index.jsx";
import PublicMovies from "./pages/public/movies/index.jsx";
import MovieDetail from "./pages/public/moviedetail/index.jsx";
import AdminShowtimes from "./pages/admin/showtimes/index.jsx";
import ShowtimeEdit from "./pages/admin/showtimes/edit.jsx";
import ShowtimeCreate from "./pages/admin/showtimes/create.jsx";
import AdminScheduleShowtime from "./pages/admin/schedule_showtimes/index.jsx";
import ScheduleShowtimeCreate from "./pages/admin/schedule_showtimes/create.jsx";
import ScheduleShowtimeEdit from "./pages/admin/schedule_showtimes/edit.jsx";
import Ticket from "./pages/public/Ticket/index.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<PublicMovies />} />
            <Route path="movies/:id" element={<MovieDetail />} />

            {/* booking */}
            <Route path="moviebooking" element={<MovieSeat />} />

            {/* payment */}
            <Route path="booking" element={<BookingPage />} />
            <Route path="booking/pay/:id" element={<Payment />} />

            
            <Route path="teams" element={<Team />} />
            <Route path="contacts" element={<Contact />} />
            {/* <Route path="tickets" element={<Ticket />} /> */}
            <Route path="tickets/:id" element={<Ticket />} />

          </Route>

          {/* Auth Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Admin Routes */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />

            <Route path="movies">
              <Route index element={<AdminMovies />} />
              <Route path="create" element={<MovieCreate />} />
              <Route path="edit/:id" element={<MovieEdit />} />
            </Route>

            <Route path="genres">
              <Route index element={<AdminGenres />} />
              <Route path="create" element={<GenreCreate />} />
              <Route path="edit/:id" element={<GenreEdit />} />
            </Route>

            <Route path="payment_methods">
              <Route index element={<AdminPaymentMethods />} />
              <Route path="create" element={<PaymentMethodCreate />} />
              <Route path="edit/:id" element={<PaymentMethodEdit />} />
            </Route>

            <Route path="showtimes">
              <Route index element={<AdminShowtimes />} />
              <Route path="create" element={<ShowtimeCreate />} />
              <Route path="edit/:id" element={<ShowtimeEdit />} />
            </Route>

            <Route path="payments">
              <Route index element={<AdminPayments />} />
            </Route>

            <Route path="studios">
              <Route index element={<AdminStudios />} />
              <Route path="create" element={<StudioCreate />} />
              <Route path="edit/:id" element={<StudioEdit />} />
            </Route>

            <Route path="schedules">
              <Route index element={<AdminSchedules />} />
              <Route path="create" element={<ScheduleCreate />} />
              <Route path="edit/:id" element={<ScheduleEdit />} />
            </Route>

            <Route path="schedule_showtimes">
              <Route index element={<AdminScheduleShowtime />} />
              <Route path="create" element={<ScheduleShowtimeCreate />} />
              <Route path="edit/:id" element={<ScheduleShowtimeEdit />} />
            </Route>

            <Route path="seats">
              <Route index element={<AdminSeats />} />
            </Route>

            <Route path="bookings">
              <Route index element={<AdminBookings />} />
            </Route>

            <Route path="users">
              <Route index element={<AdminUsers />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
