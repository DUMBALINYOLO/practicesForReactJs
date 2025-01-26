import React, { useState } from 'react';

const VisibilityToggle = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button onClick={toggleVisibility}>
        {isVisible ? 'Hide Details' : 'Show Details'}
      </button>
      {isVisible && <p>This is some hidden content</p>}
    </div>
  );
};

export default VisibilityToggle;