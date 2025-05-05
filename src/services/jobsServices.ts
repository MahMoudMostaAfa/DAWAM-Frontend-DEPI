import axios from "axios";
import { JobType } from "@/types/jobsType";
import api from "./api";

export async function getJobsApi(queryString?: string): Promise<{
  totalCount: number;
  jobs: JobType[];
}> {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_HOST_URL}/api/jobs?${queryString}`
    );
    return {
      totalCount: res.data.totalCount,
      jobs: res.data.jobs,
    };
  } catch (err) {
    console.error("Error fetching jobs:", err);
    throw new Error("Failed to fetch jobs");
  }
}
export async function getJobByIdApi(id: number): Promise<JobType> {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_HOST_URL}/api/jobs/${id}`
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching job:", err);
    throw new Error("Failed to fetch jobs");
  }
}
export async function deleteJob(id: number): Promise<void> {
  try {
    const res = await api.delete(
      `${import.meta.env.VITE_HOST_URL}/api/jobs/${id}`
    );
  } catch (err) {
    // console.error("Error fetching job:", err);
    throw new Error("Failed to delete jobs");
  }
}
