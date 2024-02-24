import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

interface RegisterInterface {
    username: string;
    password: string;
    email: string;
}

export const registerUserAPI = async (credentials: RegisterInterface) => {};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const response = await axios.post(
                'https://cattlechain-backend.onrender.com/auth/signup',
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
