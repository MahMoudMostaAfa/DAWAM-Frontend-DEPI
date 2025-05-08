import { closeJob } from "@/services/applicationsServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteJob() {
  const clientQuery = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: closeJob,
    onSuccess: () => {
      clientQuery.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job closed successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { mutate, isPending };
}
