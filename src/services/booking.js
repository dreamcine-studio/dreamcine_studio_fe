import API from "../api";

// export const getDatas = async () => {
  // kita ganti menjadi getBooks
export const getBooking = async () => {
  // untuk get Data.
  // kita sudah definisikan di atas tadi axios nya
  // tinggal panggil pakai nama varaiable api

                      // object di laravel nanti ada books, genres
  //  return await api.get('/objects');

  // books kita tau nya dari backed yaitu : Laravel nya
  //  return await API.get('/books');

  // kita mau destructoring
  const {data} = await API.get('/bookings')
   return data.data;
   
 } 



 
 export const deleteBooking = async(id) => {
  try{
    await API.delete(`/bookings/${id}`)      // ini pakai backtick
  }catch (error){
    console.log(error)
    throw error
  }
}


//update
  
// update, kita butuh id dan data
export const updateBooking = async (id, data) =>{
  try { 
     const response = await API.post(`/bookings/${id}`, data)  // endpoints
     return response.data.data;
  }catch (err){
     console.log(err)
     throw err
  }
 }


 //Create
  
 export const createBooking = async(data) =>
  {
 
     try{
       const response  = await API.post(`/bookings`, data)  // endpoint
       return response.data;
     }catch(error) {
       console.log(error);
       throw error
     }
  }  