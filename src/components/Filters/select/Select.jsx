import React from 'react'
import "./select.css";

const Select = ({name, options}) => {
  return (
    <div className = "select">
        <div className="select-container">
            <span className = "select-name">
                <input placeholder={name} type = "text"/>
            </span>
            <span className = "select-icon">D</span>
        </div>
    </div>
  )
}

export default Select