import React, { useEffect, useState } from "react";
import { company_name } from "../../data/company-data";

const Card = ({ handleReadMore, post, readMore }) => {
  const [randomIndex, setRandomIndex] = useState(0);
  const [randomCompany, setRandomCompany] = useState({ name: "", img_src: "" });

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * company_name.length);
    const randomCompany = company_name[randomIndex];
    setRandomIndex(randomIndex);
    setRandomCompany(randomCompany);
  }, []);

  return (
    <>
      <div key={post.jdUid} className="card-wrapper">
        <span className="posted">posted 13 days ago</span>
        <div className="company-details">
          <img
            className="company-img"
            src={randomCompany.img_src}
            alt="error loading company image"
          />
          <div className="position-information">
            <span className="company-name">{randomCompany.name}</span>
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
            {post.jdUid === readMore
              ? post.jobDetailsFromCompany.substring(0, 100)
              : post.jobDetailsFromCompany.substring(0, 60)}
            <button
              onClick={() => handleReadMore(post.jdUid)}
              className="read-more-btn"
            >
              {post.jdUid === readMore ? "read less" : "read more"}
            </button>
          </span>
        </div>
        <div className="minimum-experience-required">
          <h4>Minimum Experience:</h4>
          <span>{post.minExp || "not disclosed"} years</span>
        </div>
        <button className="apply-btn">⚡ Easy Apply</button>
      </div>
    </>
  );
};

export default React.memo(Card);
