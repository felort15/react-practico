import { FC, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';

interface UserCredentials {
  email: string;
  password: string;
}

const SignIn: FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserCredentials>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  const { setIsAuthenticated } = useContext(ShoppingCartContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Get registered users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === formData.email);

    // Check if user exists and password matches
    if (!user || user.password !== formData.password) {
      setError('Invalid email or password');
      return;
    }

    // Store credentials in localStorage
    localStorage.setItem('userCredentials', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
    
    // Update authentication state
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
    <div className="fixed inset-0 flex flex-col justify-between bg-white dark:bg-gray-800">
      <div className="flex items-center justify-center flex-1 px-4">
        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Sign In</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Enter your email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
              Don't have an account yet?
            </p>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>

      <footer className="w-full py-6 px-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">About</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/about" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/privacy-policy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Help</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/faq" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Shopi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignIn;
    