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