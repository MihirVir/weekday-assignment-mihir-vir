import React, { createContext, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Filters from '../components/Filters/Filters';
import { SearchProvider } from '../context/search-context.jsx';
import { MdOutlineRefresh } from "react-icons/md";
import Cards from '../components/Cards/Cards';
import FetchMore from '../components/FetchMore/FetchMore';

const SearchPage = () => {
    const [data, setData] = useState([]);
    
    return (
        <div>
            <SearchProvider>
                <Header />
                <Filters />
                <Cards />
                <FetchMore />
            </SearchProvider>
        </div>
    );
  }
  

export default SearchPage;
