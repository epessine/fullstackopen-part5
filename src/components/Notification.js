import React from 'react';

const Notification = ({ notification }) => {
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
    <div style={notificationStyle}>
      {notification.message}
    </div>
  );
};

export default Notification;