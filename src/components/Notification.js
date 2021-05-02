import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);
  if (!notification) {
    return null;
  }

  const status = notification.status === 'success'
    ? 'green'
    : 'red';

  const notificationStyle = {
    color: status,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  };

  return (
    <div
      id='notification'
      style={notificationStyle}
    >
      {notification.message}
    </div>
  );
};

export default Notification;