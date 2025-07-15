import React, { useState, useRef, useEffect } from 'react';
import { Send, Users, BookOpen, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { ChatMessage } from '../types';
import toast, { Toaster } from 'react-hot-toast';

const Chat: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      userId: 'system',
      username: 'ReadVault Bot',
      message: 'Welcome to the ReadVault community chat! Share your thoughts about books, ask for recommendations, and connect with fellow readers.',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      userId: '2',
      username: 'BookLover123',
      message: 'Just finished "The Art of Clean Code" - absolutely brilliant! Anyone else read it?',
      timestamp: new Date(Date.now() - 300000).toISOString(),
    },
    {
      id: '3',
      userId: '3',
      username: 'TechReader',
      message: 'Yes! Robert Martin is a genius. His principles have really improved my coding.',
      timestamp: new Date(Date.now() - 250000).toISOString(),
    },
    {
      id: '4',
      userId: '4',
      username: 'DesignEnthusiast',
      message: 'Has anyone checked out "Digital Design Principles"? Looking for good design books.',
      timestamp: new Date(Date.now() - 180000).toISOString(),
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers] = useState(42);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to send messages');
      return;
    }
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-gold-500 rounded-xl">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold text-white">Community Chat</h1>
                <p className="text-dark-400">Connect with fellow book enthusiasts</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-dark-800/50 px-4 py-2 rounded-full border border-dark-700/50">
              <Users className="h-4 w-4 text-green-400" />
              <span className="text-white font-medium">{onlineUsers}</span>
              <span className="text-dark-400">online</span>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-700/50 overflow-hidden">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start space-x-3 ${
                    message.userId === user?.id ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.userId !== user?.id && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-gold-500 rounded-full flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                  
                  <div className={`max-w-xs lg:max-w-md ${
                    message.userId === user?.id ? 'order-first' : ''
                  }`}>
                    {message.userId !== user?.id && (
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`text-sm font-medium ${
                          message.userId === 'system' 
                            ? 'text-purple-400' 
                            : 'text-white'
                        }`}>
                          {message.username}
                        </span>
                        <span className="text-xs text-dark-500">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    )}
                    
                    <div className={`rounded-lg px-4 py-2 ${
                      message.userId === user?.id
                        ? 'bg-gradient-to-r from-purple-600 to-gold-500 text-white'
                        : message.userId === 'system'
                        ? 'bg-purple-900/30 border border-purple-700/50 text-purple-200'
                        : 'bg-dark-700 text-white'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      {message.userId === user?.id && (
                        <div className="text-xs text-purple-100 mt-1 text-right">
                          {formatTime(message.timestamp)}
                        </div>
                      )}
                    </div>
                  </div>

                  {message.userId === user?.id && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-r from-gold-500 to-purple-500 rounded-full flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-dark-700/50 p-4">
            {user ? (
              <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-3 bg-gradient-to-r from-purple-600 to-gold-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <p className="text-dark-400 mb-4">Please log in to join the conversation</p>
                <div className="space-x-4">
                  <a
                    href="/login"
                    className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                  >
                    Log In
                  </a>
                  <a
                    href="/register"
                    className="inline-block px-6 py-2 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-all duration-200"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Guidelines */}
        <div className="mt-8 bg-dark-800/30 rounded-xl border border-dark-700/30 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Community Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-dark-300">
            <div className="space-y-2">
              <p>• Be respectful and kind to all members</p>
              <p>• Stay on topic - focus on books and reading</p>
              <p>• No spam or promotional content</p>
            </div>
            <div className="space-y-2">
              <p>• Share book recommendations freely</p>
              <p>• Help newcomers feel welcome</p>
              <p>• Report inappropriate behavior</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;