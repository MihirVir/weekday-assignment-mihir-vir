import React, { useContext, useState, useCallback, useEffect } from 'react';
import "./cards.css";
import { SearchContext } from '../../context/search-context';
import Card from './Card';

const Cards = () => {
  const [readMore, setReadMore] = useState(null);
  const { data } = useContext(SearchContext);

  const handleReadMore = useCallback((id) => {
    setReadMore(prevId => (prevId === id ? null : id));
  }, []);
  
  return (
    <>
      <div className="card-section-container">
        <div className="card-container">
          {data.map((post, id) => (
            <Card
              key={post.jdUid}
              handleReadMore={handleReadMore}
              post={post}
              readMore={readMore}
              id = {id}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default React.memo(Cards);
