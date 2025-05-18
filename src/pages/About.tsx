import Layout from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-dawam-dark-purple dark:text-white">
            About DAWAM
          </h1>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-dawam-purple">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              At DAWAM, our mission is to bridge the gap between talented
              professionals and quality employment opportunities. We believe
              that finding the right job should be a straightforward and
              rewarding experience for everyone.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We're dedicated to creating a platform that empowers job seekers
              to discover roles that match their skills and ambitions, while
              helping employers find the perfect candidates to grow their teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4 text-dawam-purple">
                Our Story
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                DAWAM was founded in 2023 by a team of HR professionals and tech
                enthusiasts who recognized the need for a more efficient and
                user-friendly job marketplace. Having experienced the challenges
                of recruitment firsthand, our founders set out to create a
                platform that simplifies the job search and hiring process.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                Since then, we've grown to become a trusted resource for job
                seekers and employers alike, connecting thousands of
                professionals with their dream jobs across various industries.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4 text-dawam-purple">
                Our Values
              </h2>
              <ul className="text-gray-700 dark:text-gray-300 space-y-3">
                <li className="flex items-start">
                  <div className="min-w-[24px] h-6 mr-2 text-dawam-purple">
                    •
                  </div>
                  <span>
                    <strong className="text-dawam-purple">Transparency:</strong>{" "}
                    We believe in honest communication between employers and job
                    seekers.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[24px] h-6 mr-2 text-dawam-purple">
                    •
                  </div>
                  <span>
                    <strong className="text-dawam-purple">Quality:</strong> We
                    prioritize meaningful connections over quantity.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[24px] h-6 mr-2 text-dawam-purple">
                    •
                  </div>
                  <span>
                    <strong className="text-dawam-purple">Inclusivity:</strong>{" "}
                    We're committed to creating equal opportunities for all
                    professionals.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[24px] h-6 mr-2 text-dawam-purple">
                    •
                  </div>
                  <span>
                    <strong className="text-dawam-purple">Innovation:</strong>{" "}
                    We continuously improve our platform to better serve our
                    users.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-dawam-purple">
              The Team Behind DAWAM
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    alt="CEO"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg text-dawam-dark-purple dark:text-white">
                  John Smith
                </h3>
                <p className="text-dawam-purple">CEO & Co-founder</p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                    alt="COO"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg text-dawam-dark-purple dark:text-white">
                  Sarah Johnson
                </h3>
                <p className="text-dawam-purple">COO & Co-founder</p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                    alt="CTO"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg text-dawam-dark-purple dark:text-white">
                  Michael Chen
                </h3>
                <p className="text-dawam-purple">CTO & Co-founder</p>
              </div>
            </div>
          </div>

          <div className="bg-dawam-purple text-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Join DAWAM Today</h2>
            <p className="text-lg mb-6">
              Whether you're looking for your next career opportunity or
              searching for top talent, DAWAM is here to help you succeed.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/signup"
                className="bg-white text-dawam-purple px-6 py-2 rounded-md hover:bg-gray-100 transition"
              >
                Sign Up Now
              </a>
              <a
                href="/contact"
                className="border border-white px-6 py-2 rounded-md hover:bg-white/10 transition"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
