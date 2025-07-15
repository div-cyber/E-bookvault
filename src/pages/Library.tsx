import React, { useState, useEffect } from 'react';
import { Grid, List, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooks } from '../context/BookContext';
import BookGrid from '../components/Books/BookGrid';
import SearchFilters from '../components/Search/SearchFilters';

const Library: React.FC = () => {
  const { books, searchBooks } = useBooks();
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    rating: 0,
    language: 'all',
    sortBy: 'relevance'
  });

  useEffect(() => {
    const filtered = searchBooks(searchQuery, filters);
    setFilteredBooks(filtered);
  }, [searchQuery, filters, books, searchBooks]);

  const categories = ['All', 'Programming', 'Design', 'Technology', 'Business', 'Psychology'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Digital Library</h1>
          <p className="text-dark-400">Discover your next great read from our collection</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search books, authors, categories..."
                  className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <SearchFilters
                isOpen={isFiltersOpen}
                onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
                filters={filters}
                onFilterChange={setFilters}
              />

              {/* View Mode */}
              <div className="flex items-center bg-dark-800 border border-dark-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-purple-600 text-white'
                      : 'text-dark-400 hover:text-white'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors duration-200 ${
                    viewMode === 'list'
                      ? 'bg-purple-600 text-white'
                      : 'text-dark-400 hover:text-white'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilters(prev => ({
                  ...prev,
                  category: category.toLowerCase() === 'all' ? 'all' : category.toLowerCase()
                }))}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  (category.toLowerCase() === 'all' && filters.category === 'all') ||
                  filters.category === category.toLowerCase()
                    ? 'bg-purple-600 text-white'
                    : 'bg-dark-800/50 text-dark-300 hover:bg-dark-700 hover:text-white border border-dark-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-dark-400">
            Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Books */}
        <BookGrid books={filteredBooks} />
      </div>
    </div>
  );
};

export default Library;