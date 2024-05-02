import React, { useContext, useEffect, useState } from 'react'
import "./filters.css";
import Select from './select/Select';
import { SearchContext } from '../../context/search-context';

const number_of_emp = ["1-10", "11-20", "21-50", "51-100", "101-200", "201-500", "500+"];

const exp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const location = ["Remote","Hybrid", "In-office"]

const salary_data = ["0K","10K","20K","30K","40K","50K","60K","70K"]

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