import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaPlayCircle, FaQuestionCircle } from 'react-icons/fa';
import Navbar from '../Navbar';
import PDFViewer from '../PDFViewer';
import VideoPlayer from '../VideoPlayer';
import STEMQuiz from './STEMQuiz';
import Sidebar from './Sidebar';

const resources = [
  {
    id: 1,
    type: 'ebook',
    title: 'What is STEM? - eBook',
    icon: <FaFileAlt className="text-xl text-blue-600" />,
    file: '/pdfs/what-is-stem.pdf',
  },
  {
    id: 2,
    type: 'video',
    title: 'What is STEM? - Video',
    icon: <FaPlayCircle className="text-xl text-cyan-500" />,
    videoList: [
      {
        id: 'dQw4w9WgXcQ',
        title: 'STEM Introduction',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg',
      },
      {
        id: 'Dvi0OmdMJi0',
        title: 'What is STEM Education?',
        thumbnail: 'https://img.youtube.com/vi/Dvi0OmdMJi0/0.jpg',
      },
      {
        id: '5GWhwUN9iaY',
        title: 'STEM Learning: Inspiring the Next Generation',
        thumbnail: 'https://img.youtube.com/vi/5GWhwUN9iaY/0.jpg',
      },
    ],
  },
  {
    id: 3,
    type: 'quiz',
    title: 'Quiz: What is STEM?',
    icon: <FaQuestionCircle className="text-xl text-purple-600" />,
  },
];

const SessionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [currentPDF, setCurrentPDF] = useState(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [showEbookViewer, setShowEbookViewer] = useState(false);
  const [currentVideoList, setCurrentVideoList] = useState([]);
  const [currentEbook, setCurrentEbook] = useState(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleResourceClick = (res) => {
    if (res.type === 'ebook') {
      setCurrentEbook(res.file);
      setShowEbookViewer(true);
      setShowVideoPlayer(false);
    }
    if (res.type === 'video') {
      setCurrentVideoList(res.videoList);
      setShowVideoPlayer(true);
      setShowEbookViewer(false);
    }
    if (res.type === 'quiz') {
      navigate(`/course/${id}/quiz`);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="flex max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 gap-6">
        <Sidebar darkMode={darkMode}  />

        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-1 text-indigo-600 dark:text-yellow-400">Session {id}: STEM Introduction</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Kit Name: <span className="font-semibold">STEM/Robotics Introduction</span><br />
              Activity Name: <span className="font-semibold">STEM/Robotics Introduction</span>
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {resources.map((res) => (
              <div
                key={res.id}
                className={`flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:bg-blue-50 dark:hover:bg-gray-700 transition cursor-pointer`}
                onClick={() => handleResourceClick(res)}
              >
                <div className="flex items-center space-x-4">
                  {res.icon}
                  <span className="text-sm font-medium dark:text-white">{res.title}</span>
                </div>
                <div className="text-sm text-gray-400 dark:text-gray-300">Completion ▼</div>
              </div>
            ))}
          </div>

          <div className={`p-6 rounded-xl border ${darkMode ? 'bg-green-900/30 text-green-300 border-green-700' : 'bg-green-50 text-green-700 border-green-200'}`}>
            <h3 className="text-lg font-semibold mb-2">Activity</h3>
            <p className="text-sm">
              In this session, students will explore the concept of STEM through an introductory activity that encourages observation, discussion, and curiosity about science and technology in daily life.
            </p>
          </div>
        </div>
      </div>

      {showPDF && currentPDF && (
        <PDFViewer fileUrl={currentPDF} onClose={() => setShowPDF(false)} darkMode={darkMode} />
      )}
      {showVideoPlayer && currentVideoList.length > 0 && (
        <VideoPlayer videoList={currentVideoList} onClose={() => setShowVideoPlayer(false)} />
      )}
      {showEbookViewer && currentEbook && (
        <PDFViewer fileUrl={currentEbook} onClose={() => setShowEbookViewer(false)} darkMode={darkMode} />
      )}
    </div>
  );
};

export default SessionDetails;