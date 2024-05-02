import React from 'react'

const Card = ({ handleReadMore, post, readMore }) => {
  return (
    <>
        <div key = {post.jdUid} className="card-wrapper">
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
                            <span>Estimated Salary:  ${post.currency}{post.minJdSalary || 0}k - ${post.currency}{post.maxJdSalary || 0}k</span>
                        </div>

                        <div className="about-company-container">
                            <h4 className = "about-header">About Company:</h4>
                            <h5>About us</h5>
                            <span className = "about-company-desc"> 
                            {post.jdUid === readMore ? post.jobDetailsFromCompany.substring(0,100) : post.jobDetailsFromCompany.substring(0, 60)}
                            <button onClick={() => handleReadMore(post.jdUid)} className="read-more-btn">{post.jdUid === readMore ? "read less" : "read more"}</button>
                            </span>
                        </div>
                        <div className="minimum-experience-required">
                            <h4>Minimum Experience:</h4>
                            <span>{post.minExp || "not disclosed"} years</span>
                        </div>
                        <button className = "apply-btn">
                            ⚡ Easy Apply
                        </button>
                </div>
    </>
  )
}

export default Card