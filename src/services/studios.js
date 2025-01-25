import API from "../api"

// export const getDatas = async () => {
  // kita ganti menjadi getBooks
export const getStudios = async () => {
  const {data} = await API.get('/studios')
   return data.data
   
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



   
 //Create
  
 export const createStudio = async(data) =>
  {
 
     try{
       const response  = await API.post(`/studios`, data)  // endpoint
       return response.data;
     }catch(error) {
       console.log(error);
       throw error
     }
  }  