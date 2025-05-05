import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-dawam-dark-purple dark:text-white">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            DAWAM offers comprehensive solutions for both job seekers and
            employers to streamline the recruitment process.
          </p>
        </div>

        {/* Services for Job Seekers */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center text-dawam-purple">
            For Job Seekers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-dawam-purple/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-dawam-purple"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4 text-dawam-dark-purple dark:text-white">
                Job Search
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                Access thousands of job listings with powerful search filters to
                find your perfect match.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check size={20} className="text-dawam-purple mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Advanced filtering options
                  </span>
                </li>
                <li className="flex items-center">
                  <Check size={20} className="text-dawam-purple mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Personalized job recommendations
                  </span>
                </li>
                <li className="flex items-center">
                  <Check size={20} className="text-dawam-purple mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Email alerts for new opportunities
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-dawam-purple/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-dawam-purple"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4 text-dawam-dark-purple dark:text-white">
                Profile Management
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                Create a comprehensive profile to showcase your skills and
                experience to potential employers.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check size={20} className="text-dawam-purple mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Professional profile builder
                  </span>
                </li>
                <li className="flex items-center">
                  <Check size={20} className="text-dawam-purple mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    CV/Resume upload
                  </span>
                </li>
                <li className="flex items-center">
                  <Check size={20} className="text-dawam-purple mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Skills assessment
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-dawam-purple/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-dawam-purple"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4 text-dawam-dark-purple dark:text-white">
                Application Management
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                Apply for jobs with a single click and track your application
                status throughout the hiring process.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check size={20} className="text-dawam-purple mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    One-click applications
                  </span>
                </li>
                <li className="flex items-center">
                  <Check size={20} className="text-dawam-purple mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Application status tracking
                  </span>
                </li>
                <li className="flex items-center">
                  <Check size={20} className="text-dawam-purple mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Interview scheduling
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Services for Employers */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center text-dawam-purple">
            For Employers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-dawam-purple/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-dawam-purple"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4 text-dawam-dark-purple dark:text-white">
                Job Posting
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                Create and manage job listings with a user-friendly interface
                that reaches qualified candidates.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check size={20} className="text-dawam-purple mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Easy job creation
                  </span>
                </li>
                <li className="flex items-center">
                  <Check size={20} className="text-dawam-purple mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Targeted distribution
                  </span>
                </li>
                <li className="flex items-center">
                  <Check size={20} className="text-dawam-purple mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Job performance analytics
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-dawam-purple/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-dawam-purple"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4 text-dawam-dark-purple dark:text-white">
                Applicant Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                Streamline your hiring process with our comprehensive applicant
                tracking system.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check size={20} className="text-dawam-purple mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Centralized candidate management
                  </span>
                </li>
                <li className="flex items-center">
                  <Check size={20} className="text-dawam-purple mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Collaborative hiring tools
                  </span>
                </li>
                <li className="flex items-center">
                  <Check size={20} className="text-dawam-purple mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Automated workflow
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-dawam-purple/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-dawam-purple"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4 text-dawam-dark-purple dark:text-white">
                Analytics & Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                Gain valuable insights into your recruitment process with
                detailed analytics and reporting.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check size={20} className="text-dawam-purple mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Recruitment performance metrics
                  </span>
                </li>
                <li className="flex items-center">
                  <Check size={20} className="text-dawam-purple mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Candidate source tracking
                  </span>
                </li>
                <li className="flex items-center">
                  <Check size={20} className="text-dawam-purple mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Custom reporting tools
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-dawam-dark-purple dark:text-white">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of companies and job seekers who trust DAWAM for
            their recruitment needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button className="px-8 py-2 bg-dawam-purple hover:bg-secondary-purple text-white">
                Create Account
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                className="px-8 py-2 border-dawam-purple text-dawam-purple hover:bg-dawam-purple hover:text-white"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
