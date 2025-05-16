import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FeedbackForm = ({ darkMode, closeForm, studentData }) => {
  const [formData, setFormData] = useState({
    schoolName: studentData?.studentSchool || '',
    studentName: studentData?.studentName || '',
    gradeSection: studentData?.grade || '',
    feedback: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback Submitted:', formData);
    alert('Thank you for your feedback!');
    setFormData({
      schoolName: '',
      studentName: '',
      gradeSection: '',
      feedback: '',
    });
    closeForm(); // Close the form after submission
  };

  return (
    <motion.div
      className={`p-6 rounded-3xl shadow-2xl mx-4 my-6 md:mx-10 md:my-10 transition-all duration-500
        ${darkMode
          ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border border-gray-700'
          : 'bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800 border border-gray-200'}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">📝 Feedback Form</h2>
        <button
          onClick={closeForm}
          className="text-red-500 font-semibold hover:underline text-lg"
        >
          ✖ Close
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl mx-auto">
        <div>
          <label className="block mb-1 font-semibold" htmlFor="schoolName">School Name</label>
          <input
            type="text"
            id="schoolName"
            name="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
            required
            readOnly
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="studentName">Student Name</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
            readOnly
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="gradeSection">Grade / Section</label>
          <input
            type="text"
            id="gradeSection"
            name="gradeSection"
            value={formData.gradeSection}
            onChange={handleChange}
            required
            readOnly
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="feedback">Your Feedback</label>
          <textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          ></textarea>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all"
        >
          Submit Feedback
        </motion.button>
      </form>
    </motion.div>
  );
};

export default FeedbackForm;
