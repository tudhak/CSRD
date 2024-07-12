import { useState, useEffect, useRef } from "react";

// CustomDropdown component to simulate standard HTML select/option elements, yet configurable
// The issue with standard HTML select/option element being that text cannot wrap
// Some subtopics being way too long to display correctly, this component was nexessary

function CustomDropdown({ options, selectedValue, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const findOption = function (options, selectedValue) {
    return options?.find((option) => option?.subtopic === selectedValue);
  };

  // Handling click events
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="custom-dropdown">
      <div className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
        {`${findOption(options, selectedValue)?.subtopic} - ${
          findOption(options, selectedValue)?.label
        }`}
      </div>
      {isOpen && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              key={option.subtopic}
              className={`dropdown-item ${
                option.subtopic === selectedValue ? "selected-item" : ""
              }`}
              onClick={() => handleSelect(option.subtopic)}
            >
              {option.subtopic} - {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;
