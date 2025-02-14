import axios from "axios";

// const url = 'https://api-studio.karyakreasi.id/'
const url = 'https://apistudio-fathqulbc.karyakreasi.id/'

export const API = axios.create({
  baseURL: `${url}/api`
})

export const publicStorage = `${url}/storage/movies/`