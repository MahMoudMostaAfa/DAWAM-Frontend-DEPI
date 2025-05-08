import { getJobsApi } from "@/services/jobsServices";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const jobType = {
  "full-time": 0,
  "part-time": 1,
  remote: 2,
};
const jobLevel = {
  senior: 0,
  junior: 1,
  fresh: 2,
  internship: 3,
};
export function useJobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  let queryString = "";

  if (searchParams.get("search")) {
    queryString += `SearchTerm=${searchParams
      .get("search")
      .replace(/\s+/g, "-")}&`;
  }
  if (searchParams.get("type")) {
    queryString += `JobType=${jobType[searchParams.get("type")]}&`;
  }
  if (searchParams.get("level")) {
    queryString += `CareerLevel=${jobLevel[searchParams.get("level")]}&`;
  }
  if (searchParams.get("category")) {
    queryString += `Category=${searchParams.get("category")}&`;
  }
  if (searchParams.get("sort")) {
    queryString += `SortByDateDesc=${
      searchParams.get("sort") == "newest" ? "true" : "false"
    }&`;
  }
  if (searchParams.get("page")) {
    queryString += `PageNumber=${searchParams.get("page")}`;
  }

  // console.log(searchParams.has("page"));
  // console.log(new URLSearchParams(useLocation().search));
  // console.log(searchParams.toString());

  const { data, isPending, isError } = useQuery({
    queryKey: ["jobs", queryString],
    queryFn: () => getJobsApi(queryString),
    refetchOnWindowFocus: false,
  });

  return {
    jobs: data?.jobs || [],
    totalCount: data?.totalCount || 0,
    isPending,
    isError,
  };
}
