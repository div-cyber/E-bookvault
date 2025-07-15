import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, BookOpen, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!acceptTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(username, email, password);
      if (success) {
        toast.success('Account created successfully!');
        navigate('/');
      } else {
        toast.error('Registration failed');
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
  };

  const isPasswordStrong = Object.values(passwordStrength).every(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 flex items-center justify-center px-4 py-8">
      <Toaster position="top-right" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-gold-500 rounded-xl">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-serif font-bold bg-gradient-to-r from-purple-400 to-gold-400 bg-clip-text text-transparent">
              ReadVault
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-dark-400">Join our community of passionate readers</p>
        </div>

        {/* Form */}
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-700/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 pr-12"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Password Strength */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="text-xs text-dark-400">Password strength:</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className={`flex items-center space-x-1 ${passwordStrength.length ? 'text-green-400' : 'text-dark-500'}`}>
                      <Check className={`h-3 w-3 ${passwordStrength.length ? 'opacity-100' : 'opacity-30'}`} />
                      <span>8+ characters</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${passwordStrength.lowercase ? 'text-green-400' : 'text-dark-500'}`}>
                      <Check className={`h-3 w-3 ${passwordStrength.lowercase ? 'opacity-100' : 'opacity-30'}`} />
                      <span>Lowercase</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${passwordStrength.uppercase ? 'text-green-400' : 'text-dark-500'}`}>
                      <Check className={`h-3 w-3 ${passwordStrength.uppercase ? 'opacity-100' : 'opacity-30'}`} />
                      <span>Uppercase</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${passwordStrength.number ? 'text-green-400' : 'text-dark-500'}`}>
                      <Check className={`h-3 w-3 ${passwordStrength.number ? 'opacity-100' : 'opacity-30'}`} />
                      <span>Number</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 pr-12"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400 hover:text-white transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 rounded border-dark-600 text-purple-600 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              />
              <label htmlFor="terms" className="text-sm text-dark-300">
                I agree to the{' '}
                <Link to="/terms" className="text-purple-400 hover:text-purple-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-purple-400 hover:text-purple-300">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !isPasswordStrong || !acceptTerms}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-gold-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-dark-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-purple-400 hover:text-purple-300 transition-colors duration-200 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;