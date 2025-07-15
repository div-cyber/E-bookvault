import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, Bookmark, MessageCircle, Menu, X, BookOpen, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-dark-900/95 backdrop-blur-sm border-b border-dark-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-gold-500 rounded-lg group-hover:shadow-lg transition-all duration-300">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-serif font-bold bg-gradient-to-r from-purple-400 to-gold-400 bg-clip-text text-transparent">
              ReadVault
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books, authors, categories..."
                className="w-full bg-dark-800/50 border border-dark-600 rounded-full py-2 pl-4 pr-12 text-white placeholder-dark-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-dark-400 hover:text-purple-400 transition-colors duration-200"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              to="/library"
              className="text-dark-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Library
            </Link>
            <Link
              to="/categories"
              className="text-dark-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Categories
            </Link>
            <Link
              to="/chat"
              className="text-dark-300 hover:text-white transition-colors duration-200 font-medium flex items-center space-x-1"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Community</span>
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/favorites"
                  className="p-2 text-dark-400 hover:text-red-400 transition-colors duration-200"
                >
                  <Heart className="h-5 w-5" />
                </Link>
                <Link
                  to="/watchlist"
                  className="p-2 text-dark-400 hover:text-gold-400 transition-colors duration-200"
                >
                  <Bookmark className="h-5 w-5" />
                </Link>
                
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-dark-800 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-gold-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden md:block text-white font-medium">{user.username}</span>
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-dark-800 rounded-lg shadow-xl border border-dark-700 py-2"
                      >
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-700 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-700 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        {user.isAdmin && (
                          <Link
                            to="/admin"
                            className="block px-4 py-2 text-purple-400 hover:text-purple-300 hover:bg-dark-700 transition-colors duration-200"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Admin Panel
                          </Link>
                        )}
                        <hr className="border-dark-700 my-2" />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-dark-700 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-dark-300 hover:text-white transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-gold-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-dark-400 hover:text-white transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books..."
              className="w-full bg-dark-800/50 border border-dark-600 rounded-full py-2 pl-4 pr-12 text-white placeholder-dark-400 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-dark-400 hover:text-purple-400"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-dark-800 border-t border-dark-700"
          >
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/library"
                className="block text-dark-300 hover:text-white transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Library
              </Link>
              <Link
                to="/categories"
                className="block text-dark-300 hover:text-white transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/chat"
                className="block text-dark-300 hover:text-white transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Community Chat
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;