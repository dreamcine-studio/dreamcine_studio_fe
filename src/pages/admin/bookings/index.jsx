import { useEffect, useState } from "react";
import { deleteBooking, getBooking } from "../../../services/booking";
import { getScheduleShowtimes } from "../../../services/scheduleshowtime";
import { getUsers } from "../../../services/user";
import { getSchedules } from "../../../services/schedules";
import { getShowtimes } from "../../../services/showtime";
import { getPayments } from "../../../services/payment";  

export default function AdminBookings() {
    const [bookings, setBooking] = useState([]);
    const [scheduleShowtimes, setScheduleShowtimes] = useState([]);
    const [users, setUsers] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [payments, setPayments] = useState([]);  
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [bookingsData, scheduleShowtimesData, userData, schedulesData, showtimesData, paymentData] = await Promise.all([
                    getBooking(),
                    getScheduleShowtimes(),
                    getUsers(),
                    getSchedules(),
                    getShowtimes(),
                    getPayments()  
                ]);
                setBooking(bookingsData);
                setScheduleShowtimes(scheduleShowtimesData);
                setUsers(userData);
                setSchedules(schedulesData);
                setShowtimes(showtimesData);
                setPayments(paymentData); 
            } catch (error) {
                setError("Failed to fetch data, please try again later.");
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
      console.log(showtimes); 
  }, [showtimes]);
  

  const getDetails = (scheduleShowtimeId) => {
    const scheduleShowtime = scheduleShowtimes.find(ss => ss.id === scheduleShowtimeId);
    if (!scheduleShowtime) {
        console.log("Schedule Showtime not found for ID:", scheduleShowtimeId);
        return { schedule: null, showtime: null };
    }

    const schedule = schedules.find(s => s.id === scheduleShowtime.schedule_id);
    const showtime = showtimes.find(st => st.id === scheduleShowtime.showtime_id);

    console.log("Schedule Showtime: ", scheduleShowtime); 
    console.log("Schedule: ", schedule);
    console.log("Showtime: ", showtime);

    return { schedule, showtime };
};


    const getUserInfoName = (userId) => {
        const user = users.find((u) => u.id === userId);
        return user ? user.name : "Unknown User";
    };

    const getPaymentStatus = (bookingId) => {
        const payment = payments.find(p => p.booking_id === bookingId); 
        return payment ? payment.status : "Pending";  
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };
  
    const formatTimestamp = (timestamp) => {
        const formattedDate = new Intl.DateTimeFormat("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date(timestamp));
  
        const parts = formattedDate.split(" ");
        parts[0] = parts[0] + ",";
        return parts.join(" ");
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Apakah Anda yakin ingin Menghapus Data ini ?"
        );
        if (confirmDelete) {
            await deleteBooking(id);  
            setBooking(bookings.filter((booking) => booking.id !== id));
        }
    };

    if (loading) {
        return (
            <main className="py-6 px-12 space-y-2 bg-gray-300 min-h-screen w-full flex items-center justify-center">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 border-4 border-solid border-transparent rounded-full animate-spin border-t-purple-500 border-r-pink-500 border-b-purple-500 border-l-pink-500"></div>
                    <div className="text-2xl font-bold text-gray-800 animate-bounce">
                        Please Wait ..
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="py-6 px-12 space-y-2 bg-gray-100 min-h-screen w-full flex items-center justify-center">
                <div className="text-2xl font-bold text-gray-500"> {error} .. </div>
            </main>
        );
    }

    return (
        <div className="rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1 min-h-screen">
            <div className="flex items-center gap-6 justify-center">
                <h1 className="text-2xl text-center font-bold dark:text-white">
                    Bookings
                </h1>
            </div>

            <div className="max-w-full overflow-x-auto mt-4">
                <table className="w-full table-auto">
                    <thead className="border-b bg-gray-50 dark:bg-gray-900 text-white">
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">User</th>
                            <th className="px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">Movie</th>
                            <th className="px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">Quantity</th>
                            <th className="px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">Total Price</th>
                            <th className="px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">Showtime</th>
                            <th className="px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">Booking Date</th>
                            <th className="px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">Payment Status</th>
                            <th className="px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 ? (
                            bookings.map((booking) => {
                                const seat = booking.seat;
                                const details = getDetails(booking.schedule_showtime_id);
                                const showtime = details.showtime;
                                const movieTitle = details.schedule ? details.schedule.movie?.title : "Unknown Movie";
                                const userName = getUserInfoName(booking.user_id);
                                const paymentStatus = getPaymentStatus(booking.id);  
                                return (
                                    <tr key={booking.id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <td className="px-4 py-5 dark:text-white uppercase">{userName}</td>
                                        <td className="px-4 py-5 dark:text-white uppercase">{movieTitle}</td>
                                        <td className="px-4 py-5 dark:text-white uppercase">{booking.quantity}</td>
                                        <td className="px-4 py-5 dark:text-white uppercase">{formatRupiah(booking.amount)}</td>
                                        <td className="px-4 py-5 dark:text-white uppercase">{showtime?.id || 'Unknown Showtime'}</td>
                                        <td className="px-4 py-5 dark:text-white uppercase">{formatTimestamp(booking.created_at)}</td>
                                        <td className="px-4 py-5 dark:text-white uppercase">{paymentStatus}</td>  
                                        <td className="px-4 py-5 dark:text-white uppercase">
                                            <button onClick={() => handleDelete(booking.id)}>
                                                <i className="fa-solid fa-trash text-red-700 dark:text-red-500"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr><td colSpan="9" className="px-4 py-5 text-center">Tidak ada data Booking</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
