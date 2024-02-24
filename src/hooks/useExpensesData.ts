import { useState, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { Expenses } from '~/types/types';

const useExpensesData = () => {
    const [expensesData, setExpensesData] = useState<Expenses[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // string to search for
    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    const [toggleRefresh, setToggleRefresh] = useState<boolean>(false);

    const getExpensesData = async (): Promise<Expenses[]> => {
        try {
            const token = localStorage.getItem('auth-token');
            const response = await axios.get<Expenses[]>('/api/expenses', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.log({ error });
            return []; // or handle error accordingly
        }
    };

    const getSearchData = async (costcenter: string): Promise<Expenses[]> => {
        try {
            const token = localStorage.getItem('auth-token');
            const response = await axios.get<Expenses[]>(
                `/api/expenses/${costcenter}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.log({ error });
            return [];
        }
    };

    const handleSearch = (costcenter: string) => {
        setSearchTerm(costcenter);
    };

    useEffect(() => {
        const fetchSearch = debounce(
            async (termToSearch: string): Promise<void> => {
                setLoading(true);
                const data = await getSearchData(termToSearch);
                setExpensesData(data);
                setLoading(false);
                return;
            },
            400
        );
        const fetchExpensesData = async (): Promise<void> => {
            setLoading(true);
            const data = await getExpensesData();
            if (data) {
                setExpensesData(data);
            }
            setLoading(false);
        };

        if (!searchTerm || searchTerm === '') {
            fetchExpensesData();
            return;
        }
        fetchSearch(searchTerm);
    }, [searchTerm]);

    const refreshData = () => {
        setToggleRefresh(!toggleRefresh);
    };

    useEffect(() => {
        const fetchIncomeData = async (): Promise<void> => {
            setLoading(true);
            const data = await getExpensesData();
            if (data) {
                setExpensesData(data);
            }
            setLoading(false);
        };

        fetchIncomeData();
    }, [toggleRefresh]);

    return { expensesData, loading, handleSearch, refreshData };
};

export default useExpensesData;
