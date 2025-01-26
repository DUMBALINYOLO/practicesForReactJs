import React, { useState } from 'react';

const DynamicForm = () => {
  const [inputFields, setInputFields] = useState([{ name: '' }]);
  const [submittedNames, setSubmittedNames] = useState([]);

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index].name = event.target.value;
    setInputFields(values);
  };

  const handleAddField = () => {
    setInputFields([...inputFields, { name: '' }]);
  };

  const handleRemoveField = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const names = inputFields.map(field => field.name);
    setSubmittedNames(names);
  };

  return (
    <div>
      <h1>Dynamic Form</h1>
      <form onSubmit={handleSubmit}>
        {inputFields.map((inputField, index) => (
          <div key={index}>
            <input
              type="text"
              value={inputField.name}
              onChange={event => handleInputChange(index, event)}
              placeholder="Enter name"
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index)}
              disabled={inputFields.length === 1}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddField}>
          Add Field
        </button>
        <button type="submit">Submit</button>
      </form>
      {submittedNames.length > 0 && (
        <div>
          <h2>Submitted Names</h2>
          <ul>
            {submittedNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DynamicForm;