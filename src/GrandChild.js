import React from 'react';

const Grandchild = ({ message }) => {
  return (
    <div>
      <h3>Grandchild Component</h3>
      <p>Message: {message}</p>
    </div>
  );
};

export default Grandchild;