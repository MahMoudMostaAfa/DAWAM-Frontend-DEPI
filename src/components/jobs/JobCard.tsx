import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Briefcase, Building, MapPin } from "lucide-react";
import { JobType } from "@/types/jobsType";
import { formatDistanceToNow } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { closeJob } from "@/services/applicationsServices";
import { toast } from "sonner";
import Spinner from "../ui/Spinner";
import { useDeleteJob } from "./useDeleteJob";
import { JobTypeColor } from "@/utils/DataMaps";
import { useOpenJob } from "./useOpenJob";

interface JobCardProps {
  job: JobType;
  showManageButton?: boolean;
}
const jobType = {
  0: "Full-time",
  1: "Part-time",
  2: "Remote",
};

const jobLevel = {
  0: "senior",
  1: "junior",
  2: "fresh",
  3: "internship",
};

const JobCard = ({ job, showManageButton }: JobCardProps) => {
  const { mutate, isPending } = useDeleteJob();
  const { openJob, isOpeningJob } = useOpenJob();

  if (isPending) return <Spinner />;
  return (
    <div className="bg-white flex flex-col dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start flex-wrap flex-col md:flex-row ">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
            {job.title}
            {job.isClosed && (
              <Badge variant="destructive" className="ml-2">
                Closed
              </Badge>
            )}
          </h3>
          <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
            <Building size={16} className="mr-1" />
            <span>{job.categoryName}</span>
            <span className="mx-2">•</span>
            <MapPin size={16} className="mr-1" />
            <span>{job.location}</span>
          </div>
        </div>

        <div className="flex order-first md:order-last  mb-2 md:mb-0">
          <Badge className={`text-white ${JobTypeColor[jobType[job.jobType]]}`}>
            {jobType[job.jobType]}
          </Badge>
        </div>
      </div>

      <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
        <Briefcase size={16} className="mr-1" />
        <span className={`mr-3 `}>{jobLevel[job.careerLevel]}</span>
        <Clock size={16} className="mr-1" />
        <span>Posted {formatDistanceToNow(new Date(job.createdAt))}</span>
      </div>

      <div className="mt-4 mb-auto text-gray-600 dark:text-gray-300 line-clamp-2">
        {job.description.substring(0, 150)}...
      </div>

      <div className="mt-4 flex justify-end items-center">
        {showManageButton ? (
          <Button
            disabled={isPending || isOpeningJob}
            variant={job.isClosed ? "outline" : "destructive"}
            onClick={() => {
              if (job.isClosed) {
                openJob(job.id);
              } else {
                mutate(job.id);
              }
            }}
            className="mr-2"
          >
            {job.isClosed ? "Reopen Job" : "Close Job"}
          </Button>
        ) : null}

        <Link to={`/jobs/${job.id}`}>
          <Button className=" bg-blue-500 hover:bg-blue-400 text-white">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
