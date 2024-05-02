import React, { createContext, useState, useEffect, useMemo } from 'react';
import useFetch from '../hooks/use-fetch';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 10;
    const [filters, setFilters] = useState({
        jobRole: '',
        minExp: null,
        location: '',
        minJdSalary: null
    })
    

    const filteredData = useMemo(() => {
        return data.filter(item => {
            return (!filters.jobRole || item.jobRole.includes(filters.jobRole)) && 
                (!filters.minExp || item.minExp === filters.minExp) &&
                (
                    (!filters.location || filters.location !== "Remote" || filters.location === "") ?
                    filters.location === "In-office" ? item.location !== "remote" :  item.location !== null :
                    item.location === "remote" 
                  ) &&                  
                (!filters.minJdSalary || item.minJdSalary >= filters.minJdSalary);
        })
    }, [data, filters]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await useFetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: {"limit": limit,
                    "offset": offset}
                });
                setData(res);
            } catch (err) {
                console.error(err);
            }
        };
        if (
            filters.jobRole === '' ||
            filters.minExp === null ||
            filters.location === '' ||
            filters.minJdSalary === null
        ) {
            fetchData();
        }
        fetchData();
    }, []);

    const fetchMoreData = async () => {
        try {
            const res = await useFetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: {"limit": limit,
                    "offset": offset + limit}
            });
            setData(prevData => [...prevData, ...res]);
            setOffset(prevOffset => prevOffset + limit);
        } catch (err) {
            console.error(err);
        }
    };

    const updateData = (newData) => {
        setData(newData);
    }

    return (
        <SearchContext.Provider value={{ data: filteredData, fetchMoreData, updateData, setFilters }}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchContext, SearchProvider };
