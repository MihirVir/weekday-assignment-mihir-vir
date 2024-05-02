import React, { useContext, useEffect, useState } from 'react'
import "./filters.css";
import Select from './select/Select';
import { SearchContext } from '../../context/search-context';
import { number_of_emp, salary_data, location, exp } from '../../data/company-data';
const Filters = () => {
  const {data} = useContext(SearchContext);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const filteredRoles = Array.from(new Set(data.map(job => job.jobRole).filter(role => role !== null)));
    setRoles(filteredRoles);
  }, [data])


  return (
    <div className = "filter">
        <div className="filter-container">
            <Select name = "Roles" options = {roles} objectName = "jobRole"/>
            <Select name = "Number of Employees"  options={number_of_emp}/>
            <Select name = "Experience" options={exp} objectName = "minExp"/>
            <Select name = "Remote" options={location} objectName = "location"/>
            <Select name = "Minimum Base Pay Salary" options={salary_data} objectName = "minJdSalary"/>
            <Select name = "company name" dropdown = {false}/>
        </div>
    </div>
  )
}

export default Filters