import React, { useState, useRef } from 'react';
import { Dialog } from '@headlessui/react';

const mockDoubts = [
  {
    id: 1,
    studentName: "Riya Patel",
    school: "Green Valley International School",
    subject: "Mathematics",
    doubt: "Can you explain quadratic equations?",
    teacher: "Mr. Sharma",
    messages: [
      { sender: "student", text: "Can you explain quadratic equations?", timestamp: new Date() },
    ],
  },
  {
    id: 2,
    studentName: "Aarav Mehta",
    school: "Sunrise Public School",
    subject: "Science",
    doubt: "What is Newton’s third law?",
    teacher: "Ms. Kapoor",
    messages: [
      { sender: "student", text: "What is Newton’s third law?", timestamp: new Date() },
    ],
  },
];

// Helper to format timestamps
const formatTimestamp = (date) => {
  return new Date(date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
};

const SeeStudentDoubts = ({ darkMode, teacherName }) => {
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [reply, setReply] = useState("");
  const [fileUploads, setFileUploads] = useState([]);
  const fileInputRef = useRef(null);

  // Filter doubts assigned to the current teacher
  const doubts = mockDoubts.filter(d => d.teacher === teacherName);

  const handleReply = (e) => {
    e.preventDefault();
    if (!reply.trim() && fileUploads.length === 0) return;

    // Add text reply if any
    let newMessages = [...selectedDoubt.messages];
    if (reply.trim()) {
      newMessages.push({
        sender: "teacher",
        text: reply.trim(),
        timestamp: new Date(),
        type: 'text'
      });
    }

    // Add uploaded files as messages
    fileUploads.forEach(file => {
      newMessages.push({
        sender: "teacher",
        text: file.name,
        timestamp: new Date(),
        type: 'file'
      });
    });

    const updated = {
      ...selectedDoubt,
      messages: newMessages,
    };

    const index = mockDoubts.findIndex(d => d.id === selectedDoubt.id);
    mockDoubts[index] = updated;
    setSelectedDoubt(updated);
    setReply("");
    setFileUploads([]);
    if(fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFileUploads(prev => [...prev, ...newFiles]);
  };

  return (
    <div className={`p-6 rounded-3xl shadow-xl mx-4 md:mx-10 my-6 md:my-10 
      ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 border border-gray-200'}`}>

      <h2 className="text-3xl font-bold mb-6">📥 Student Doubts</h2>

      {doubts.length === 0 ? (
        <p>No doubts assigned to you yet.</p>
      ) : (
        <div className="space-y-4">
          {doubts.map((doubt) => (
            <div
              key={doubt.id}
              className="p-4 rounded-xl border hover:shadow-md cursor-pointer
                transition-all duration-300 bg-gray-100 dark:bg-gray-800"
              onClick={() => setSelectedDoubt(doubt)}
            >
              <div className="font-semibold">{doubt.studentName} • {doubt.subject}</div>
              <div className="text-sm mt-1 text-gray-600 dark:text-gray-300">{doubt.doubt}</div>
            </div>
          ))}
        </div>
      )}

      {/* Chat Modal */}
      <Dialog open={!!selectedDoubt} onClose={() => setSelectedDoubt(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl text-gray-900 dark:text-white">
            <Dialog.Title className="text-xl font-bold mb-4">
              Chat with {selectedDoubt?.studentName}
            </Dialog.Title>

            <div className="h-64 overflow-y-auto border rounded-lg p-3 space-y-2 mb-4">
              {selectedDoubt?.messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'student' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`px-3 py-2 rounded-lg max-w-xs whitespace-pre-wrap ${
                    msg.sender === 'student' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                  }`}>
                    {msg.type === 'file' ? (
                      <div>
                        📎 <a href="#" className="underline">{msg.text}</a>
                      </div>
                    ) : (
                      msg.text
                    )}
                    <div className="text-xs mt-1 text-gray-200 dark:text-gray-300 text-right">
                      {formatTimestamp(msg.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleReply} className="flex flex-col gap-2">
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write your reply..."
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
              />
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                className="mt-1"
              />
              {fileUploads.length > 0 && (
                <div className="text-sm mt-1">
                  <strong>Files to send:</strong>
                  <ul className="list-disc list-inside">
                    {fileUploads.map((file, i) => (
                      <li key={i}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-2 self-end"
              >
                Reply
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default SeeStudentDoubts;
