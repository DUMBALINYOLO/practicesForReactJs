import React, { useState } from 'react';
// import './Accordion.css'; // Import CSS for styles

const Accordion = ({ sections }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleSection = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const collapseAll = () => {
    setActiveIndex(null);
  };

  return (
    <div className="accordion">
      <button className="collapse-button" onClick={collapseAll}>
        Collapse All
      </button>
      {sections.length === 0 ? (
        <p className="no-sections">No sections available.</p>
      ) : (
        sections.map((section, index) => (
          <div key={index} className="accordion-section">
            <div
              className={`accordion-title ${activeIndex === index ? 'active' : ''}`}
              role="button"
              tabIndex={0}
              aria-expanded={activeIndex === index}
              onClick={() => toggleSection(index)}
              onKeyPress={(e) => e.key === 'Enter' && toggleSection(index)}
            >
              {section.title}
            </div>
            {activeIndex === index && (
              <div className="accordion-content">
                {section.content}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

const RenderAccordion = () => {
  const sections = [
    { title: 'Section 1', content: 'Content of Section 1' },
    { title: 'Section 2', content: 'Content of Section 2' },
    { title: 'Section 3', content: 'Content of Section 3' },
  ];

  return <Accordion sections={sections} />;
};

export default RenderAccordion;
