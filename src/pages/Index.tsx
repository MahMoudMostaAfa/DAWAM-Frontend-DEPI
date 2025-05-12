import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { jobs } from "@/utils/mockData";
import Layout from "@/components/layout/Layout";
import JobCard from "@/components/jobs/JobCard";
import { useJobs } from "@/components/jobs/useJobs";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/context/authContext";

const Index = () => {
  // Displaying only latest 3 jobs on homepage
  const { isLoading, user } = useAuth();
  const { isPending, jobs } = useJobs();
  if (isPending) return <Spinner />;
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-100 dark:from-dawam-dark-purple dark:to-gray-900 py-20 px-4 h-[calc(100vh-60px)] flex items-center justify-center">
        <div className="container  mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dawam-dark-purple dark:text-white">
            Find Your{" "}
            <span className="bg-gradient-to-r from-dawam-purple to-blue-900 text-transparent bg-clip-text">
              Dream Job
            </span>{" "}
            Today
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Your gateway to career opportunities and professional growth. Browse
            thousands of jobs and apply with a single click.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/jobs">
              <Button className="text-lg px-8 py-6 bg-dawam-purple hover:bg-secondary-purple text-white">
                Browse Jobs
              </Button>
            </Link>
            {!user && !isLoading && (
              <Link to="/signup">
                <Button
                  variant="outline"
                  className="text-lg px-8 py-6 border-dawam-purple text-dawam-purple hover:bg-dawam-purple hover:text-white"
                >
                  Create Account
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dawam-dark-purple dark:text-white">
              Featured Jobs
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our latest job opportunities across various industries and
              career levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.slice(0, 3).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/jobs">
              <Button
                variant="outline"
                className="border-dawam-purple text-dawam-purple hover:bg-dawam-purple hover:text-white"
              >
                View All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dawam-dark-purple dark:text-white">
              How It Works
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              DAWAM makes it easy to find and apply for your dream job in just a
              few steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-dawam-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dawam-dark-purple dark:text-white">
                Create an Account
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sign up with your email to create a profile showcasing your
                skills and experience.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-dawam-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dawam-dark-purple dark:text-white">
                Find Jobs
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Browse through various job listings and use filters to find your
                perfect match.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-dawam-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dawam-dark-purple dark:text-white">
                Apply & Get Hired
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Submit your application with just a few clicks and track your
                application status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-dawam-purple text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Take the Next Step in Your Career?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of job seekers who have found their dream jobs
            through DAWAM.
          </p>
          <Link to="/signup">
            <Button className="bg-white text-dawam-purple hover:bg-gray-100 hover:text-dawam-purple text-lg px-8 py-6">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
