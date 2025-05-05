import { updateUserProfile } from "@/services/authServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateProfile() {
  const clientQuery = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      clientQuery.removeQueries();
      toast.success("profile updated successfully");
    },
    onError: () => {
      toast.error("failed to update profile");
    },
  });
  return { isPending, mutate };
}
