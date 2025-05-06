import { useAuth } from "@/context/authContext";
import { getPremiumAnalsis } from "@/services/analysisServices";
import { useQuery } from "@tanstack/react-query";

export function usePremium(id: number) {
  const { user, isLoading } = useAuth();
  const { data, isPending, isError } = useQuery({
    queryKey: ["myAnalysis", id],
    queryFn: () => getPremiumAnalsis(id),
    refetchOnWindowFocus: false,
    enabled: !!id && !isLoading && user && user?.isPremium,
    retry: 1,
  });

  return {
    data,
    isPending,
    isError,
  };
}
