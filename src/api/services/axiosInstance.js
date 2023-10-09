import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://ws.audioscrobbler.com/2.0/'
});