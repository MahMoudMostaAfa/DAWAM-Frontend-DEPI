import { activeUser as activeUserApi } from "@/services/adminServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useActiveUser() {
  const queryClient = useQueryClient();
  const { mutate: activeUser, isPending: isActiviting } = useMutation({
    mutationFn: activeUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("user become active successfully");
    },
    onError: () => {
      toast.error("Failed to active user");
    },
  });
  return { isActiviting, activeUser };
}
