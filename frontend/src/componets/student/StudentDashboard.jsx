// StudentDashboard.js
import React, { useState, useEffect } from 'react';
import { PulseLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import Navbar from '../Navbar';  // Import the Navbar component
import Timetable from './Timetable';


import img from '../../assets/img.jpeg'
import AssessmentsReport from './AssessmentsReport';
import StudentSupport from './StudentSupport';
import BadgeSection from './BadgeSection';


const progress = 75;

const StudentDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [studentData] = useState({
    studentName: "John Doe",
    grade: "6 A",
    studentSchool: "Green Valley International School"
  });

  const { studentName, grade, studentSchool } = studentData;

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    document.documentElement.classList.toggle('dark', checked);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <PulseLoader color="#4B89FF" size={15} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-gradient-to-r from-gray-700 to-black' : 'bg-gradient-to-r from-gray-200 to-gray-50'}`}>
      
      {/* Navbar */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Dashboard Content */}
      <motion.div
        className="container mx-auto p-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div
          className={`flex flex-col md:flex-row gap-6 p-6 rounded-xl shadow-xl ${
            darkMode
              ? 'bg-gradient-to-r from-blue-200 to-blue-300'  // Dark Mode Background
              : 'bg-gradient-to-r from-gray-700  to-gray-400'  // Light Mode Background
          }`}
        >
          {/* Left Section */}
          <div className="flex-1 space-y-8">
            {/* Profile */}
            <motion.div
  className="flex flex-col sm:flex-row items-center sm:items-start"
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
>
  <img
    src={img}
    alt={studentName}
    className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 border-[6px] border-blue-500 rounded-full object-cover shadow-lg hover:scale-105 transition-transform duration-300"
  />
  <div className="mt-6 sm:mt-0 sm:ml-6 text-center sm:text-left space-y-2">
    <h3 className={`text-3xl md:text-4xl font-extrabold ${darkMode ? 'text-black' : 'text-yellow-300'}`}>
      {studentName}
    </h3>
    <p className={`text-xl md:text-2xl font-semibold ${darkMode ? 'text-black' : 'text-yellow-200'}`}>
      Grade: {grade}
    </p>
    <p className={`text-lg md:text-xl font-medium ${darkMode ? 'text-black' : 'text-white'}`}>
     School: {studentSchool}
    </p>
  </div>
</motion.div>

          </div>

          {/* Right Section */}
          <motion.div
            className="flex-1 space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome, {studentName}!</h3>
            <p className={`${darkMode ? 'text-black' : 'text-yellow-400'}`}>
              Here you can see your course progress and manage your courses. Stay consistent to achieve your goals.
            </p>
            <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Course Progress Tracker</h4>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-gray-800 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className={` font-bold ${darkMode ? 'text-red-500' : 'text-yellow-400'}`}>{progress}% Complete</p>
          </motion.div>
        </div>
      </motion.div>
      <StudentSupport darkMode={darkMode}studentData={studentData}
      />
{/*      
    <Timetable darkMode={darkMode} /> */}
  
    <BadgeSection darkMode={darkMode} />
   <AssessmentsReport darkMode={darkMode}/>
      
 
            
    </div>
  );
};

export default StudentDashboard;
