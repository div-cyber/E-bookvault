export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
  favorites: string[];
  watchlist: string[];
  readingHistory: ReadingProgress[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  pdfUrl: string;
  category: string;
  tags: string[];
  publishedDate: string;
  pages: number;
  rating: number;
  totalRatings: number;
  downloads: number;
  language: string;
  fileSize: string;
}

export interface ReadingProgress {
  bookId: string;
  currentPage: number;
  totalPages: number;
  lastRead: string;
  progress: number;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: string;
  avatar?: string;
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  timestamp: string;
}