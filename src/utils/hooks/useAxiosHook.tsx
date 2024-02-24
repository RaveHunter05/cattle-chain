'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

const useAxiosHook = () => {

    const userHTTP = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
	setToken(localStorage.getItem('auth-token'))
	console.log({token})
    }, [])

    useEffect(() => {
        const requestIntercept = userHTTP.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        // you could also have response interceptor here

        return () => {
            userHTTP.interceptors.request.eject(requestIntercept);
        };
    }, [token]);

    return userHTTP;
};

export default useAxiosHook;
