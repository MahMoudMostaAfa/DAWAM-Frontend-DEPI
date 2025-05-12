import { getSavedJobsApi } from "@/services/savedJobServices";
import { JobType } from "@/types/jobsType";
import { useQuery } from "@tanstack/react-query";

export function useSavedJobs() {
  const { data: savedJobs, isPending: isGettingSave } = useQuery<JobType[]>({
    queryKey: ["savedJobs"],
    queryFn: getSavedJobsApi,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  return { savedJobs, isGettingSave };
}
