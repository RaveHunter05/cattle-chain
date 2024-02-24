import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

interface LoginInterface {
    username: string;
    password: string;
    email: string;
}

export const loginUserAPI = async (credentials: LoginInterface) => {};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const response = await axios.post(
                'https://cattlechain-backend.onrender.com/auth/signin',
                req.body,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

	    console.log({response})

            if (response.data) {
                res.send(response.data);
            }

	    
        } catch (error) {
            if (typeof error === 'string') {
                res.send(error.toUpperCase());
            } else if (error instanceof Error) {
                res.send(error.message);
            }
        }
    }
}
