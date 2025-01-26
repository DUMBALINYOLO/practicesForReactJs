import React, { useState } from 'react';

const DragDropList = ({ items }) => {
  const [itemList, setItemList] = useState(items);

  // Function to handle drag start
  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('index', index);
  };

  // Function to handle drag over (allow drop)
  const handleDragOver = (event) => {
    event.preventDefault(); // This is needed to allow the drop
  };

  // Function to handle drop event
  const handleDrop = (event, targetIndex) => {
    const sourceIndex = event.dataTransfer.getData('index');
    const updatedList = [...itemList];
    const [movedItem] = updatedList.splice(sourceIndex, 1);
    updatedList.splice(targetIndex, 0, movedItem);
    setItemList(updatedList);
  };

  return (
    <div>
      <h1>Drag and Drop List</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {itemList.map((item, index) => (
          <li
            key={item.id}
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, index)}
            style={{
              padding: '16px',
              margin: '8px 0',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'move',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease',
            }}
          >
            {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Example usage of DragDropList component
const DragDropListRender = () => {
  const items = [
    { id: 1, content: 'Item 1' },
    { id: 2, content: 'Item 2' },
    { id: 3, content: 'Item 3' },
    { id: 4, content: 'Item 4' },
    { id: 5, content: 'Item 5' },
  ];

  return (
    <div>
      <DragDropList items={items} />
    </div>
  );
};

export default DragDropListRender;
