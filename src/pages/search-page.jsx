import React, { createContext, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Filters from '../components/Filters/Filters';
import { SearchProvider } from '../context/search-context.jsx';
import Cards from '../components/Cards/Cards';

const SearchPage = () => {
    const [data, setData] = useState([]);
    
    return (
        <div>
            <SearchProvider>
                <Header />
                <Filters />
                <Cards />
            </SearchProvider>
        </div>
    );
  }
  

export default SearchPage;
