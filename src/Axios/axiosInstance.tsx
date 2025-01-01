import axios, {AxiosInstance} from 'axios'

const accessToken:string | null = localStorage.getItem('accessToken')

const baseURL = 'https://chatappbackend.ameyashriwas.com'

const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseURL as string,
    headers: {
        'Authorization':`Bearer ${accessToken}`,
        'Content-type': 'application/json'
    }
})

export default axiosInstance