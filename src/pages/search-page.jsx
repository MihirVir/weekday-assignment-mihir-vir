import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Filters from '../components/Filters/Filters';
import useFetch from '../hooks/use-fetch';

const SearchPage = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await useFetch("https://api.weekday.technology/adhoc/getSampleJdJSON", { limit: 10, offset: 10 });
                setData(res);
                console.log(res); 
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [])
    return (
      <div>
        <Header />
        <Filters />
      </div>
    );
  }
  

export default SearchPage;
