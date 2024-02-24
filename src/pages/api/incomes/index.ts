import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Incomes } from '~/types/types';

export const incomesAPI = async () => {};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const getIncomes = async (): Promise<AxiosResponse> => {
                const value = await axios.get(
                    'http://localhost:5148/api/incomes',
                    {
                        headers: {
                            Authorization: req.headers.authorization,
                        },
                    }
                );
                return value;
            };

            const response = await getIncomes();
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
    if (req.method === 'POST') {
        try {
            const {
                serviceId,
                costCenterId,
                projectedAmount,
                executedAmount,
            }: Partial<Incomes> = req.body;
            const data = {
                serviceId,
                costCenterId,
                projectedAmount,
                executedAmount,
            };
            const postIncome = async (
                data: Partial<Incomes>
            ): Promise<AxiosResponse> => {
                const value = await axios.post(
                    'http://localhost:5148/api/incomes',
                    data,
                    {
                        headers: {
                            Authorization: req.headers.authorization,
                        },
                    }
                );
                return value;
            };

            const response = await postIncome(data);
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
            const {
                incomeId,
                serviceId,
		costCenterId,
                projectedAmount,
                executedAmount,
            }: Partial<Incomes> = req.body;

            const data = {
                incomeId,
                serviceId,
		costCenterId,
                projectedAmount,
                executedAmount,
            };

            const putIncome = async (
                data: Partial<Incomes>
            ): Promise<AxiosResponse> => {
                const value = await axios.put(
                    `http://localhost:5148/api/incomes/${incomeId}`,
                    data,
                    {
                        headers: {
                            Authorization: req.headers.authorization,
                        },
                    }
                );
                return value;
            };

            const response = await putIncome(data);
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
