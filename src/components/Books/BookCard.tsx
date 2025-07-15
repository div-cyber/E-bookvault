import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bookmark, Download, Star, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Book } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface BookCardProps {
  book: Book;
  index?: number;
}

const BookCard: React.FC<BookCardProps> = ({ book, index = 0 }) => {
  const { user } = useAuth();

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle favorite logic
  };

  const handleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle watchlist logic
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle download logic
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/book/${book.id}`}>
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-700/50 hover:border-purple-500/50 transition-all duration-300 overflow-hidden group-hover:shadow-xl group-hover:shadow-purple-500/10">
          {/* Cover Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {user && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleFavorite}
                    className="p-2 bg-dark-900/80 backdrop-blur-sm rounded-full text-dark-300 hover:text-red-400 transition-colors duration-200"
                  >
                    <Heart className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleWatchlist}
                    className="p-2 bg-dark-900/80 backdrop-blur-sm rounded-full text-dark-300 hover:text-gold-400 transition-colors duration-200"
                  >
                    <Bookmark className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDownload}
                    className="p-2 bg-dark-900/80 backdrop-blur-sm rounded-full text-dark-300 hover:text-green-400 transition-colors duration-200"
                  >
                    <Download className="h-4 w-4" />
                  </motion.button>
                </>
              )}
            </div>

            {/* Rating Badge */}
            <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-dark-900/80 backdrop-blur-sm rounded-full px-2 py-1">
              <Star className="h-3 w-3 text-gold-400 fill-current" />
              <span className="text-xs text-white font-medium">{book.rating}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="mb-2">
              <span className="text-xs font-medium text-purple-400 bg-purple-400/10 px-2 py-1 rounded-full">
                {book.category}
              </span>
            </div>
            
            <h3 className="font-semibold text-white mb-1 line-clamp-2 group-hover:text-purple-300 transition-colors duration-200">
              {book.title}
            </h3>
            
            <p className="text-dark-400 text-sm mb-3">by {book.author}</p>
            
            <p className="text-dark-300 text-xs line-clamp-2 mb-3">
              {book.description}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-dark-400">
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>{book.totalRatings}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download className="h-3 w-3" />
                <span>{book.downloads.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BookCard;