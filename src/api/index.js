import axios from "axios";

export const API = axios.create({
  baseURL: 'https://apistudio-azharbc.karyakreasi.id/api'
})

export const publicStorage = 'https://apistudio-azharbc.karyakreasi.id/storage/movies/'
