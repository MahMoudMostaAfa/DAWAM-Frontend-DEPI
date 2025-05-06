import { useAuth } from "@/context/authContext";
import { register } from "@/services/authServices";
import { getSession } from "@/services/paymentServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function usePayments() {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: getSession,
  });

  return { mutate, isPending, isError };
}
