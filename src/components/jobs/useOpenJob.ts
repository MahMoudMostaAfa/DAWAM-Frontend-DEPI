import { openJob as openJobApi } from "@/services/jobsServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useOpenJob() {
  const queryClient = useQueryClient();
  const { isPending: isOpeningJob, mutate: openJob } = useMutation({
    mutationFn: openJobApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPostedJobs"] });
      toast.success("Job opened successfully");
    },
    onError: () => {
      toast.error("Failed to open job");
    },
  });
  return { isOpeningJob, openJob };
}
