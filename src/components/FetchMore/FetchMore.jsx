import React, { useContext } from 'react';
import { SearchContext } from '../../context/search-context';
import { MdOutlineRefresh } from "react-icons/md";
import Loading from '../Loading/Loading';

/**
 * 
 * A component to display a button for fetching more data. [Infinite Scroll]
 * 
 * @returns {JSX.Element}
 * 
 */
const FetchMore = () => {
    const { fetchMoreData, loading } = useContext(SearchContext);

    /**
     * 
     * Function to handle fetching more data.
     * 
     */
    const handleFetchMore = () => {
        fetchMoreData();
    };


    return (
        <>
            {loading && <Loading />}
            <div className="button-fetcher-container">
                <button onClick={handleFetchMore}><MdOutlineRefresh /> Fetch More</button>
            </div>
        </>
    );
};

export default FetchMore;
