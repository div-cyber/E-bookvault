import React from 'react';
import { Filter, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchFiltersProps {
  isOpen: boolean;
  onToggle: () => void;
  filters: {
    category: string;
    rating: number;
    language: string;
    sortBy: string;
  };
  onFilterChange: (filters: any) => void;
}

const categories = [
  'All Categories',
  'Programming',
  'Design',
  'Technology',
  'Business',
  'Psychology',
  'Science',
  'Fiction',
  'Non-Fiction'
];

const languages = ['All Languages', 'English', 'Spanish', 'French', 'German', 'Chinese'];
const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'downloads', label: 'Most Downloaded' },
  { value: 'newest', label: 'Newest First' },
  { value: 'title', label: 'Title A-Z' }
];

const SearchFilters: React.FC<SearchFiltersProps> = ({
  isOpen,
  onToggle,
  filters,
  onFilterChange
}) => {
  const handleFilterChange = (key: string, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      category: 'all',
      rating: 0,
      language: 'all',
      sortBy: 'relevance'
    });
  };

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white hover:bg-dark-700 transition-colors duration-200"
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
      </button>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-12 left-0 w-80 bg-dark-800 border border-dark-600 rounded-lg shadow-xl z-10 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Filters</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearFilters}
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors duration-200"
                >
                  Clear All
                </button>
                <button
                  onClick={onToggle}
                  className="text-dark-400 hover:text-white transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category.toLowerCase().replace(' ', '')}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Minimum Rating
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleFilterChange('rating', rating === filters.rating ? 0 : rating)}
                      className={`p-1 rounded transition-colors duration-200 ${
                        rating <= filters.rating
                          ? 'text-gold-400'
                          : 'text-dark-500 hover:text-dark-300'
                      }`}
                    >
                      <Star className="h-5 w-5 fill-current" />
                    </button>
                  ))}
                  <span className="text-sm text-dark-400 ml-2">
                    {filters.rating > 0 ? `${filters.rating}+ stars` : 'Any rating'}
                  </span>
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Language
                </label>
                <select
                  value={filters.language}
                  onChange={(e) => handleFilterChange('language', e.target.value)}
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  {languages.map((language) => (
                    <option key={language} value={language.toLowerCase().replace(' ', '')}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchFilters;