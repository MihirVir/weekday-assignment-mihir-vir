import React, { createContext, useState, useEffect, useMemo } from 'react';
import useFetch from '../hooks/use-fetch';
import { company_name } from '../data/company-data'; 

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 10;
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        jobRole: '',
        minExp: null,
        location: '',
        minJdSalary: null,
        companyName: ''
    });

    const filteredData = useMemo(() => {
        return data.filter(item => {
            const companyNameRegex = new RegExp(filters.companyName, 'i')
            return (!filters.jobRole || item.jobRole.includes(filters.jobRole)) && 
                (!filters.minExp || item.minExp === filters.minExp) &&
                (
                    (!filters.location || filters.location !== "Remote" || filters.location === "") ?
                    filters.location === "In-office" ? item.location !== "remote" :  item.location !== null :
                    item.location === "remote" 
                  ) &&                  
                (!filters.minJdSalary || item.minJdSalary >= filters.minJdSalary) && 
                (!filters.companyName || companyNameRegex.test(item.company.name)) &&
                Object.values(item).every(value => value !== null);
        });
    }, [data, filters]);

    useEffect(() => {
        fetchInitialData(); 
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const res = await useFetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"limit": limit, "offset": 0})
            });
            const dataWithCompanyInfo = res.map(item => ({
                ...item,
                company: getRandomCompany(),
            }));
            setData(dataWithCompanyInfo);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchMoreData = async () => {
        setLoading(true);
        try {
            const res = await useFetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"limit": limit, "offset": data.length})
            });
            const newDataWithCompanyInfo = res.map(item => ({
                ...item,
                company: getRandomCompany()
            }));
            setData(prevData => [...prevData, ...newDataWithCompanyInfo]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getRandomCompany = () => {
        const randomIndex = Math.floor(Math.random() * company_name.length);
        return company_name[randomIndex];
    };

    return (
        <SearchContext.Provider value={{ data: filteredData, fetchMoreData, setFilters, loading }}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchContext, SearchProvider };
