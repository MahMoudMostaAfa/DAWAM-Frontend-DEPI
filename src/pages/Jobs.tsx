import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getJobs } from "@/utils/mockData";
import Layout from "@/components/layout/Layout";
import JobCard from "@/components/jobs/JobCard";
import JobFilter from "@/components/jobs/JobFilter";
import { Pagination } from "@/components/ui/pagination";
import { useJobs } from "@/components/jobs/useJobs";
import { JobType } from "@/types/jobsType";

const JOBS_PER_PAGE = 10;

const Jobs = () => {
  // console.log("Jobs page loaded");
  // const [jobs, setJobs] = useState<JobType[]>([]);
  // const [filteredJobs, setFilteredJobs] = useState<JobType[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [filterTriggered, setFilterTriggered] = useState<boolean>(false);
  const navigate = useNavigate();

  const { jobs, totalCount, isPending, isError } = useJobs();

  const totalPages = Math.ceil(totalCount / JOBS_PER_PAGE);

  const totalShowedTillNow = Math.min(currentPage * JOBS_PER_PAGE, totalCount);

  // Get page from URL if available

  // Handle filter changes
  const handleFilterChange = () => {
    setCurrentPage(1); // Reset to first page when filter changes
    setFilterTriggered((p) => !p);
  };

  // Update URL when page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Update URL with page parameter
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    navigate(`?${newParams.toString()}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 text-dawam-dark-purple dark:text-white">
            Browse Jobs
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find your next career opportunity from our extensive job listings
            across various industries.
          </p>
        </div>

        <JobFilter onFilterChange={handleFilterChange} />
        {isPending ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dawam-purple"></div>
          </div>
        ) : jobs.length > 0 ? (
          <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600 dark:text-gray-300">
                Showing{" "}
                <span className="font-semibold">{totalShowedTillNow}</span> of{" "}
                <span className="font-semibold">{totalCount}</span> jobs
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              {jobs.map((job: JobType) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2 text-dawam-dark-purple dark:text-white">
              No jobs found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Try adjusting your filters or search criteria.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Jobs;
