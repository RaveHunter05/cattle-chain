import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Expenses } from '~/types/types';

export const expensesAPI = async () => {};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const response = await axios.get(
                'http://localhost:5148/api/expenses',
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
            const {
                costCenterId,
                spentId,
                projectedAmount,
                executedAmount,
            }: Partial<Expenses> = req.body;
            const data = {
                costCenterId,
                spentId,
                projectedAmount,
                executedAmount,
            };
            const postExpense = async (
                data: Partial<Expenses>
            ): Promise<AxiosResponse> => {
                const value = await axios.post(
                    'http://localhost:5148/api/expenses',
                    data,
                    {
                        headers: {
                            Authorization: req.headers.authorization,
                        },
                    }
                );
                return value;
            };

            const response = await postExpense(data);
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
                expenseId,
                costCenterId,
                spentId,
                projectedAmount,
                executedAmount,
            }: Partial<Expenses> = req.body;
            const data = {
                expenseId,
                costCenterId,
                spentId,
                projectedAmount,
                executedAmount,
            };
            const putExpense = async (
                data: Partial<Expenses>
            ): Promise<AxiosResponse> => {
                const value = await axios.put(
                    `http://localhost:5148/api/expenses/${expenseId}`,
                    data,
                    {
                        headers: {
                            Authorization: req.headers.authorization,
                        },
                    }
                );
                return value;
            };

            const response = await putExpense(data);
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
