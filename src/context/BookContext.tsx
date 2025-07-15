import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, Review } from '../types';

interface BookContextType {
  books: Book[];
  reviews: Review[];
  addToFavorites: (bookId: string) => void;
  removeFromFavorites: (bookId: string) => void;
  addToWatchlist: (bookId: string) => void;
  removeFromWatchlist: (bookId: string) => void;
  addReview: (review: Omit<Review, 'id' | 'timestamp'>) => void;
  getBookById: (id: string) => Book | undefined;
  getBooksByCategory: (category: string) => Book[];
  searchBooks: (query: string, filters?: any) => Book[];
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

// Mock data
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Art of Clean Code',
    author: 'Robert C. Martin',
    description: 'A comprehensive guide to writing clean, maintainable code that stands the test of time.',
    coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300',
    pdfUrl: '/sample.pdf',
    category: 'Programming',
    tags: ['Software Development', 'Best Practices', 'Clean Code'],
    publishedDate: '2023-01-15',
    pages: 350,
    rating: 4.8,
    totalRatings: 1247,
    downloads: 15623,
    language: 'English',
    fileSize: '12.5 MB'
  },
  {
    id: '2',
    title: 'Digital Design Principles',
    author: 'Sarah Johnson',
    description: 'Master the fundamentals of digital design with modern techniques and best practices.',
    coverUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300',
    pdfUrl: '/sample.pdf',
    category: 'Design',
    tags: ['UI/UX', 'Design Systems', 'Typography'],
    publishedDate: '2023-02-20',
    pages: 280,
    rating: 4.6,
    totalRatings: 892,
    downloads: 9534,
    language: 'English',
    fileSize: '18.2 MB'
  },
  {
    id: '3',
    title: 'Machine Learning Fundamentals',
    author: 'Dr. Michael Chen',
    description: 'An accessible introduction to machine learning concepts and practical applications.',
    coverUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300',
    pdfUrl: '/sample.pdf',
    category: 'Technology',
    tags: ['AI', 'Data Science', 'Python'],
    publishedDate: '2023-03-10',
    pages: 420,
    rating: 4.9,
    totalRatings: 2156,
    downloads: 23847,
    language: 'English',
    fileSize: '25.7 MB'
  },
  {
    id: '4',
    title: 'Modern JavaScript Mastery',
    author: 'Alex Rodriguez',
    description: 'Deep dive into modern JavaScript features, frameworks, and development patterns.',
    coverUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300',
    pdfUrl: '/sample.pdf',
    category: 'Programming',
    tags: ['JavaScript', 'Web Development', 'ES6+'],
    publishedDate: '2023-04-05',
    pages: 380,
    rating: 4.7,
    totalRatings: 1583,
    downloads: 18932,
    language: 'English',
    fileSize: '16.8 MB'
  },
  {
    id: '5',
    title: 'Entrepreneurship in the Digital Age',
    author: 'Emma Thompson',
    description: 'Navigate the modern business landscape with proven strategies for digital entrepreneurs.',
    coverUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300',
    pdfUrl: '/sample.pdf',
    category: 'Business',
    tags: ['Startup', 'Digital Marketing', 'Strategy'],
    publishedDate: '2023-05-12',
    pages: 320,
    rating: 4.5,
    totalRatings: 743,
    downloads: 6234,
    language: 'English',
    fileSize: '14.3 MB'
  },
  {
    id: '6',
    title: 'The Psychology of User Experience',
    author: 'Dr. Lisa Wang',
    description: 'Understanding human behavior to create better digital experiences and interfaces.',
    coverUrl: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=300',
    pdfUrl: '/sample.pdf',
    category: 'Psychology',
    tags: ['UX Research', 'Cognitive Science', 'Design Psychology'],
    publishedDate: '2023-06-18',
    pages: 290,
    rating: 4.8,
    totalRatings: 967,
    downloads: 11245,
    language: 'English',
    fileSize: '13.9 MB'
  }
];

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books] = useState<Book[]>(mockBooks);
  const [reviews, setReviews] = useState<Review[]>([]);

  const addToFavorites = (bookId: string) => {
    // In a real app, this would make an API call
    console.log('Added to favorites:', bookId);
  };

  const removeFromFavorites = (bookId: string) => {
    console.log('Removed from favorites:', bookId);
  };

  const addToWatchlist = (bookId: string) => {
    console.log('Added to watchlist:', bookId);
  };

  const removeFromWatchlist = (bookId: string) => {
    console.log('Removed from watchlist:', bookId);
  };

  const addReview = (review: Omit<Review, 'id' | 'timestamp'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    setReviews(prev => [...prev, newReview]);
  };

  const getBookById = (id: string) => {
    return books.find(book => book.id === id);
  };

  const getBooksByCategory = (category: string) => {
    return books.filter(book => book.category === category);
  };

  const searchBooks = (query: string, filters?: any) => {
    let filtered = books;

    if (query) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    if (filters?.category && filters.category !== 'all') {
      filtered = filtered.filter(book => book.category === filters.category);
    }

    if (filters?.rating) {
      filtered = filtered.filter(book => book.rating >= filters.rating);
    }

    return filtered;
  };

  return (
    <BookContext.Provider value={{
      books,
      reviews,
      addToFavorites,
      removeFromFavorites,
      addToWatchlist,
      removeFromWatchlist,
      addReview,
      getBookById,
      getBooksByCategory,
      searchBooks
    }}>
      {children}
    </BookContext.Provider>
  );
};