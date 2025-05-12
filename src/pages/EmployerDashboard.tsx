import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  getEmployerJobs,
  getJobById,
  getJobApplications,
  toggleJobStatus,
} from "@/utils/mockData";
import JobPostForm from "@/components/jobs/JobPostForm";
import JobCard from "@/components/jobs/JobCard";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Phone,
  Mail,
  Clock,
  FileText,
  Banknote,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import Spinner from "@/components/ui/Spinner";
import { useQuery } from "@tanstack/react-query";
import {
  getApplicationsOfMyJob,
  getMyPostedJobs,
} from "@/services/applicationsServices";
import { MyPostedJob, MyPostedJobApplication } from "@/types/applicationType";
import { formatDistanceToNow } from "date-fns";
import { useOpenJob } from "@/components/jobs/useOpenJob";

const EmployerDashboard = () => {
  const { user, isLoading } = useAuth();
  const {
    data: jobs,
    isPending,
    isError,
  } = useQuery<MyPostedJob[]>({
    queryKey: ["myPostedJobs"],
    queryFn: getMyPostedJobs,
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!user && user?.roles[0] == "JobPoster",
  });
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const { data: applications, isPending: isLoadingApplications } = useQuery<
    MyPostedJobApplication[]
  >({
    queryKey: ["myjobs", selectedJob],
    queryFn: () => getApplicationsOfMyJob(selectedJob),
    refetchOnWindowFocus: false,
    retry: 1,
    // enabled: !!user && user?.roles[0] == "JobPoster" && !!selectedJob,
  });

  // const [user, setUser] = useState<any>(null);
  // const [jobs, setJobs] = useState<any[]>([]);
  // const [applications, setApplications] = useState<any[]>([]);

  const handleJobSelect = (jobId: number) => {
    setSelectedJob(jobId);
  };

  // Redirect if not logged in or not an employer
  if (!isLoading && (!user || user.roles[0] !== "JobPoster")) {
    return <Navigate to="/login" />;
  }

  if (
    isLoading ||
    (isPending && user?.roles[0] == "JobPoster") ||
    (isLoadingApplications && !!selectedJob)
  ) {
    return <Spinner />;
  }

  const navigateToPostJob = () => {
    // Find the tab trigger with data-value="post-job"
    const postJobTab = document.querySelector('[data-value="post-job"]');
    // Check if it's an HTMLElement before calling click()
    if (postJobTab && postJobTab instanceof HTMLElement) {
      postJobTab.click();
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-dawam-dark-purple dark:text-white">
          Employer Dashboard
        </h1>

        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="jobs">My Jobs</TabsTrigger>
            <TabsTrigger value="post-job">Post a Job</TabsTrigger>
          </TabsList>

          <TabsContent value="applications">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4 text-dawam-dark-purple dark:text-white">
                    My Job Listings
                  </h2>
                  {jobs.length > 0 ? (
                    <div className="space-y-3">
                      {jobs.map((job: MyPostedJob) => (
                        <div
                          key={job.id}
                          className={`p-3 rounded-md cursor-pointer transition-colors ${
                            selectedJob === job.id
                              ? "bg-dawam-purple bg-opacity-10 border-l-4 border-dawam-purple"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                          onClick={() => handleJobSelect(job.id)}
                        >
                          <h3 className="font-medium text-dawam-dark-purple dark:text-white">
                            {job.title}
                            {job.isClosed && (
                              <span className="text-red-500 text-xs ml-2">
                                (Closed)
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {job.applicationCount || 0} applications
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      You haven't posted any jobs yet.
                    </p>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4 text-dawam-dark-purple dark:text-white">
                    Applications
                    {selectedJob && (
                      <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-2">
                        for {jobs.find((job) => job.id === selectedJob)?.title}
                      </span>
                    )}
                  </h2>

                  {selectedJob ? (
                    applications?.length > 0 ? (
                      <div className="space-y-6">
                        {applications.map((app: MyPostedJobApplication) => (
                          <Card key={app.id}>
                            <CardContent className="p-6">
                              <Link to={`/profile/${app.slug}`}>
                                <div className="flex flex-col md:flex-row justify-between mb-4">
                                  <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                                      <div className="flex items-center justify-center w-full h-full text-gray-500">
                                        {app.imagePath ? (
                                          <img
                                            src={`${
                                              import.meta.env.VITE_HOST_URL
                                            }${app.imagePath}`}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                          />
                                        ) : (
                                          <User size={24} />
                                        )}
                                      </div>
                                    </div>
                                    <div>
                                      <h3 className="font-semibold text-dawam-dark-purple dark:text-white">
                                        {app.userFullName}
                                      </h3>
                                      <div className="flex text-sm text-gray-600  items-center dark:text-gray-300">
                                        <Mail size={12} className="mr-1" />
                                        <span>{app.userEmail}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                                <div className="flex items-start">
                                  <Phone size={14} className="mr-2 mt-1" />
                                  <div>
                                    <span className="font-medium">Phone:</span>{" "}
                                    {app.phone}
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
                                <div className="flex items-start">
                                  <FileText size={14} className="mr-2 mt-1" />
                                  <div>
                                    <span className="font-medium">
                                      Experience years :
                                    </span>{" "}
                                    {app.yearsOfExperience} years
                                  </div>
                                </div>
                                <div className="flex items-start">
                                  <Banknote size={14} className="mr-2 mt-1" />
                                  <div>
                                    <span className="font-medium">
                                      expectedSalary:
                                    </span>{" "}
                                    {app.expectedSalary}$
                                  </div>
                                </div>
                              </div>

                              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-4">
                                <h4 className="font-medium mb-2 text-dawam-dark-purple dark:text-white">
                                  Experience
                                </h4>
                                <p className="text-gray-700 dark:text-gray-300">
                                  {app.previousExperience}
                                </p>
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-4">
                                <h4 className="font-medium mb-2 text-dawam-dark-purple dark:text-white">
                                  cv link
                                </h4>
                                <p className="text-gray-700 dark:text-gray-300">
                                  <a
                                    href={`${
                                      import.meta.env.VITE_HOST_URL +
                                      "/" +
                                      app.cvFilePath
                                    } `}
                                    target="_blank"
                                  >
                                    <LinkIcon />
                                  </a>
                                </p>
                              </div>

                              <div className="flex justify-end space-x-3">
                                <Button
                                  onClick={() =>
                                    (window.location.href = `mailto:${app.userEmail}?subject=Job Inquiry&body=Hi, I'm interested in your job Application.`)
                                  }
                                  variant="outline"
                                  className="border-dawam-purple text-dawam-purple hover:bg-dawam-purple hover:text-white"
                                >
                                  Contact
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          No applications received for this job yet.
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        Select a job to view its applications
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="jobs">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-dawam-dark-purple dark:text-white">
                  My Job Postings
                </h2>
              </div>

              {jobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} showManageButton={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    You haven't posted any jobs yet.
                  </p>
                  <Button
                    onClick={navigateToPostJob}
                    className="bg-dawam-purple hover:bg-secondary-purple text-white"
                  >
                    Post Your First Job
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="post-job">
            <JobPostForm />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default EmployerDashboard;
