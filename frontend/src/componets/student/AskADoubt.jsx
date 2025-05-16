// component/student/AskADoubt.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiImage, FiVideo, FiMusic, FiFileText, FiFile
} from 'react-icons/fi';
import { Dialog } from '@headlessui/react';

const mockTeachers = {
  "Green Valley International School": ["Mr. Sharma", "Ms. Rao"],
  "Sunrise Public School": ["Mr. Mehta", "Ms. Kapoor"],
};

const AskADoubt = ({ darkMode, closeForm, studentData }) => {
  const [formData, setFormData] = useState({
    studentName: studentData?.studentName || '',
    grade: studentData.grade,
    school: studentData.studentSchool,
    subject: '',
    session: '',
    doubt: '',
    teacher: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    const message = formData.doubt.trim();
    if (!message) return;

    const newMessage = {
      sender: 'student',
      text: message,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, newMessage]);

    // Simulate teacher response after delay
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'teacher',
          text: 'Thanks for your doubt! I will get back to you soon.',
          timestamp: new Date(),
        },
      ]);
    }, 2000);

    // Clear input
    setFormData((prev) => ({ ...prev, doubt: '' }));
  };

  const getFileIcon = (file) => {
    const type = file.type;
    if (type.startsWith('image/')) return <FiImage className="text-blue-500 mr-2" />;
    if (type.startsWith('video/')) return <FiVideo className="text-purple-500 mr-2" />;
    if (type.startsWith('audio/')) return <FiMusic className="text-green-500 mr-2" />;
    if (type.includes('pdf') || type.includes('word')) return <FiFileText className="text-red-500 mr-2" />;
    return <FiFile className="text-gray-500 mr-2" />;
  };

  return (
    <motion.div
      className={`p-6 rounded-3xl shadow-2xl mx-4 my-6 md:mx-10 md:my-10 transition-all duration-500
        ${darkMode
          ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border border-gray-700'
          : 'bg-gradient-to-br from-yellow-50 via-white to-yellow-100 text-gray-800 border border-gray-200'}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-3xl font-bold">📚 Ask A Doubt</h2>
          <span className="text-sm text-yellow-400 font-semibold">🌟 Premium Support</span>
        </div>
        <button
          onClick={closeForm}
          className="text-red-500 font-semibold hover:underline text-lg"
        >
          ✖ Close
        </button>
      </div>

      <form className="flex flex-col gap-6 max-w-2xl mx-auto">
        {/* Student Info (Read-Only) */}
        {['studentName', 'grade', 'school'].map((field) => (
          <div key={field}>
            <label className="block mb-1 font-semibold capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              readOnly
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600"
            />
          </div>
        ))}

        {/* Subject Input */}
        <div>
          <label className="block mb-1 font-semibold">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600"
            required
          />
        </div>

        {/* Teacher Dropdown */}
        <div>
          <label className="block mb-1 font-semibold">Select Teacher</label>
          <select
            name="teacher"
            value={formData.teacher}
            onChange={(e) => {
              handleChange(e);
              setIsChatOpen(true);
            }}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
            required
          >
            <option value="">Select a Teacher</option>
            {(mockTeachers[formData.school] || []).map((teacher) => (
              <option key={teacher} value={teacher}>{teacher}</option>
            ))}
          </select>
        </div>

        {/* Uploads */}
        <div>
          <label className="block mb-1 font-semibold">Upload Files</label>
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Image', icon: FiImage, accept: 'image/*', bg: 'bg-blue-500' },
              { label: 'Video', icon: FiVideo, accept: 'video/*', bg: 'bg-purple-500' },
              { label: 'Document', icon: FiFileText, accept: '.pdf,.doc,.docx', bg: 'bg-red-500' },
              { label: 'Audio', icon: FiMusic, accept: 'audio/*', bg: 'bg-green-500' },
            ].map(({ label, icon: Icon, accept, bg }) => (
              <label key={label} className={`flex items-center gap-2 px-3 py-2 ${bg} hover:opacity-90 text-white rounded-md cursor-pointer`}>
                <Icon /> {label}
                <input type="file" accept={accept} onChange={handleFileChange} className="hidden" />
              </label>
            ))}
          </div>
          {/* Show files */}
          {uploadedFiles.length > 0 && (
            <ul className="mt-3 text-sm">
              {uploadedFiles.map((file, i) => (
                <li key={i} className="flex items-center gap-2">
                  {getFileIcon(file)} <span>{file.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>

      {/* Chat Modal */}
      <Dialog open={isChatOpen} onClose={() => setIsChatOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl text-gray-900 dark:text-white">
            <Dialog.Title className="text-xl font-bold mb-4">💬 Chat with {formData.teacher}</Dialog.Title>

            <div className="h-64 overflow-y-auto border rounded-lg p-3 space-y-2 mb-4">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-3 py-2 rounded-lg max-w-xs ${msg.sender === 'student' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleChatSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Type your doubt..."
                value={formData.doubt}
                onChange={handleChange}
                name="doubt"
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                Send
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </motion.div>
  );
};

export default AskADoubt;
