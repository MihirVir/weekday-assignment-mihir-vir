import React, { createContext, useState, useEffect } from 'react';
import useFetch from '../hooks/use-fetch';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await useFetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
                    "limit": 10,
                    "offset": 10
                });

                setData(res);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();

    }, []);

    return (
        <SearchContext.Provider value={data}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchContext, SearchProvider };
