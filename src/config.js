import axios  from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://intothewoods.herokuapp.com/api/"
})