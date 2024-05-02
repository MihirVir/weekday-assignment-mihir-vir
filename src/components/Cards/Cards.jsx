import React, { useContext, useState } from 'react';
import "./cards.css";
import { SearchContext } from '../../context/search-context';

const Cards = () => {
  const [readMore, setReadMore] = useState(null);
  const data = useContext(SearchContext);

  const handleReadMore = (id) => {
    setReadMore(prevId => (prevId === id ? null : id));
  }

  console.log(data)
  return (
    <>
        <div className="card-section-container">
            <div className="card-container">
                {data.map((post, id) => (
                    <div key = {post.juid} className="card-wrapper">
                        <span className = "posted">posted 13 days ago</span>
                        <div className="company-details">
                            <img className = "company-img" src="https://bookface-images.s3.amazonaws.com/logos/017257ba9b6f2ef9437d4228ef09c47656b900da.png" alt="error loading company image" />
                            <div className="position-information">
                                <span className = "company-name">
                                    Weekday
                                </span>
                                <span className = "job-role">
                                    {post.jobRole}
                                </span>
                                <span className = "job-location">
                                    {post.location}
                                </span>
                            </div>
                        </div>
                        <div className="salary-information">
                            <span>Estimated Salary: 16L-20L</span>
                        </div>

                        <div className="about-company-container">
                            <h4 className = "about-header">About Company:</h4>
                            <h5>About us</h5>
                            <span className = "about-company-desc"> 
                            {id === readMore ? post.jobDetailsFromCompany.substring(0,100) : post.jobDetailsFromCompany.substring(0, 60)}
                            {post.jobUid !== readMore && <button onClick={() => handleReadMore(id)} className="read-more-btn">{id === readMore ? "read less" : "read more"}</button>}
                            </span>
                        </div>
                        <div className="minimum-experience-required">
                            <h4>Minimum Experience:</h4>
                            <span>1 years</span>
                        </div>
                        <button className = "apply-btn">
                            ⚡ Easy Apply
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default Cards;
