import { useEffect, useState } from "react";
import { getGenres } from "../../services/genre";
import { getStudios } from "../../services/studios";
import { getPaymentmethods } from "../../services/paymentMethod";
import { getMovies } from "../../services/movies";

export default function Dashboard() {
  const [genres, setGenres] = useState([]);
  const [studios, setStudios] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentMovies, setmovies] = useState([]);


  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenres();
      setGenres(data);
    };

    const fetchStudios  = async () => {
      const data = await getStudios();
      setStudios(data);
    };
      
    const fetchPaymentMethods  = async () => {
      const data = await getPaymentmethods();
      setPaymentMethods(data);
    };

    const fetchmovies = async () => {
      const data = await getMovies();
      setmovies(data);
    };
      
        fetchGenres();  
        fetchStudios();  
        fetchPaymentMethods();  
        fetchmovies();
      }, []);
      // console.log("ada",genres);
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


			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full min-w-0">
				{/* <!-- Genres --> */}
     
				<div className="flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
					<div className="flex flex-col items-center space-y-2">
						<div className="text-6xl font-bold tracking-tight leading-none text-blue-500">{genres.length}</div>
						<div className="text-lg font-medium text-blue-500">Genres</div>
					</div>
				</div>

				{/* <!-- Studios --> */}
				<div className="flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
					<div className="flex flex-col items-center space-y-2">
						<div className="text-6xl font-bold tracking-tight leading-none text-amber-500">{studios.length}</div>
						<div className="text-lg font-medium text-amber-600">Studios</div>
					</div>
				</div>


				{/* <!-- Suspended --> */}
				<div className="flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
					<div className="flex flex-col items-center space-y-2">
						<div className="text-6xl font-bold tracking-tight leading-none text-red-500">{paymentMethods.length}</div>
						<div className="text-lg font-medium text-red-600">Payment Methods</div>
					</div>
				</div>

				{/* <!-- Closed --> */}
				<div className="flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
					<div className="flex flex-col items-center space-y-2">
						<div className="text-6xl font-bold tracking-tight leading-none text-primary-900">{paymentMovies.length}</div>
						<div className="text-lg font-medium text-primary-900">Movies</div>
					</div>
				</div>
  
			</div>
		</section>
	</div>
</main>
   
      </>
    )
  }