import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Heart, Bookmark, Share2, Star, Calendar, FileText, Globe, HardDrive, User, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooks } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBookById, reviews, addReview } = useBooks();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const book = getBookById(id!);

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Book not found</h2>
          <Link to="/library" className="text-purple-400 hover:text-purple-300">
            ← Back to Library
          </Link>
        </div>
      </div>
    );
  }

  const bookReviews = reviews.filter(review => review.bookId === book.id);

  const handleFavorite = () => {
    toast.success('Added to favorites!');
  };

  const handleWatchlist = () => {
    toast.success('Added to watchlist!');
  };

  const handleDownload = () => {
    toast.success('Download started!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to submit a review');
      return;
    }
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!reviewText.trim()) {
      toast.error('Please write a review');
      return;
    }

    addReview({
      bookId: book.id,
      userId: user.id,
      username: user.username,
      rating,
      comment: reviewText
    });

    setRating(0);
    setReviewText('');
    toast.success('Review submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/library"
          className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Library</span>
        </Link>

        {/* Book Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Book Cover */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="sticky top-8"
            >
              <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Book Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Category Badge */}
              <div>
                <span className="inline-block px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm font-medium">
                  {book.category}
                </span>
              </div>

              {/* Title and Author */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-2">
                  {book.title}
                </h1>
                <p className="text-xl text-dark-300 flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>by {book.author}</span>
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.floor(book.rating)
                          ? 'text-gold-400 fill-current'
                          : 'text-dark-500'
                      }`}
                    />
                  ))}
                  <span className="text-white font-semibold ml-2">{book.rating}</span>
                </div>
                <span className="text-dark-400">({book.totalRatings} reviews)</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700/50">
                  <div className="flex items-center space-x-2 text-dark-400 mb-1">
                    <FileText className="h-4 w-4" />
                    <span className="text-xs">Pages</span>
                  </div>
                  <div className="text-white font-semibold">{book.pages}</div>
                </div>
                <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700/50">
                  <div className="flex items-center space-x-2 text-dark-400 mb-1">
                    <Globe className="h-4 w-4" />
                    <span className="text-xs">Language</span>
                  </div>
                  <div className="text-white font-semibold">{book.language}</div>
                </div>
                <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700/50">
                  <div className="flex items-center space-x-2 text-dark-400 mb-1">
                    <HardDrive className="h-4 w-4" />
                    <span className="text-xs">Size</span>
                  </div>
                  <div className="text-white font-semibold">{book.fileSize}</div>
                </div>
                <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700/50">
                  <div className="flex items-center space-x-2 text-dark-400 mb-1">
                    <Download className="h-4 w-4" />
                    <span className="text-xs">Downloads</span>
                  </div>
                  <div className="text-white font-semibold">{book.downloads.toLocaleString()}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to={`/reader/${book.id}`}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-gold-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Read Now
                </Link>
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 bg-dark-800 border border-dark-600 text-white rounded-lg font-semibold hover:bg-dark-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
                {user && (
                  <>
                    <button
                      onClick={handleFavorite}
                      className="p-3 bg-dark-800 border border-dark-600 text-white rounded-lg hover:bg-dark-700 hover:text-red-400 transition-all duration-200"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleWatchlist}
                      className="p-3 bg-dark-800 border border-dark-600 text-white rounded-lg hover:bg-dark-700 hover:text-gold-400 transition-all duration-200"
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </>
                )}
                <button
                  onClick={handleShare}
                  className="p-3 bg-dark-800 border border-dark-600 text-white rounded-lg hover:bg-dark-700 hover:text-purple-400 transition-all duration-200"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-dark-700 mb-8">
          <nav className="flex space-x-8">
            {['overview', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-400'
                    : 'border-transparent text-dark-400 hover:text-white'
                }`}
              >
                {tab === 'overview' ? 'Overview' : `Reviews (${bookReviews.length})`}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
                <p className="text-dark-300 leading-relaxed">{book.description}</p>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-dark-800/50 border border-dark-600 text-dark-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Publication Info */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Publication Details</h3>
                <div className="bg-dark-800/50 rounded-lg p-6 border border-dark-700/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-purple-400" />
                      <span className="text-dark-400">Published:</span>
                      <span className="text-white">{new Date(book.publishedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Write Review */}
              {user && (
                <div className="bg-dark-800/50 rounded-lg p-6 border border-dark-700/50">
                  <h3 className="text-xl font-semibold text-white mb-4">Write a Review</h3>
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Rating</label>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={`p-1 transition-colors duration-200 ${
                              star <= rating
                                ? 'text-gold-400'
                                : 'text-dark-500 hover:text-dark-300'
                            }`}
                          >
                            <Star className="h-6 w-6 fill-current" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Review</label>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows={4}
                        className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white placeholder-dark-400 focus:outline-none focus:border-purple-500"
                        placeholder="Share your thoughts about this book..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-6">
                {bookReviews.length > 0 ? (
                  bookReviews.map((review) => (
                    <div key={review.id} className="bg-dark-800/50 rounded-lg p-6 border border-dark-700/50">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-white">{review.username}</h4>
                          <div className="flex items-center space-x-1 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating
                                    ? 'text-gold-400 fill-current'
                                    : 'text-dark-500'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-dark-400 text-sm">
                          {new Date(review.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-dark-300">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-dark-500 mx-auto mb-4" />
                    <p className="text-dark-400">No reviews yet. Be the first to review this book!</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;