import axios, {AxiosInstance} from 'axios'

const accessToken:string | null = localStorage.getItem('accessToken')

const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.BASE_URL as string,
    headers: {
        'Authorization':`Bearer ${accessToken}`,
        'Content-type': 'application/json'
    }
})

export default axiosInstance