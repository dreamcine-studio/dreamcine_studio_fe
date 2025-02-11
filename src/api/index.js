import axios from "axios";

export const API = axios.create({
  baseURL: 'https://api-studio.karyakreasi.id/api'
})

export const publicStorage = 'https://api-studio.karyakreasi.id/storage/movies/'