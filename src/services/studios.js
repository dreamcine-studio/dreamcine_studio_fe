import API from "../api";

// export const getDatas = async () => {
  // kita ganti menjadi getBooks
export const getStudios = async () => {
  // untuk get Data.
  // kita sudah definisikan di atas tadi axios nya
  // tinggal panggil pakai nama varaiable api

                      // object di laravel nanti ada books, genres
  //  return await api.get('/objects');

  // books kita tau nya dari backed yaitu : Laravel nya
  //  return await API.get('/books');

  // kita mau destructoring
  const {data} = await API.get('/studios')
   return data.data;
   
 } 



 
 export const deleteStudio= async(id) => {
  try{
    await API.delete(`/studios/${id}`)      // ini pakai backtick
  }catch (error){
    console.log(error)
    throw error
  }
}



//update
  
// update, kita butuh id dan data
export const updateStudio = async (id, data) =>{
    try { 
       const response = await API.post(`/studios/${id}`, data)  // endpoints
       return response.data.data;
    }catch (err){
       console.log(err)
       throw err
    }
   }