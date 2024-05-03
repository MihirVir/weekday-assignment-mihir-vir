import React from "react";

const Card = ({ handleReadMore, post, readMore, id }) => {
    const handleRedirect = (link) => {
      console.log(post);
      window.location.href = link;
    };
  
    const isExpanded = readMore === id;
  
    return (
      <div className="card-wrapper">
        <span className="posted">posted 13 days ago</span>
        <div className="company-details">
          <img
            className="company-img"
            src={post.company.img_src}
            alt={`${post.company.name} company image`}
          />
          <div className="position-information">
            <span className="company-name">{post.company.name}</span>
            <span className="job-role">{post.jobRole}</span>
            <span className="job-location">{post.location}</span>
          </div>
        </div>
        <div className="salary-information">
          <span>
            Estimated Salary: ${post.currency}
            {post.minJdSalary || 0}k - ${post.currency}
            {post.maxJdSalary || 0}k
          </span>
        </div>
        <div className="about-company-container">
          <h4 className="about-header">About Company:</h4>
          <h5>About us</h5>
          <span className="about-company-desc">
            {isExpanded
              ? post.jobDetailsFromCompany.substring(0, 100)
              : post.jobDetailsFromCompany.substring(0, 60)}
            <button
              onClick={() => handleReadMore(id)}
              className="read-more-btn"
            >
              {isExpanded ? "read less" : "read more"}
            </button>
          </span>
        </div>
        <div className="minimum-experience-required">
          <h4>Minimum Experience:</h4>
          <span>{post.minExp || "not disclosed"} years</span>
        </div>
        <button onClick={() => handleRedirect(post.jdLink)} className="apply-btn">⚡ Easy Apply</button>
      </div>
    );
  };
    

export default React.memo(Card);
