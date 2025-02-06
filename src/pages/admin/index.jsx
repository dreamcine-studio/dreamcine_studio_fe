import { useEffect, useState } from "react";
import { getGenres } from "../../services/genre";
import { getStudios } from "../../services/studios";
import { getPaymentmethods } from "../../services/paymentMethod";
import { getMovies } from "../../services/movies";
import { getSchedules } from "../../services/schedules";
import { getSeats } from "../../services/seat";
import { getBooking } from "../../services/booking";
import { getPayments } from "../../services/payment";

export default function Dashboard() {
  const [genres, setGenres] = useState([]);
  const [studios, setStudios] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [Movies, setmovies] = useState([]);
  const [Schedules, setSchedules] = useState([]);
  const [Seats, setSeats] = useState([]);
  const [Bookings, setBookings] = useState([]);
  const [Payments, setPayments] = useState([]);
  const [Loading, setLoading] = useState([]);
  const [error, setError] = useState([]);


  useEffect(() => {
  
const fetchData = async () => {
	setLoading(true);
	setError(null);

	try {
		const [
			genresData,
			studiosData,
			paymentMethodsData,
			moviesData,
			schedulesData,
			seatsData,
			bookingsData,
			paymentsData
		] = await Promise.all( [
			getGenres(),
			getStudios(),
			getPaymentmethods(),
			getMovies(),
			getSchedules(),
			getSeats(),
			getBooking(),
			getPayments()

		]);



	setGenres(genresData);
	setStudios(studiosData);
	setPaymentMethods(paymentMethodsData);
	setmovies(moviesData);
	setSchedules(schedulesData);
	setSeats(seatsData);
	setBookings(bookingsData);
	setPayments(paymentsData);
	}catch (error){
		setError("Failed to fetch data, please try again later : ")
		console.log(error);

	} finally {
		setLoading(false)
	}
}

	fetchData();
	
}, []);



if (Loading) {
    return (
      <main className="py-6 px-12 space-y-2 bg-gray-300 min-h-screen w-full flex items-center justify-center">
        {/* Loading Spinner */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 border-4 border-solid border-transparent rounded-full
            animate-spin
            border-t-purple-500 border-r-pink-500 border-b-purple-500 border-l-pink-500">
          </div>
          {/* Teks dengan Efek Bounce */}
          <div className="text-2xl font-bold text-gray-800 animate-bounce">
            Please Wait ..
          </div>
        </div>
      </main>
    );
  }



  
if (error){
	return (
		<main className="py-l px-12 space-y-2 bg-gray-100 min-h-screen w-full flex items-center justify-center">
			<div className="text-2xl font-bold text-gray-500"> {error} .. </div>
		</main>
	)
}


    return (
      <>
   
   <main className="py-1 px-12 space-y-2 bg-gray-100 min-h-screen w-full">
	<section className="grid grid-cols-4 bg-white divide-x w-full rounded-lg">
	
		 
	</section>

	{/* <!-- CONTENT GOES HERE --> */}
	<div className="flex flex-col h-full w-full mx-auto  space-y-6">
		<section className="flex flex-col mx-auto bg-white rounded-lg p-6 shadow-md space-y-6 w-full">
			<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
				<form className="flex flex-col relative md:col-span-3">
	
				</form>
				<div className="col-span-1 flex items-center">

				</div>
			</div>



  {/* <i className="fa-solid fa-film fa-lg"></i> */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full min-w-0">
				{/* <!-- Genres --> */}
     
				<div className="fa-solid fa-masks-theater fa-lg   flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
					<div className="flex flex-col items-center space-y-2">
						<div className="text-6xl font-bold tracking-tight leading-none text-blue-500">{genres.length}</div>
						<div className="text-lg font-medium text-blue-500">Genres</div>
					</div>
				</div>

				{/* <!-- Studios --> */}
				<div className="fa-solid fa-person-booth fa-lg flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
					<div className="flex flex-col items-center space-y-2">
						<div className="text-6xl font-bold tracking-tight leading-none text-amber-500">{studios.length}</div>
						<div className="text-lg font-medium text-amber-600">Studios</div>
					</div>
				</div>


				{/* <!-- Payment Methods --> */}
				<div className="fa-solid fa-credit-card fa-lg  flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
					<div className="flex flex-col items-center space-y-2">
						<div className="text-6xl font-bold tracking-tight leading-none text-red-500">{paymentMethods.length}</div>
						<div className="text-lg font-medium text-red-600">Payment Methods</div>
					</div>
				</div>

				{/* <!-- Movies --> */}
				<div className="fa-solid fa-film fa-lg flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
					<div className="flex flex-col items-center space-y-2">
						<div className="text-6xl font-bold tracking-tight leading-none text-primary-900">{Movies.length}</div>
						<div className="text-lg font-medium text-primary-900">Movies</div>
					</div>
				</div>


					{/* <!-- Movies --> */}
						<div className="fa-solid fa-chair fa-lg fa-solid fa-film fa-lg flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
					<div className="flex flex-col items-center space-y-2">

						<div className="text-6xl font-bold tracking-tight leading-none text-primary-900">{Seats.length}</div>
						<div className="text-lg font-medium text-primary-900">Seats</div>
					</div>
				</div>

					{/* <!-- Schedules --> */}
					<div className="fa-solid fa-calendar-days fa-xl flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
						<div className="flex flex-col items-center space-y-2">
						<div className="text-7xl font-extrabold tracking-tight leading-none text-primary-900">{Schedules.length}
					</div>
					<div className="text-lg font-medium text-primary-900">Schedules</div>
					</div>
			   </div>


			   
					{/* <!-- Bookings --> */}
					<div className="fa-solid fa-cart-shopping fa-lg  flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
						<div className="flex flex-col items-center space-y-2">
						<div className="text-7xl font-extrabold tracking-tight leading-none text-primary-900">{Bookings.length}
					</div>
					<div className="text-lg font-medium text-primary-900">Bookings</div>
					</div>
			   </div>

			   		{/* <!-- Payments --> */}
					<div className="fa-solid fa-money-bill fa-lg  flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
						<div className="flex flex-col items-center space-y-2">
						<div className="text-7xl font-extrabold tracking-tight leading-none text-primary-900">{Payments.length}
					</div>
					<div className="text-lg font-medium text-primary-900">Payments</div>
					</div>
			   </div>

			</div>
		</section>
	</div>
</main>
   
      </>
    )
  }