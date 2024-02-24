import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const { denomination } = req.query;

            if (typeof denomination === 'string') {
                let response;

                const searchSpents = (
                    denomination: string
                ): Promise<AxiosResponse> => {
                    const value = axios.get(
                        `http://localhost:5148/api/spents/search/${denomination}`,
                        {
                            headers: {
                                Authorization: req.headers.authorization,
                            },
                        }
                    );
                    return value;
                };
                response = await searchSpents(denomination);
                res.send(response.data);
                return;
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
