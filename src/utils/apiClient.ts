import axios, { AxiosInstance } from 'axios';

const baseURL = 'http://localhost:5148';

const apiClient: AxiosInstance = axios.create({
    baseURL,
    timeout: 6000
});

export default apiClient;
