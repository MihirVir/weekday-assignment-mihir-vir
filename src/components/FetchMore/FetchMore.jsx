import React, { useContext } from 'react';
import { SearchContext } from '../../context/search-context';
import { MdOutlineRefresh } from "react-icons/md";

const FetchMore = () => {
    const { fetchMoreData } = useContext(SearchContext);

    const handleFetchMore = () => {
        fetchMoreData();
    };

    return (
        <div className="button-fetcher-container">
            <button onClick={handleFetchMore}><MdOutlineRefresh /> Fetch More</button>
        </div>
    );
};

export default FetchMore;
