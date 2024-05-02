import React, { useContext, useEffect, useState } from 'react';
import "./filters.css";
import Select from './select/Select';
import { SearchContext } from '../../context/search-context';
import { number_of_emp, salary_data, location, exp, company_name } from '../../data/company-data';

const Filters = () => {
  const { data, updateData } = useContext(SearchContext);
  const [roles, setRoles] = useState([]);
  const [cName, setCName] = useState([]);
  useEffect(() => {
    const filteredRoles = Array.from(new Set(data.map(job => job.jobRole).filter(role => role !== null)));
    const filteredCompanies = Array.from(new Set(data.map(job => job.company.name)))
    setRoles(filteredRoles);
    setCName(filteredCompanies);

  }, [data]);


  return (
    <div className="filter">
      <div className="filter-container">
        <Select name="Roles" options={roles} objectName="jobRole" />
        <Select name="Number of Employees" options={number_of_emp} />
        <Select name="Experience" options={exp} objectName="minExp" />
        <Select name="Remote" options={location} objectName="location" />
        <Select name="Minimum Base Pay Salary" options={salary_data} objectName="minJdSalary" />
        <Select name="company name" options = {cName} objectName = "companyName" />
      </div>
    </div>
  )
}

export default Filters;
