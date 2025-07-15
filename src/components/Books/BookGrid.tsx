import React from 'react';
import { Book } from '../../types';
import BookCard from './BookCard';

interface BookGridProps {
  books: Book[];
  loading?: boolean;
}

const BookGrid: React.FC<BookGridProps> = ({ books, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-dark-800/50 rounded-xl overflow-hidden">
              <div className="aspect-[3/4] bg-dark-700" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-dark-700 rounded w-3/4" />
                <div className="h-3 bg-dark-700 rounded w-1/2" />
                <div className="h-3 bg-dark-700 rounded w-full" />
                <div className="h-3 bg-dark-700 rounded w-2/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-dark-400 text-lg mb-2">No books found</div>
        <p className="text-dark-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {books.map((book, index) => (
        <BookCard key={book.id} book={book} index={index} />
      ))}
    </div>
  );
};

export default BookGrid;