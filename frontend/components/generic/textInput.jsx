import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  value, onChange, onBlur, id, placeholder, maxLength, readOnly,
}) => {
  const handleInputChange = (e) => {
    if (onChange) {
      e.preventDefault();
      onChange(e.target.value);
    }
  };

  const handleBlurChange = (e) => {
    if (onBlur) {
      e.preventDefault();
      onBlur(e);
    }
  };

  return (
    <input
      type="text"
      className="form-control"
      defaultValue={value}
      onChange={handleInputChange}
      onBlur={handleBlurChange}
      id={id}
      placeholder={placeholder}
      maxLength={maxLength}
      readOnly={readOnly}
    />
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  readOnly: PropTypes.bool,
};

TextInput.defaultProps = {
  onBlur: undefined,
  placeholder: 'Insert text',
  maxLength: 50,
  readOnly: false,
};

export default TextInput;
