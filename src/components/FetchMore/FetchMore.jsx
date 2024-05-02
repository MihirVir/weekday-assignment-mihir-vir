import React, { useContext } from 'react';
import { SearchContext } from '../../context/search-context';
import { MdOutlineRefresh } from "react-icons/md";
import Loading from '../Loading/Loading';

const FetchMore = () => {
    const { fetchMoreData, loading } = useContext(SearchContext);

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
