import { JobType } from "@/types/jobsType";
import api from "./api";

export async function getSavedJobsApi(): Promise<JobType[]> {
  try {
    const res = await api.get(`${import.meta.env.VITE_HOST_URL}/api/SavedJobs`);
    return res.data;
  } catch (err) {
    console.error("Error fetching saved jobs:", err);
    throw new Error("Failed to fetch saved jobs");
  }
}
export async function saveJobApi(jobId: number): Promise<void> {
  try {
    const res = await api.post(
      `${import.meta.env.VITE_HOST_URL}/api/SavedJobs/${jobId}`
    );
  } catch (err) {
    console.error("Error saving job:", err);
    throw new Error("Failed to save job");
  }
}
export async function deleteSavedJobApi(jobId: number): Promise<void> {
  try {
    const res = await api.delete(
      `${import.meta.env.VITE_HOST_URL}/api/SavedJobs/${jobId}`
    );
  } catch (err) {
    console.error("Error deleting saved job:", err);
    throw new Error("Failed to delete saved job");
  }
}
