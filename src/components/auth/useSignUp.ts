import { useAuth } from "@/context/authContext";
import { register } from "@/services/authServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSignUp() {
  const { login: setToken } = useAuth();
  const { mutate, data, isPending, isError } = useMutation({
    mutationFn: ({
      fullName,
      email,
      password,
      role,
    }: {
      fullName: string;
      email: string;
      password: string;
      role: string;
    }) => register(fullName, email, password, role),
    onSuccess: (data) => {
      setToken(data);
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred during registration.");
    },
  });

  return { mutate, data, isPending, isError };
}
