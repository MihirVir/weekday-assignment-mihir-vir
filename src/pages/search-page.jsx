import React, { createContext, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Filters from '../components/Filters/Filters';
import { SearchProvider } from '../context/search-context.jsx';

const SearchPage = () => {
    const [data, setData] = useState([]);
    
    return (
        <div>
            <SearchProvider>
                <Header />
                <Filters />
            </SearchProvider>
        </div>
    );
  }
  

export default SearchPage;
