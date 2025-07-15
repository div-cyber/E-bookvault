import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Twitter, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-950 border-t border-dark-800 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-gold-500 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-serif font-bold bg-gradient-to-r from-purple-400 to-gold-400 bg-clip-text text-transparent">
                ReadVault
              </span>
            </div>
            <p className="text-dark-400 leading-relaxed">
              Your premium digital library for discovering, reading, and sharing knowledge.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-dark-400 hover:text-purple-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-dark-400 hover:text-purple-400 transition-colors duration-200">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-dark-400 hover:text-purple-400 transition-colors duration-200">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/library" className="text-dark-400 hover:text-white transition-colors duration-200">
                  Browse Library
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-dark-400 hover:text-white transition-colors duration-200">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/featured" className="text-dark-400 hover:text-white transition-colors duration-200">
                  Featured Books
                </Link>
              </li>
              <li>
                <Link to="/new-releases" className="text-dark-400 hover:text-white transition-colors duration-200">
                  New Releases
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/chat" className="text-dark-400 hover:text-white transition-colors duration-200">
                  Discussion Forum
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-dark-400 hover:text-white transition-colors duration-200">
                  Book Reviews
                </Link>
              </li>
              <li>
                <Link to="/reading-lists" className="text-dark-400 hover:text-white transition-colors duration-200">
                  Reading Lists
                </Link>
              </li>
              <li>
                <Link to="/recommendations" className="text-dark-400 hover:text-white transition-colors duration-200">
                  Recommendations
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-dark-400 hover:text-white transition-colors duration-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-dark-400 hover:text-white transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-dark-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-dark-400 hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-dark-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-dark-400 text-sm">
            © 2024 ReadVault. All rights reserved.
          </p>
          <p className="text-dark-400 text-sm flex items-center space-x-1 mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for book lovers everywhere</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;