import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import "./select.css";
import { SearchContext } from '../../../context/search-context';

const Select = ({name, options, dropdown = true, objectName = ""}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [val, setVal] = useState("");
  const [filteredOptions, setFilteredOptions]  = useState(options);
  const inputRef = useRef(null);
  const { setFilters } = useContext(SearchContext);

  function handleIsOpen() {
    setIsOpen(prev => !prev)

    if (!isOpen && inputRef.current) {
        inputRef.current.focus();
    }
  }

  const filterOptions = () => {
    if (!val || val === "") {
      setFilteredOptions(options); 
    } else {
        let filtered = [];
        if (typeof options[0] === "string") {
            filtered = options.filter(ops =>
                ops.includes(val.toString())
            );
        }
        console.log("Filtered Options:", filtered);
        setFilteredOptions(filtered);
    }
  }

  useEffect(() => {
    const deb = setTimeout(() => {
        filterOptions();
    }, 500)
    
    return () => clearInterval(deb);
  }, [val]);

  const handleInputChange = (e) => {
    setVal(e.target.value);
  }

  const handleItemSelected = (item) => {
    setVal(item);
    setIsOpen(false);
    if (objectName && setFilters) {
        console.log(item)
        if (objectName === "minJdSalary") {
            const pay = parseInt(item.substring(0, item.length));
            setFilters(prev => ({
                ...prev,
                [objectName]: pay
            })) 
        } else {
            setFilters(prev => ({
                ...prev,
                [objectName]: item
            }))
        }
    }
  }


    return (
        <div className="select">
          <div className="select-container" onClick={handleIsOpen}>
            <span className="select-name">
              <input onChange={handleInputChange} value={val} ref={inputRef} placeholder={name} type="text" />
            </span>
            {
              dropdown && (<span className="select-icon-wrapper">
                <MdOutlineKeyboardArrowDown className="select-icon" />
              </span>)
            }
          </div>
          {(isOpen && dropdown) && (
            <div className="options-menu-contianer">
              <ul>
                {filteredOptions.length === 0 ? options.map((item) => (
                  <li onClick = {() => handleItemSelected(item)} key={item}>{item}</li>
                )) : filteredOptions.map(item => (
                    <li onClick = {() => handleItemSelected(item)} key = {item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
  
}

export default Select;
