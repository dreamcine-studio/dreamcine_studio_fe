import axios from "axios";

// const url = 'https://apistudio-fathqulbc.karyakreasi.id'
const url = 'http://127.0.0.1:8000'

export const API = axios.create({
  baseURL: `${url}/api`
})
 
export const publicStorage = `${url}/storage/movies/`