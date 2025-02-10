import axios from "axios";

export const API = axios.create({
  baseURL: 'https://apistudio-fathqulbc.karyakreasi.id/api'
})

export const publicStorage = 'https://apistudio-fathqulbc.karyakreasi.id/storage/movies/'
