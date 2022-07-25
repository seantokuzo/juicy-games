import React from 'react'

const FormRow = ({
  first = false,
  type,
  name,
  value,
  handleChange,
  labelText,
  explanation
}) => {
  return (
    <div className="form-row">
      <label
        htmlFor={name}
        className={
          first
            ? 'form-row__label form-row__label--first text'
            : 'form-row__label text'
        }
      >
        {labelText || name}
      </label>
      {explanation && (
        <p className="form-row__explanation text">{explanation}</p>
      )}
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-row__input"
      />
    </div>
  )
}

export default FormRow
