import React, { useState, useEffect } from 'react';

// Notification component
const Notification = ({ id, message, type, onDismiss }) => {
  return (
    <div
      style={{
        border: '1px solid',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        backgroundColor: type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1',
        borderColor: type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb',
        color: type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460',
        position: 'relative',
        opacity: 1,
        transition: 'opacity 0.5s ease-out',
      }}
    >
      <button
        onClick={() => onDismiss(id)}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          background: 'none',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        &times;
      </button>
      <p>{message}</p>
    </div>
  );
};

// NotificationSystem component
const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    // Automatically dismiss notifications after 5 seconds
    const timer = setInterval(() => {
      setNotifications((prevNotifications) => prevNotifications.slice(1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const addNotification = () => {
    const newNotification = {
      id: new Date().getTime(), // Use timestamp as unique ID
      message: 'This is a new notification!',
      type: 'info',
    };
    setNotifications([...notifications, newNotification]);
  };

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Notification System</h1>
      <button onClick={addNotification} style={{ padding: '10px', fontSize: '16px' }}>
        Add Notification
      </button>
      <div>
        {notifications.map((notification) => (
          <Notification 
            key={notification.id} 
            id={notification.id} 
            message={notification.message} 
            type={notification.type} 
            onDismiss={dismissNotification} 
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationSystem;
