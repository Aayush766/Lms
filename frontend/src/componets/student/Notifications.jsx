import React from 'react';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const [notifications, setNotifications] = React.useState([
    { id: 1, message: 'Your doubt on Session 5 has been replied by Teacher A.', read: false, question: 'What is the derivative of x^2?', timeAsked: '2025-05-10' },
    // Add more notifications if needed
  ]);

  const markAsRead = (id) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li 
            key={notification.id} 
            className={`p-4 mb-2 rounded-md ${notification.read ? 'bg-gray-200' : 'bg-blue-100'}`}
            onClick={() => markAsRead(notification.id)}
          >
            <p>{notification.message}</p>
            <small className="text-gray-500">{notification.timeAsked}</small>
            {!notification.read && <span className="text-red-500 ml-2">New</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
