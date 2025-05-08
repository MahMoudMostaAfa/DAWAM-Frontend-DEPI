import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getJobById,
  isUserPremium,
  getJobApplications,
} from "@/utils/mockData";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  MapPin,
  Clock,
  Briefcase,
  Share2,
  Bookmark,
  ChevronLeft,
  BarChart2,
  Lock,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useJobById } from "@/components/jobs/useJobById";
import { formatDistanceToNow } from "date-fns";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/context/authContext";
import { useMutation } from "@tanstack/react-query";
import { applyOnJob } from "@/services/applicationsServices";
import { toast } from "sonner";
import { useJobs } from "@/components/jobs/useJobs";
import { usePremium } from "@/components/auth/usePremium";
import { jobLevel, jobType, JobTypeColor } from "@/utils/DataMaps";

const JobDetails = () => {
  async function ShareButton(textToCopy: string) {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy text.");
    }
  }
  const { isLoading: isLoadingUser, user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const { job, isPending, isError } = useJobById(+id);
  const { jobs, isPending: isPendingJobs } = useJobs();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationData, setApplicationData] = useState({
    experience: "",
    yearsOfExperience: "",
    expectedSalary: "",
    cv: null as File | null,
  });

  const { isPending: isApplying, mutate } = useMutation({
    mutationFn: applyOnJob,
    onSuccess: () => {
      toast.success("applied successfully!");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
  const { data: premiumData, isPending: isLoadingPremium } = usePremium(+id);
  const [isPremium, setIsPremium] = useState(false);
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);
  // const [careerLevelData, setCareerLevelData] = useState<any[]>([]);
  const [averageExperience, setAverageExperience] = useState<number>(0);
  const [averageSalary, setAverageSalary] = useState<string>("");
  const isLoggedIn = user ? true : false;
  const navigate = useNavigate();
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setApplicationData((prev) => ({ ...prev, cv: e.target.files![0] }));
    }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("JobId", id);
    formData.append("YearsOfExperience", applicationData.yearsOfExperience);
    formData.append("PreviousExperience", applicationData.experience);
    formData.append("ExpectedSalary", applicationData.expectedSalary);
    formData.append("Phone", user?.phone);
    formData.append("CVFile", applicationData.cv);
    mutate(formData, {
      onSuccess: () => navigate("/profile"),
    });
  };

  if (isPending) {
    return <Spinner />;
  }
  const careerLevelData = Object.entries(
    premiumData?.careerLevelCounts || {}
  ).map(([level, count]) => ({
    name: level,
    value: count,
  }));

  if (!job) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4 text-dawam-dark-purple dark:text-white">
            Job Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/jobs">
            <Button className="bg-dawam-purple hover:bg-secondary-purple text-white">
              Browse All Jobs
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Colors for charts
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Link
          to="/jobs"
          className="inline-flex items-center text-dawam-purple hover:underline mb-6"
        >
          <ChevronLeft size={18} className="mr-1" /> Back to Jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2 text-dawam-dark-purple dark:text-white">
                    {job.title}
                    {job.isClosed && (
                      <Badge variant="destructive" className="ml-2">
                        Closed
                      </Badge>
                    )}
                  </h1>
                  <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-300 mb-4">
                    <div className="flex items-center mr-6 mb-2">
                      <Building size={18} className="mr-2" />
                      <span>{job.categoryName}</span>
                    </div>
                    <div className="flex items-center mr-6 mb-2">
                      <MapPin size={18} className="mr-2" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center mr-6 mb-2">
                      <Clock size={18} className="mr-2" />
                      <span>
                        Posted {formatDistanceToNow(new Date(job.createdAt))}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => {
                      ShareButton(
                        `https://dawamdepi.netlify.app/jobs/${job.id}`
                      );
                    }}
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                  {isLoggedIn && user?.roles[0] === "JobApplier" && (
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Bookmark className="h-4 w-4" />
                      <span className="sr-only">Save</span>
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 mb-6">
                <Badge
                  className={`text-white ${JobTypeColor[jobType[job.jobType]]}`}
                >
                  {jobType[job.jobType]}
                </Badge>
                <Badge variant="outline">{jobLevel[job.careerLevel]}</Badge>
                <Badge variant="outline">{job.categoryName}</Badge>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-3 text-dawam-dark-purple dark:text-white">
                  Job Description
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {job.description}
                </p>

                <h2 className="text-xl font-semibold mb-3 text-dawam-dark-purple dark:text-white">
                  Requirements
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  {job.requirements.split(",").map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Job Market Analysis Section - Premium Feature */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-dawam-dark-purple dark:text-white flex items-center">
                  <BarChart2 size={20} className="mr-2" />
                  Job Market Analysis
                </h2>
                {!isPremium && (
                  <Badge
                    variant="outline"
                    className="text-yellow-500 border-yellow-500"
                  >
                    Premium Feature
                  </Badge>
                )}
              </div>

              {user && user?.isPremium && premiumData ? (
                <div className="space-y-8">
                  {/* Career Level Distribution */}
                  <div>
                    <h3 className="font-semibold mb-4 text-dawam-dark-purple dark:text-white flex items-center">
                      <Users size={18} className="mr-2" />
                      Career Level Distribution
                    </h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={careerLevelData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) =>
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {careerLevelData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  {/* Experience and Salary Stats */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h3 className="font-semibold mb-2 text-dawam-dark-purple dark:text-white flex items-center">
                      <Users size={18} className="mr-2" />
                      total applications
                    </h3>
                    <div className="text-3xl font-bold text-dawam-purple">
                      {premiumData.totalApplications}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Annual salary based on market data
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                      <h3 className="font-semibold mb-2 text-dawam-dark-purple dark:text-white flex items-center">
                        <TrendingUp size={18} className="mr-2" />
                        Average Experience
                      </h3>
                      <div className="flex items-center">
                        <div className="text-3xl font-bold text-dawam-purple">
                          {premiumData.avgYearsOfExperience}
                        </div>
                        <div className="text-xl ml-2 text-gray-600 dark:text-gray-300">
                          years
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Based on applicant data for similar positions
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                      <h3 className="font-semibold mb-2 text-dawam-dark-purple dark:text-white flex items-center">
                        <DollarSign size={18} className="mr-2" />
                        Average Expected Salary
                      </h3>
                      <div className="text-3xl font-bold text-dawam-purple">
                        {premiumData.avgExpectedSalary}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Based on applicant data for similar positions
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    <p>
                      This analysis is generated based on current applications
                      of this job.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-gray-700 p-8 rounded-lg">
                    <Lock size={48} className="text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
                      Unlock Job Market Analysis
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
                      Get valuable insights on career level distribution,
                      average experience years, and expected salary for this
                      role.
                    </p>
                    <Button
                      className="bg-dawam-purple hover:bg-secondary-purple text-white"
                      onClick={() => setShowPremiumDialog(true)}
                    >
                      Upgrade to Premium
                    </Button>
                  </div>

                  <Dialog
                    open={showPremiumDialog}
                    onOpenChange={setShowPremiumDialog}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upgrade to Premium</DialogTitle>
                        <DialogDescription>
                          Get access to job market analysis, salary insights,
                          and more premium features.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <h3 className="font-semibold mb-2">Premium Benefits</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            <span>Career level distribution for each job</span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            <span>Average experience years of applicants</span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            <span>Expected salary insights</span>
                          </li>
                        </ul>
                        <p className="mt-4 text-sm text-gray-600">
                          Premium membership costs just $9.99/month.
                        </p>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setShowPremiumDialog(false)}
                        >
                          Maybe Later
                        </Button>
                        <Link to="/profile">
                          <Button className="bg-dawam-purple hover:bg-secondary-purple text-white">
                            Go to Subscription Page
                          </Button>
                        </Link>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>

            {/* Similar Jobs Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <h2 className="text-xl font-semibold mb-4 text-dawam-dark-purple dark:text-white">
                Similar Jobs
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Here are some similar job opportunities that might interest you.
              </p>

              <div className="space-y-4">
                {/* Similar job items would go here. Using placeholders for now */}
                {jobs
                  .filter((job) => job.id !== +id)
                  .slice(0, 3)
                  .map((job) => (
                    <div
                      key={job.id}
                      className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0"
                    >
                      <h3 className="font-medium mb-1 text-dawam-dark-purple dark:text-white">
                        {job.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                        <span className="mr-3">{job.categoryName}</span>
                        <span>{job.location}</span>
                      </div>
                      <Link
                        to={`/jobs/${job.id}`}
                        className="text-dawam-purple hover:underline text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-dawam-dark-purple dark:text-white">
                Job Summary
              </h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Briefcase className="h-5 w-5 text-dawam-purple mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-dawam-dark-purple dark:text-white">
                      Job Type
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {jobType[job.jobType]}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-dawam-purple mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-dawam-dark-purple dark:text-white">
                      Location
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {job.location}
                    </p>
                  </div>
                </div>
              </div>

              {job.isClosed ? (
                <div className="mt-6 p-4 bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-lg text-center">
                  This job posting has been closed by the employer
                </div>
              ) : isLoggedIn && user?.roles[0] === "JobApplier" ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-6 bg-dawam-purple hover:bg-secondary-purple text-white">
                      Apply Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Apply for {job.title}</DialogTitle>
                      <DialogDescription>
                        Fill out the form below to submit your application for
                        this position.
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleApply} className="space-y-4 py-4">
                      <div>
                        <Label htmlFor="experience">Previous Experience</Label>
                        <Textarea
                          id="experience"
                          name="experience"
                          placeholder="Describe your relevant experience"
                          value={applicationData.experience}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="yearsOfExperience">
                          Years of Experience
                        </Label>
                        <Input
                          id="yearsOfExperience"
                          name="yearsOfExperience"
                          type="number"
                          placeholder="0"
                          value={applicationData.yearsOfExperience}
                          onChange={handleInputChange}
                          required
                          min="0"
                          step="1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="expectedSalary">Expected Salary</Label>
                        <Input
                          type="number"
                          id="expectedSalary"
                          name="expectedSalary"
                          placeholder="e.g., $75,000"
                          value={applicationData.expectedSalary}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="cv">Upload CV</Label>
                        <Input
                          id="cv"
                          name="cv"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          required
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Accepted formats: PDF, DOC, DOCX (Max 5MB)
                        </p>
                      </div>

                      <DialogFooter>
                        <Button
                          type="submit"
                          className="w-full bg-dawam-purple hover:bg-secondary-purple text-white"
                          disabled={isApplying}
                        >
                          {isApplying ? "Submitting..." : "Submit Application"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              ) : (
                <div className="mt-6 space-y-3">
                  <Link to="/login">
                    <Button className="w-full bg-dawam-purple hover:bg-secondary-purple text-white">
                      Login to Apply
                    </Button>
                  </Link>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-dawam-purple hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobDetails;
