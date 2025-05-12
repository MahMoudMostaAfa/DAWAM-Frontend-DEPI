import { deleteSavedJobApi } from "@/services/savedJobServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUnSaveJob() {
  const clientQuery = useQueryClient();
  const {
    mutate: unSaveJob,
    data,
    isPending: isUnSaving,
  } = useMutation({
    mutationFn: deleteSavedJobApi,
    onSuccess: (data) => {
      toast.success("Job unsaved successfully");
      clientQuery.invalidateQueries({
        queryKey: ["job"],
      });
      clientQuery.invalidateQueries({
        queryKey: ["savedJobs"],
      });
    },
    onError: (error) => {
      toast.error("Failed to unsave job");
    },
  });
  return {
    unSaveJob,
    isUnSaving,
  };
}
