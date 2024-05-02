import React, { createContext, useState, useEffect } from 'react';
import useFetch from '../hooks/use-fetch';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await useFetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
                    "limit": limit,
                    "offset": offset
                });
                setData(res);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    const fetchMoreData = async () => {
        try {
            const res = await useFetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
                "limit": limit,
                "offset": offset + limit
            });
            setData(prevData => [...prevData, ...res]);
            setOffset(prevOffset => prevOffset + limit);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <SearchContext.Provider value={{ data, fetchMoreData }}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchContext, SearchProvider };
