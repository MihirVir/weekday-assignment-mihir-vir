import React, { createContext, useState, useEffect, useMemo } from 'react';
import useFetch from '../hooks/use-fetch';
import { company_name } from '../data/company-data'; 

/**
 * 
 * Context for managing search state, data fetching and filters.
 * 
 * @type {React.Context} 
 */
const SearchContext = createContext();

/**
 * 
 * @param {object} props - Data passed to the component
 * @param {React.ReactNode} props.children - Child Elements wrapped by provider
 * @returns {JSX.Element} 
 */
const SearchProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const limit = 10;
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        jobRole: '',
        minExp: null,
        location: '',
        minJdSalary: null,
        companyName: ''
    });
    const [offset, setOffset] = useState(0);
    /**
     * Memoized filtered data based on current filters.
     * Triggers when data or filters changes 
     * 
     * @type {Array<object>} An array of filtered data objects.
     */
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

    /**
     * Fetches initial data on when component is mounted
     */
    useEffect(() => {
        fetchInitialData(); 
    }, []);
    /**
     * Fetches initial data from the API.
     */
    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const res = await useFetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: {"limit": limit, "offset": 0}
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
    /**
     * It's kind of pagination.
     */
    const fetchMoreData = async () => {
        setLoading(true);
        const nextOffset = offset + limit; 
        try {
            const res = await useFetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: {"limit": limit, "offset": nextOffset}
            });
    
            
            if (res && res.length > 0) {
                const newDataWithCompanyInfo = res.map(item => ({
                    ...item,
                    company: getRandomCompany() 
                }));
    
                setData(prevData => [...prevData, ...newDataWithCompanyInfo]); 
                setOffset(nextOffset);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    

    /**
     * Retrieves a random company from the company_name array.
     * @returns {object} A random company object.
     */
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
