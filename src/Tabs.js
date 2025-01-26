import React, { useState } from 'react';
// import './Tabs.css'; // Add this CSS file for styling

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, title: 'Tab 1', content: 'This is the content of Tab 1.' },
    { id: 1, title: 'Tab 2', content: 'This is the content of Tab 2.' },
    { id: 2, title: 'Tab 3', content: 'This is the content of Tab 3.' },
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === tab.id}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tab-content" role="tabpanel">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
