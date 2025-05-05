
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-dawam-dark-purple mt-auto py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-4">
            <Link to="/" className="text-2xl font-bold text-dawam-purple">
              DAWAM
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Your gateway to career opportunities and professional growth.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-dawam-purple dark:hover:text-dawam-purple transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-600 dark:text-gray-400 hover:text-dawam-purple dark:hover:text-dawam-purple transition">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-dawam-purple dark:hover:text-dawam-purple transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-dawam-purple dark:hover:text-dawam-purple transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-gray-600 dark:text-gray-400 hover:text-dawam-purple dark:hover:text-dawam-purple transition">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-dawam-purple dark:hover:text-dawam-purple transition">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-dawam-purple dark:hover:text-dawam-purple transition">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-dawam-purple dark:hover:text-dawam-purple transition">
                  Our Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400">
                Email: info@dawam.com
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                Phone: +1 (123) 456-7890
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                Address: 123 Career St, Employment City
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} DAWAM. All rights reserved.
            </p>
            <div className="flex space-x-4 items-center">
              <Link to="/privacy-policy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-dawam-purple dark:hover:text-dawam-purple transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-dawam-purple dark:hover:text-dawam-purple transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
