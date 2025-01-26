import React from 'react';
import Grandchild from './GrandChild';

const Child = ({ message, updateMessage }) => {
  const handleClick = () => {
    updateMessage('Message updated by Child!');
  };

  return (
    <div>
      <h2>Child Component</h2>
      <button onClick={handleClick}>Update Message</button>
      <Grandchild message={message} />
    </div>
  );
};

export default Child;