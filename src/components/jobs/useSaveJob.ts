import { saveJobApi } from "@/services/savedJobServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSaveJob() {
  const clientQuery = useQueryClient();
  const {
    mutate: saveJob,
    data,
    isPending: isSavingJob,
  } = useMutation({
    mutationFn: saveJobApi,
    onSuccess: (data) => {
      toast.success("Job saved successfully");
      clientQuery.invalidateQueries({
        queryKey: ["job"],
      });
      clientQuery.invalidateQueries({
        queryKey: ["savedJobs"],
      });
    },
    onError: (error) => {
      toast.error("Failed to save job");
    },
  });
  return { saveJob, isSavingJob };
}
