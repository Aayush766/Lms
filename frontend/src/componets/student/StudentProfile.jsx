import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import './StudentProfile.css';
import img from '../../assets/img.jpeg';
import Navbar from '../Navbar';

const StudentProfile = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const student = {
    name: 'Aarav Sharma',
    class: '10th Grade',
    rollNumber: '21',
    grade: 'A',
    school: 'St. Xavier’s High School',
    dob: '2008-04-15',
    fatherName: 'Raghav Sharma',
    attendanceToday: 'Present',
    attendanceMonth: '92%',
  };

  const attendanceData = {
    '2025-05-01': 'P',
    '2025-05-02': 'A',
    '2025-05-03': 'P',
    '2025-05-04': 'P',
    '2025-05-05': 'A',
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = dayjs(date).format('YYYY-MM-DD');
      const status = attendanceData[dateString];
      if (status) {
        return (
          <div className={`attendance-marker ${status === 'P' ? 'present' : 'absent'}`}>
            {status}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <motion.div
    
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`max-w-4xl mx-auto p-6 rounded-3xl shadow-xl
        ${darkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border border-gray-700'
          : 'bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-900 border border-gray-200'}
      `}
    >
      <Navbar darkMode={darkMode} toggleDarkMode={setDarkMode} />

      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700 dark:text-purple-400">🎓 Student Profile</h2>

      <div className="flex justify-center mb-8">
        <img
          src={img}
          alt={student.name}
          className="w-36 h-36 rounded-full border-4 border-purple-500 shadow-md object-cover"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6 text-lg font-medium mb-6">
        <div><span className="text-gray-600 dark:text-gray-300">Name: </span>{student.name}</div>
        <div><span className="text-gray-600 dark:text-gray-300">Class: </span>{student.class}</div>
        <div><span className="text-gray-600 dark:text-gray-300">Roll No: </span>{student.rollNumber}</div>
        <div><span className="text-gray-600 dark:text-gray-300">Grade: </span>{student.grade}</div>
        <div><span className="text-gray-600 dark:text-gray-300">School: </span>{student.school}</div>
        <div><span className="text-gray-600 dark:text-gray-300">Date of Birth: </span>{student.dob}</div>
        <div><span className="text-gray-600 dark:text-gray-300">Father's Name: </span>{student.fatherName}</div>
        <div><span className="text-gray-600 dark:text-gray-300">Attendance (Today): </span>{student.attendanceToday}</div>
        <div><span className="text-gray-600 dark:text-gray-300">Attendance (Monthly): </span>{student.attendanceMonth}</div>
      </div>

      <h3 className="text-2xl font-bold mb-4 text-center text-purple-700 dark:text-purple-400">📅 Attendance Calendar</h3>
      <Calendar
        tileContent={tileContent}
        className="attendance-calendar"
      />
    </motion.div>
  );
};

export default StudentProfile;
