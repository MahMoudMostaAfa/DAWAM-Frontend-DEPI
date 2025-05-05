import { useAuth } from "@/context/authContext";
import { login } from "@/services/authServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useLogin() {
  const { login: setToken } = useAuth();
  const { mutate, data, isPending, isError } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data) => {
      setToken(data);
    },
    onError: (error) => {
      toast.error("email or password is incorrect");
    },
  });

  return { mutate, data, isPending, isError };
}
