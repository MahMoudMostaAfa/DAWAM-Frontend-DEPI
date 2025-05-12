import { useAuth } from "@/context/authContext";
import { logout } from "@/services/authServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useLogout() {
  const { logout: clearToken } = useAuth();
  const clientQuery = useQueryClient();
  const navigate = useNavigate();
  const { mutate, data, isPending, isError } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      // Handle successful logout (e.g., redirect to login page)
      clearToken();
      navigate("/login", { replace: true });
      clientQuery.invalidateQueries();
      clientQuery.removeQueries();
      toast.success("Logged out successfully.");
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred during logout.");
    },
  });
  return { mutate, isPending, isError };
}
