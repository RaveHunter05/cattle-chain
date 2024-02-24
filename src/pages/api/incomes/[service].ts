import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const { service } = req.query;

            if (typeof service === 'string') {
                let response;

                const searchIncomes = (
                    service: string
                ): Promise<AxiosResponse> => {
                    const value = axios.get(
                        `http://localhost:5148/api/incomes/search/${service}`,
                        {
                            headers: {
                                Authorization: req.headers.authorization,
                            },
                        }
                    );
                    return value;
                };
                response = await searchIncomes(service);
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
