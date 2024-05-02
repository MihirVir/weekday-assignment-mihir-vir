import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { SearchContext } from '../../../context/search-context';
import "./select.css";

/**
 * 
 *  Select component for custom filters 
 * 
 *  @param {object} props - Data received from the parent class
 *  @param {string} props.name - Placeholder name of the the input 
 *  @param {Array<string | number>} props.options - Option list to be displayed to the user
 *  @param {boolean} [props.dropdown=true] - Boolean indicates whether the following input will
 *  be a dropdown or normal text input
 *  @param {string} [props.objectName=""] - Name of the object to be updated when an option is 
 *  selected
 * 
 *  @returns {JSX.Element} 
 */
const Select = React.memo(({ name, options, dropdown = true, objectName = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [val, setVal] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const inputRef = useRef(null);
  const { setFilters } = useContext(SearchContext);

  /**
   * 
   * Event listener to handle clicks outside the select container
   * Closes the search box if a click occurs outside the select container
   * 
   * @param {Event} event - The click event
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /**
   * Toggle the dropdown visibility
   */
  const handleIsOpen = () => {
    setIsOpen(prev => !prev);

    if (!isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }

  /**
   * 
   * Filters the options based on the input value
   * 
   */
  const filterOptions = useCallback(() => {
    if (!val || val === "") {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter(option => option.includes(val.toString()));
      setFilteredOptions(filtered);
    }
  }, [val, options]);

  /**
   * Debounces for better search performance
   */
  useEffect(() => {
    const deb = setTimeout(() => {
      filterOptions();
    }, 500);

    return () => clearTimeout(deb);
  }, [val, filterOptions]);

  const handleInputChange = (e) => {
    setVal(e.target.value);
  }

  /**
   * Handles the selection of an item from the dropdown menu.
   * Updates the selected item in the filters object
   * 
   * @param {string | number} item - The selected item
   */
  const handleItemSelected = (item) => {
    setVal(item);
    setIsOpen(false);
    if (objectName && setFilters) {
      const newValue = objectName === "minJdSalary" ? parseInt(item.substring(0, item.length)) : item;
      setFilters(prev => ({ ...prev, [objectName]: newValue }));
    }
  }

  /**
   * Clears the input value and reset the filter object.
   */
  const handleDelete = () => {
    setVal("");
    setFilters(prev => ({
        ...prev,
        [objectName]: ""
    }));
    setIsOpen(false);
  }
  return (
    <div className="select" ref={inputRef}>
      <div className="select-container" onClick={handleIsOpen}>
        <span className="select-name">
          <input onChange={handleInputChange} value={val} ref={inputRef} placeholder={name} type="text" />
        </span>
        {val.length !== 0 && <span onClick={handleDelete} className="delete-data">X</span>}
        {dropdown && (
          <span className="select-icon-wrapper">
            <MdOutlineKeyboardArrowDown className="select-icon" />
          </span>
        )}
      </div>
      {isOpen && dropdown && (
        <div className="options-menu-contianer">
          <ul>
            {filteredOptions.map(item => (
              <li onClick={() => handleItemSelected(item)} key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Select;
