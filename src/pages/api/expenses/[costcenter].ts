import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const { costcenter } = req.query;

            if (typeof costcenter === 'string') {
                let response;

                const searchExpenses = (
                    costcenter: string
                ): Promise<AxiosResponse> => {
                    const value = axios.get(
                        `http://localhost:5148/api/expenses/search/${costcenter}`,
                        {
                            headers: {
                                Authorization: req.headers.authorization,
                            },
                        }
                    );
                    return value;
                };
                response = await searchExpenses(costcenter);
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
