import { getJobByIdApi } from "@/services/jobsServices";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function useJobById(id: number) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["job", id],
    queryFn: () => getJobByIdApi(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    job: data,
    isPending,
    isError,
  };
}
