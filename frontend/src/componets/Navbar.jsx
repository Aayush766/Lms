// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { motion } from 'framer-motion';
import { FiBell } from 'react-icons/fi';
import logo from '../assets/Logo.png';

// Navbar Component
const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Your doubt on Session 5 has been replied by Teacher A.', read: false },
    // You can add more sample notifications
  ]);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <motion.nav
      className={`p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-600'} text-white`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-16 md:h-20" />
          <span className="text-xl font-semibold">Student Dashboard</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center md:justify-end items-center">
        <Link to="/dashboard" className="hover:text-blue-200">Home</Link>
        <Link to="/course" className="hover:text-blue-200">My Courses</Link>
        <Link to="/profile" className="hover:text-blue-200">Profile</Link>
        
        {/* Notification Button */}
        <Link to="/notifications" className="relative">
          <FiBell size={24} className="hover:text-blue-200" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 text-xs text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">{unreadCount}</span>
          )}
        </Link>

        {/* Dark Mode Toggle */}
        <DarkModeSwitch
          checked={darkMode}
          onChange={toggleDarkMode}
          size={30}
        />
      </div>
    </motion.nav>
  );
};

export default Navbar;
