import React from 'react'
import "./filters.css";
import Select from './select/Select';


const Filters = () => {
  return (
    <div className = "filter">
        <div className="filter-container">
            <Select name = "Roles" />
            <Select name = "Number of Employees" />
            <Select name = "Experience" />
            <Select name = "Remote" />
            <Select name = "Minimum Base Pay Salary" />
            <Select name = "Search Company" />
        </div>
    </div>
  )
}

export default Filters