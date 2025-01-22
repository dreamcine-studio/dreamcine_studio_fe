import API from "../api";

// export const getDatas = async () => {
  // kita ganti menjadi getBooks
export const getGenres = async () => {
  // untuk get Data.
  // kita sudah definisikan di atas tadi axios nya
  // tinggal panggil pakai nama varaiable api

                      // object di laravel nanti ada books, genres
  //  return await api.get('/objects');

  // books kita tau nya dari backed yaitu : Laravel nya
  //  return await API.get('/books');

  // kita mau destructoring
  const {data} = await API.get('/genres')
   return data.data;
   
 } 



 
 export const deleteGenre = async(id) => {
  try{
    await API.delete(`/genres/${id}`)      // ini pakai backtick
  }catch (error){
    console.log(error)
    throw error
  }
}


//update
  
// update, kita butuh id dan data
export const updateGenre = async (id, data) =>{
  try { 
     const response = await API.post(`/genres/${id}`, data)  // endpoints
     return response.data.data;
  }catch (err){
     console.log(err)
     throw err
  }
 }


 //Create
  
 export const createGenre = async(data) =>
  {
 
     try{
       const response  = await API.post(`/genres`, data)  // endpoint
       return response.data;
     }catch(error) {
       console.log(error);
       throw error
     }
  }  