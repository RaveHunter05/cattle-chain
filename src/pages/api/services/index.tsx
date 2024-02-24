import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Services } from '~/types/types';

export const serviceAPI = async () => {};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const response = await axios.get(
                'http://localhost:5148/api/services',
                {
                    headers: {
                        Authorization: req.headers.authorization,
                    },
                }
            );
            res.send(response.data);
        } catch (error) {
            if (typeof error === 'string') {
                res.send(error.toUpperCase());
            } else if (error instanceof Error) {
                res.send(error.message);
            }
        }
    }

    if (req.method === 'POST') {
        try {
            const { code, name }: Partial<Services> = req.body;
            const data = {
                code,
                name,
            };
            const postService = async (
                data: Partial<Services>
            ): Promise<AxiosResponse> => {
                const value = await axios.post(
                    'http://localhost:5148/api/services',
                    data,
                    {
                        headers: {
                            Authorization: req.headers.authorization,
                        },
                    }
                );
                return value;
            };

            const response = await postService(data);
            res.send(response.data);
            return;
        } catch (error) {
            if (typeof error === 'string') {
                res.send(error.toUpperCase());
            } else if (error instanceof Error) {
                res.send(error.message);
            }
        }
    }

    if (req.method === 'PUT') {
        try {
            const { serviceId, code, name }: Partial<Services> = req.body;
            const data = {
                serviceId,
                code,
                name,
            };
            const putService = async (
                data: Partial<Services>
            ): Promise<AxiosResponse> => {
                const value = await axios.put(
                    `http://localhost:5148/api/services/${serviceId}`,
                    data,
                    {
                        headers: {
                            Authorization: req.headers.authorization,
                        },
                    }
                );
                return value;
            };

            const response = await putService(data);
            res.send(response.data);
            return;
        } catch (error) {
            if (typeof error === 'string') {
                res.send(error.toUpperCase());
            } else if (error instanceof Error) {
                res.send(error.message);
            }
        }
    }
}
