import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { CostCenters } from '~/types/types';

export const costCenterAPI = async () => {};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const getCostCenters = async (): Promise<AxiosResponse> => {
                const value = await axios.get(
                    'http://localhost:5148/api/costcenters',
                    {
                        headers: {
                            Authorization: req.headers.authorization,
                        },
                    }
                );
                return value;
            };

            const response = await getCostCenters();
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
                gerencyCode,
                areaCode,
                officeCode,
                code,
                name,
            }: Partial<CostCenters> = req.body;
            const data = { gerencyCode, areaCode, officeCode, code, name };
            const postCostCenter = async (
                data: Partial<CostCenters>
            ): Promise<AxiosResponse> => {
                const value = await axios.post(
                    'http://localhost:5148/api/costcenters',
                    data,
                    {
                        headers: {
                            Authorization: req.headers.authorization,
                        },
                    }
                );
                return value;
            };

            const response = await postCostCenter(data);
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
                costCenterId,
                gerencyCode,
		areaCode,
                officeCode,
                code,
		name
            }: Partial<CostCenters> = req.body;

            const data = {
                costCenterId,
                gerencyCode,
		areaCode,
                officeCode,
                code,
		name
            };

            const putCostCenter = async (
                data: Partial<CostCenters>
            ): Promise<AxiosResponse> => {
                const value = await axios.put(
                    `http://localhost:5148/api/costcenters/${costCenterId}`,
                    data,
                    {
                        headers: {
                            Authorization: req.headers.authorization,
                        },
                    }
                );
                return value;
            };

            const response = await putCostCenter(data);
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
