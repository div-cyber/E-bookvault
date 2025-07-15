import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Library from './pages/Library';
import BookDetail from './pages/BookDetail';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Chat from './pages/Chat';

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <Router>
          <div className="min-h-screen bg-dark-950 text-white">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/library" element={<Library />} />
                <Route path="/book/:id" element={<BookDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chat" element={<Chat />} />
                {/* Add more routes as needed */}
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;