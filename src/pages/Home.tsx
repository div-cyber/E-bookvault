import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Download, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooks } from '../context/BookContext';
import BookCard from '../components/Books/BookCard';

const Home: React.FC = () => {
  const { books } = useBooks();
  const featuredBooks = books.slice(0, 6);
  const topRatedBooks = books.sort((a, b) => b.rating - a.rating).slice(0, 4);

  const stats = [
    { icon: BookOpen, label: 'Books Available', value: '50,000+' },
    { icon: Users, label: 'Active Readers', value: '125K+' },
    { icon: Download, label: 'Downloads', value: '2M+' },
    { icon: Star, label: 'Average Rating', value: '4.8' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-gold-900/20" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6"
            >
              Your Gateway to
              <span className="bg-gradient-to-r from-purple-400 to-gold-400 bg-clip-text text-transparent">
                {' '}Infinite Knowledge
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-dark-300 mb-8 leading-relaxed"
            >
              Discover, read, and share thousands of premium ebooks. Join our community of passionate readers
              and unlock your potential through the power of knowledge.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/library"
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-gold-500 text-white rounded-full font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Explore Library</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <Link
                to="/register"
                className="px-8 py-4 border border-purple-500 text-purple-300 rounded-full font-semibold hover:bg-purple-500/10 transition-all duration-300"
              >
                Join Community
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-float" />
        <div className="absolute top-1/3 right-10 w-32 h-32 bg-gold-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-purple-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-dark-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600/20 to-gold-500/20 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-dark-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-white mb-2">Featured Books</h2>
              <p className="text-dark-400">Handpicked selections from our curated collection</p>
            </div>
            <Link
              to="/library"
              className="text-purple-400 hover:text-purple-300 transition-colors duration-200 flex items-center space-x-2"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
            {featuredBooks.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="py-20 bg-dark-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-white mb-2 flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-gold-400" />
                <span>Top Rated</span>
              </h2>
              <p className="text-dark-400">Highest rated books by our community</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRatedBooks.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-900/20 to-gold-900/20 rounded-2xl p-12 text-center backdrop-blur-sm border border-purple-500/20">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              Ready to Start Your Reading Journey?
            </h2>
            <p className="text-dark-300 mb-8 max-w-2xl mx-auto">
              Join thousands of readers who have already discovered their next favorite book. 
              Create your account today and get access to our entire library.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-gold-500 text-white rounded-full font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;