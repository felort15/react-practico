import { FC, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import Layout from '../../Components/Layout';   

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

const Register: FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState<string>('');
  const { setIsAuthenticated } = useContext(ShoppingCartContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.name) {
      setError('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Get existing users or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if email already exists
    if (existingUsers.some((user: any) => user.email === formData.email)) {
      setError('Email already registered');
      return;
    }

    // Add new user
    const newUser = {
      email: formData.email,
      password: formData.password,
      name: formData.name
    };
    
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Auto login after registration
    localStorage.setItem('userCredentials', JSON.stringify(newUser));
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);

    // Redirect to home page
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Layout>
      <div className="min-h-screen pt-20 flex items-center justify-center bg-white dark:bg-gray-800">
        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md mx-4">
          <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Create Account</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium dark:text-white">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="John Doe"
                required
                autoComplete="name"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Enter your full name as it appears on official documents
              </p>
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium dark:text-white">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="john@example.com"
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                required
                autoComplete="username"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Enter a valid email address (e.g., name@example.com)
              </p>
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium dark:text-white">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="••••••••"
                minLength={6}
                required
                autoComplete="new-password"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Password must be at least 6 characters long
              </p>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium dark:text-white">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="••••••••"
                minLength={6}
                required
                autoComplete="new-password"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Re-enter your password to confirm
              </p>
            </div>
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-sm font-medium mb-2 dark:text-white">Password Requirements:</h3>
              <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>Minimum 6 characters long</li>
                <li>Both passwords must match</li>
              </ul>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors mt-4"
            >
              Create Account
            </button>
            <div className="text-center text-sm dark:text-white">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/sign-in')}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register; 