import React, { useContext, useState } from 'react';
import "./cards.css";
import { SearchContext } from '../../context/search-context';
import Card from './Card';
const Cards = () => {
  const [readMore, setReadMore] = useState(null);
  const {data} = useContext(SearchContext);

  const handleReadMore = (id) => {
    setReadMore(prevId => (prevId === id ? null : id));
  }

  console.log(data);
  return (
    <>
        <div className="card-section-container">
            <div className="card-container">
                {data.map((post, id) => (
                    <Card handleReadMore = {handleReadMore} post = {post} readMore = {readMore}/>
                ))}
            </div>
        </div>
    </>
  )
}

export default Cards;
