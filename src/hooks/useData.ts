import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { debounce } from 'lodash';

const useData = (url: string) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // string to search for
    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    const [toggleRefresh, setToggleRefresh] = useState<boolean>(false);

    const fetchData = async (
        endpoint: string,
        params?: any
    ): Promise<any[]> => {
        try {
            const token = localStorage.getItem('auth-token');
            const response = await axios.get(`/api/${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: params || {},
            });
            return response.data;
        } catch (error) {
            console.log({ error });
            return []; // or handle error accordingly
        }
    };

    // get Data from get endpoint
    const getData = async (): Promise<any[]> => {
        return fetchData(url);
    };

    // function for searching data in a get erquest
    const getSearchData = async (term: string): Promise<any[]> => {
        return fetchData(`${url}/${term}`);
    };

    // change the search term, wich triggers the getSearchData
    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    useEffect(() => {
        const fetchSearch = debounce(
            async (termToSearch: string): Promise<void> => {
                setLoading(true);
                const data = await getSearchData(termToSearch);
                setData(data);
                setLoading(false);
                return;
            },
            400
        );
        const fetchData = async (): Promise<void> => {
            setLoading(true);
            const data = await getData();
            if (data) {
                setData(data);
            }
            setLoading(false);
        };

        if (!searchTerm || searchTerm === '') {
            fetchData();
            return;
        }
        fetchSearch(searchTerm);
    }, [searchTerm]);

    const refreshData = () => {
        setToggleRefresh(!toggleRefresh);
    };

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            setLoading(true);
            const data = await getData();
            if (data) {
                setData(data);
            }
            setLoading(false);
        };

        fetchData();
    }, [toggleRefresh]);

    return { data, loading, handleSearch, refreshData };
};

export default useData;
