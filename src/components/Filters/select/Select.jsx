import React, { useState, useRef } from 'react'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import "./select.css";

const Select = ({name, options}) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  function handleIsOpen() {
    setIsOpen(prev => !prev)

    if (!isOpen && inputRef.current) {
        inputRef.current.focus();
    }
  }

  return (
    <div className = "select">
        <div className="select-container" onClick={handleIsOpen}>
            <span className = "select-name">
                <input ref = {inputRef} placeholder={name} type = "text"/>
            </span>
            <span className = "select-icon-wrapper">
                <MdOutlineKeyboardArrowDown className = "select-icon"/>
            </span>
        </div>
        {isOpen && (
            <div className="options-menu-contianer">
                <ul>
                    {options.map((item) => (
                        <li>{item}</li>
                    ))}
                </ul>
            </div>
        )}
    </div>
  )
}

export default Select