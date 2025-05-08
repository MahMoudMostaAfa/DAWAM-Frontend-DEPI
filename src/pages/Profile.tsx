import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProfileForm from "@/components/profile/ProfileForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Building, Clock, Briefcase, MapPin, Star, Bolt } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import Spinner from "@/components/ui/Spinner";
import { useQuery } from "@tanstack/react-query";
import { getApplications } from "@/services/applicationsServices";
import { ApplicationType } from "@/types/applicationType";
import { formatDistanceToNow } from "date-fns";
import { jobLevel, jobType } from "@/utils/DataMaps";
import { usePayments } from "@/components/auth/usePayment";

const Profile = () => {
  const { user, isLoading } = useAuth();
  const { mutate, isPending: isPaying } = usePayments();
  const {
    data: applications,
    isPending,
    isError,
  } = useQuery<ApplicationType[]>({
    queryKey: ["myApplications"],
    queryFn: getApplications,
    retry: false,
    enabled: !!user && user.roles[0] === "JobApplier",
  });

  if (isLoading || (isPending && user?.roles[0] === "JobApplier")) {
    return <Spinner />;
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check if user role is job seeker
  const isJobSeeker = user.roles[0] === "JobApplier";

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-dawam-dark-purple dark:text-white">
          Your Profile
        </h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            {isJobSeeker && (
              <>
                <TabsTrigger value="applications">My Applications</TabsTrigger>
                <TabsTrigger value="saved">My Saved Jobs</TabsTrigger>
                <TabsTrigger value="subscription">Subscription</TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent value="profile">
            <ProfileForm />
          </TabsContent>

          {isJobSeeker && (
            <>
              <TabsContent value="applications">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-6 text-dawam-dark-purple dark:text-white">
                    Your Job Applications
                  </h2>

                  {applications.length > 0 ? (
                    <div className="space-y-6">
                      {applications.map((app: ApplicationType) => (
                        <Card key={app.id} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="p-6">
                              <div className="flex flex-col md:flex-row justify-between mb-4">
                                <div>
                                  <h3 className="text-lg font-semibold text-dawam-dark-purple dark:text-white mb-1">
                                    {app.jobTitle}
                                  </h3>
                                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                    <Building size={14} className="mr-1" />
                                    <div>
                                      <span className="font-medium">
                                        Employer:
                                      </span>{" "}
                                      {app.posterName}
                                    </div>
                                    <Bolt size={14} className="mx-1" />
                                    <div>
                                      <span className="font-medium">
                                        job type :
                                      </span>
                                      {jobType[app.jobType]}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                <div className="flex items-start">
                                  <Briefcase size={14} className="mr-2 mt-1" />
                                  <div>
                                    <span className="font-medium">
                                      Career level:
                                    </span>{" "}
                                    {jobLevel[app.careerLevel]}
                                  </div>
                                </div>
                                <div className="flex items-start">
                                  <Clock size={14} className="mr-2 mt-1" />
                                  <div>
                                    <span className="font-medium">
                                      Applied:
                                    </span>{" "}
                                    {formatDistanceToNow(
                                      new Date(app.appliedAt),
                                      {
                                        addSuffix: true,
                                      }
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 flex justify-end">
                                <Link to={`/jobs/${app.jobId}`}>
                                  <Button
                                    variant="outline"
                                    className="text-dawam-purple border-dawam-purple hover:bg-dawam-purple hover:text-white"
                                  >
                                    View Job
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        You haven't applied to any jobs yet.
                      </p>
                      <Link to="/jobs">
                        <Button className="bg-dawam-purple hover:bg-secondary-purple text-white">
                          Browse Jobs
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="saved">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-6 text-dawam-dark-purple dark:text-white">
                    Your saved Jobs
                  </h2>

                  {applications.length > 0 ? (
                    <div className="space-y-6">
                      {applications.map((app: ApplicationType) => (
                        <Card key={app.id} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="p-6">
                              <div className="flex flex-col md:flex-row justify-between mb-4">
                                <div>
                                  <h3 className="text-lg font-semibold text-dawam-dark-purple dark:text-white mb-1">
                                    {app.jobTitle}
                                  </h3>
                                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                    <Building size={14} className="mr-1" />
                                    <div>
                                      <span className="font-medium">
                                        Employer:
                                      </span>{" "}
                                      {app.posterName}
                                    </div>
                                    <Bolt size={14} className="mx-1" />
                                    <div>
                                      <span className="font-medium">
                                        job type :
                                      </span>
                                      {jobType[app.jobType]}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                <div className="flex items-start">
                                  <Briefcase size={14} className="mr-2 mt-1" />
                                  <div>
                                    <span className="font-medium">
                                      Career level:
                                    </span>{" "}
                                    {jobLevel[app.careerLevel]}
                                  </div>
                                </div>
                                <div className="flex items-start">
                                  <Clock size={14} className="mr-2 mt-1" />
                                  <div>
                                    <span className="font-medium">Posted:</span>{" "}
                                    {formatDistanceToNow(
                                      new Date(app.appliedAt),
                                      {
                                        addSuffix: true,
                                      }
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 flex gap-x-4 justify-end">
                                <button>
                                  <Button
                                    variant="destructive"
                                    className="text-white hover:bg-red-950 hover:text-white"
                                  >
                                    Remove
                                  </Button>
                                </button>
                                <Link to={`/jobs/${app.jobId}`}>
                                  <Button
                                    variant="outline"
                                    className="text-dawam-purple border-dawam-purple hover:bg-dawam-purple hover:text-white"
                                  >
                                    View Job
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        You haven't applied to any jobs yet.
                      </p>
                      <Link to="/jobs">
                        <Button className="bg-dawam-purple hover:bg-secondary-purple text-white">
                          Browse Jobs
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="subscription">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-6 text-dawam-dark-purple dark:text-white">
                    Subscription Plan
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                      className={`border rounded-lg p-6 ${
                        user.isPremium ? "border-green-500" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-dawam-dark-purple dark:text-white mb-2">
                            Basic Plan
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            For job seekers starting their career journey
                          </p>
                          <ul className="space-y-2 mb-6">
                            <li className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-2 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                              Apply to jobs
                            </li>
                            <li className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-2 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                              Track applications
                            </li>
                          </ul>
                          <p className="text-2xl font-bold text-dawam-dark-purple dark:text-white">
                            Free
                          </p>
                        </div>
                        {!user.isPremium && <Badge>Current Plan</Badge>}
                      </div>
                    </div>

                    <div
                      className={`border rounded-lg p-6 ${
                        user.isPremium ? "border-green-500 border-2" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-dawam-dark-purple dark:text-white mb-2">
                            Premium Plan
                            <Star
                              className="inline-block ml-1 text-yellow-400"
                              size={16}
                            />
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Enhanced features for serious job seekers
                          </p>
                          <ul className="space-y-2 mb-6">
                            <li className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-2 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                              All Basic features
                            </li>
                            <li className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-2 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                              Job analysis
                            </li>
                            <li className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-2 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                              Salary insights
                            </li>
                          </ul>
                          <p className="text-2xl font-bold text-dawam-dark-purple dark:text-white">
                            $9.99/month
                          </p>
                        </div>
                        {user.isPremium && (
                          <Badge className="bg-green-500">Current Plan</Badge>
                        )}
                      </div>

                      {!user.isPremium && (
                        <Button
                          onClick={() => mutate()}
                          disabled={isPaying}
                          className="w-full mt-4 bg-dawam-purple hover:bg-secondary-purple text-white"
                          // onClick={handleSubscribe}
                        >
                          Upgrade Now
                        </Button>
                      )}

                      {user.isPremium && (
                        <p className="text-sm text-green-600 mt-4">
                          <Star className="inline-block mr-1" size={14} />
                          You're currently on the Premium plan
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
