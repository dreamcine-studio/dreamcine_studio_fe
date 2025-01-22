import API from "../api";

// export const getDatas = async () => {
  // kita ganti menjadi getBooks
export const getSeats = async () => {
  // untuk get Data.
  // kita sudah definisikan di atas tadi axios nya
  // tinggal panggil pakai nama varaiable api

                      // object di laravel nanti ada books, genres
  //  return await api.get('/objects');

  // books kita tau nya dari backed yaitu : Laravel nya
  //  return await API.get('/books');

  // kita mau destructoring
  const {data} = await API.get('/seats')
   return data.data;
   
 } 



 
 export const deleteSeat= async(id) => {
  try{
    await API.delete(`/seats/${id}`)      // ini pakai backtick
  }catch (error){
    console.log(error)
    throw error
  }
}