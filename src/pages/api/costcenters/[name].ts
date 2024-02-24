import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const { name } = req.query;

            if (typeof name === 'string') {
                let response;

                const searchCostCenter = (
                    name: string
                ): Promise<AxiosResponse> => {
                    const value = axios.get(
                        `http://localhost:5148/api/costcenters/search/${name}`,
                        {
                            headers: {
                                Authorization: req.headers.authorization,
                            },
                        }
                    );
                    return value;
                };
                response = await searchCostCenter(name);
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
