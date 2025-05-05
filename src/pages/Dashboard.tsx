import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { jobs, applications } from "@/utils/mockData";
import AdminStats from "@/components/admin/AdminStats";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnalysis } from "@/services/analysisServices";
import Spinner from "@/components/ui/Spinner";
import { deleteUser, getUsers } from "@/services/adminServices";
import { UserAdminType } from "@/types/userType";
import { toast } from "sonner";
import { useJobs } from "@/components/jobs/useJobs";
import { jobLevel, jobType } from "@/utils/DataMaps";
import { useDeleteJob } from "@/components/jobs/useDeleteJob";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const [_, setIsLoading] = useState(true);
  const { data, isPending } = useQuery({
    queryKey: ["analysis"],
    queryFn: getAnalysis,
    enabled: !!user,
  });
  const { isPending: isJobPending, jobs } = useJobs();
  const { data: users, isPending: isPendingUsers } = useQuery<UserAdminType[]>({
    queryKey: ["users"],
    queryFn: getUsers,
    enabled: !!user,
  });
  const { mutate: deleteJob, isPending: isDeleting } = useDeleteJob();

  const clientqQuery = useQueryClient();
  const { mutate, isPending: isPendingDeleting } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("user deleted successfully");
      clientqQuery.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });
  const handleDeleteUser = (userId: number) => {};

  const handleDeleteJob = (jobId: number) => {};

  const handleDeleteApplication = (applicationId: number) => {};
  // Redirect if not logged in or not an admin
  if (!isLoading && (!user || user.roles[0] !== "Admin")) {
    return <Navigate to="/login" />;
  }

  if (
    isLoading ||
    ((isPending || isPendingUsers) && user?.roles[0] == "Admin") ||
    isPendingDeleting ||
    isJobPending
  ) {
    return <Spinner />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-dawam-dark-purple dark:text-white">
            Admin Dashboard
          </h1>
          <Badge className="bg-dawam-purple text-white">Admin</Badge>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            {/* <TabsTrigger value="applications">Applications</TabsTrigger> */}
          </TabsList>

          <TabsContent value="overview">
            <AdminStats data={data} />
          </TabsContent>

          <TabsContent value="users">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-dawam-dark-purple dark:text-white">
                Registered Users
              </h2>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user: UserAdminType) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span>{user.fullName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            className={`
                              ${
                                user.role[0] === "Admin"
                                  ? "bg-purple-500"
                                  : user.role[0] === "JobPoster"
                                  ? "bg-blue-500"
                                  : "bg-green-500"
                              }
                              text-white
                            `}
                          >
                            {user.role[0]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            disabled={!user.isActive}
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => mutate(user.id)}
                          >
                            deActivate
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="jobs">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-dawam-dark-purple dark:text-white">
                Job Listings
              </h2>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>{job.id}</TableCell>
                        <TableCell>{job.title}</TableCell>
                        <TableCell>{job.categoryName}</TableCell>
                        <TableCell>
                          <Badge
                            className={`
                              ${
                                jobType[job.jobType] === "Full-time"
                                  ? "bg-green-500"
                                  : jobType[job.jobType] === "Part-time"
                                  ? "bg-blue-500"
                                  : jobType[job.jobType] === "Contract"
                                  ? "bg-yellow-500"
                                  : jobType[job.jobType] === "Freelance"
                                  ? "bg-orange-500"
                                  : "bg-purple-500"
                              }
                              text-white
                            `}
                          >
                            {jobType[job.jobType]}
                          </Badge>
                        </TableCell>
                        <TableCell>{jobLevel[job.careerLevel]}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>
                          <Button
                            disabled={isDeleting || job.isClosed}
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => {
                              deleteJob(job.id);
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          {/* <TabsContent value="applications">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-dawam-dark-purple dark:text-white">
                Job Applications
              </h2>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Job</TableHead>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell>{app.id}</TableCell>
                        <TableCell>
                          {jobs.find((job) => job.id === app.jobId)?.title ||
                            "Unknown Job"}
                        </TableCell>
                        <TableCell>
                          {users.find((user) => user.id === app.userId)?.name ||
                            "Unknown User"}
                        </TableCell>
                        <TableCell>
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{app.yearsOfExperience} years</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => handleDeleteApplication(app.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent> */}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
