import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Send, Search, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { sampleMentors } from '../data/sampleData';

interface Thread {
  id: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
}

interface Message {
  id: string;
  from: 'me' | 'them';
  body: string;
  timestamp: Date;
}

const sampleThreads: Thread[] = [
  {
    id: '1',
    participantName: 'Dr. Sarah Johnson',
    participantAvatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage: 'Happy to help with your JavaScript questions!',
    timestamp: new Date(2025, 0, 4, 14, 30),
    unread: true,
  },
  {
    id: '2',
    participantName: 'Prof. Ahmed Ali',
    participantAvatar: 'https://i.pravatar.cc/150?img=12',
    lastMessage: 'The React course starts next Monday',
    timestamp: new Date(2025, 0, 3, 9, 15),
    unread: false,
  },
];

const sampleMessages: Message[] = [
  { id: '1', from: 'them', body: 'Hi! How can I help you today?', timestamp: new Date(2025, 0, 4, 14, 0) },
  { id: '2', from: 'me', body: 'I have a question about the async/await lesson', timestamp: new Date(2025, 0, 4, 14, 5) },
  { id: '3', from: 'them', body: 'Happy to help with your JavaScript questions!', timestamp: new Date(2025, 0, 4, 14, 30) },
];

export default function MessagesPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const [threads, setThreads] = useState<Thread[]>(sampleThreads);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(sampleThreads[0]);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState('');

  // Handle navigation from mentor page
  useEffect(() => {
    const state = location.state as { mentorId?: string; mentorName?: string } | null;
    
    if (state?.mentorId && state?.mentorName) {
      // Find mentor details
      const mentor = sampleMentors.find(m => m.id === state.mentorId);
      
      // Check if thread already exists
      let existingThread = threads.find(t => t.participantName === state.mentorName);
      
      if (!existingThread && mentor) {
        // Create new thread for this mentor
        const newThread: Thread = {
          id: state.mentorId,
          participantName: state.mentorName,
          participantAvatar: mentor.avatar,
          lastMessage: 'Start a conversation with your mentor',
          timestamp: new Date(),
          unread: false,
        };
        
        setThreads(prev => [newThread, ...prev]);
        setSelectedThread(newThread);
        setMessages([]);
      } else if (existingThread) {
        setSelectedThread(existingThread);
      }
    }
  }, [location.state]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      from: 'me',
      body: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
        >
          {t('messages.title')}
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('common.search')}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {threads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => setSelectedThread(thread)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 ${
                    selectedThread?.id === thread.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <img
                    src={thread.participantAvatar}
                    alt={thread.participantName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {thread.participantName}
                      </h3>
                      {thread.unread && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {thread.lastMessage}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {thread.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col"
          >
            {selectedThread ? (
              <>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedThread.participantAvatar}
                      alt={selectedThread.participantName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="font-semibold text-gray-900 dark:text-white">
                        {selectedThread.participantName}
                      </h2>
                      <p className="text-sm text-gray-500">Online</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.from === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.from === 'me'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        <p className="text-sm">{message.body}</p>
                        <p className={`text-xs mt-1 ${message.from === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={t('messages.typeMessage')}
                      className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                      aria-label={t('messages.send')}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <p>{t('messages.noMessages')}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
