import React, { useState, useRef, useEffect } from 'react';
// import './Modal.css';

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const triggerButtonRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  // Focus management
  useEffect(() => {
    if (isModalOpen) {
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'auto'; // Restore background scroll
      triggerButtonRef.current?.focus();
    }
  }, [isModalOpen]);

  return (
    <div>
      <button ref={triggerButtonRef} onClick={openModal}>
        Open Modal
      </button>
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent click bubbling
            ref={modalRef}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <h2 id="modal-title">Modal Window</h2>
            <p id="modal-description">This is a modal window with enhanced features.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
