import React, { createContext, useContext, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Filters from '../components/Filters/Filters';
import { SearchProvider } from '../context/search-context.jsx';
import Cards from '../components/Cards/Cards';
import FetchMore from '../components/FetchMore/FetchMore';

const SearchPage = () => {
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
