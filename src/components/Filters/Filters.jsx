import React, { useContext, useState } from 'react'
import "./filters.css";
import Select from './select/Select';
import { SearchContext } from '../../context/search-context';

const number_of_emp = ["1-10", "11-20", "21-50", "51-100", "101-200", "201-500", "500+"];

const exp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const location = ["Remote","Hybrid", "In-office"]

const salary_data = ["0L","10L","20L","30L","40L","50L","60L","70L"]

const Filters = () => {
  const {data} = useContext(SearchContext);
  
  function filterRoles() {
    const filteredRoles = new Set();

    data.forEach(job => {
        if (job.jobRole !== null) {
            filteredRoles.add(job.jobRole); 
        }
    });
    
    return [...filteredRoles];
  }

  return (
    <div className = "filter">
        <div className="filter-container">
            <Select name = "Roles" options = {filterRoles()}/>
            <Select name = "Number of Employees"  options={number_of_emp}/>
            <Select name = "Experience" options={exp}/>
            <Select name = "Remote" options={location}/>
            <Select name = "Minimum Base Pay Salary" options={salary_data}/>
            <Select name = "company name" dropdown = {false}/>
        </div>
    </div>
  )
}

export default Filters