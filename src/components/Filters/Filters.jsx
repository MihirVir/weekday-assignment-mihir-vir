import React from 'react'
import "./filters.css";
import Select from './select/Select';


const Filters = () => {
  return (
    <div className = "filter">
        <div className="filter-container">
            <Select name = "Roles" />
            <input type = "text" />
            <input type = "text" />
            <input type = "text" />
            <input type = "text" />
            <input type = "text" />
        </div>
    </div>
  )
}

export default Filters