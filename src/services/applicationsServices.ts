import {
  ApplicationType,
  Category,
  MyPostedJob,
  MyPostedJobApplication,
  JobType,
} from "@/types/applicationType";
import api from "./api";

export async function getApplications(): Promise<ApplicationType[]> {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_HOST_URL}/api/Application/user`
    );
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch applications | have no premsision");
  }
}
export async function getMyPostedJobs(): Promise<MyPostedJob[]> {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_HOST_URL}/api/Jobs/my-jobs`
    );
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch applications | have no premsision");
  }
}
export async function getApplicationsOfMyJob(
  id: number
): Promise<MyPostedJobApplication[]> {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_HOST_URL}/api/Application/job/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch applications | have no premsision");
  }
}
export async function closeJob(id: number): Promise<void> {
  try {
    const response = await api.delete(
      `${import.meta.env.VITE_HOST_URL}/api/Jobs/${id}`
    );
    return response.data;
  } catch (err) {
    throw new Error("Failed to close the job | have no premsision");
  }
}
//api/Categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_HOST_URL}/api/Categories`
    );
    return response.data;
  } catch (err) {
    throw new Error("Failed to get categories | have no premsision");
  }
}
export async function addJob(job: JobType): Promise<void> {
  try {
    const response = await api.post(
      `${import.meta.env.VITE_HOST_URL}/api/Jobs`,
      job
    );
  } catch (err) {
    // console.log(err.response);
    throw new Error("Failed to add job | have no premsision");
  }
}
///api/Application/apply
export async function applyOnJob(formData: FormData): Promise<void> {
  try {
    const response = await api.post(
      `${import.meta.env.VITE_HOST_URL}/api/Application/apply`,
      formData
    );
  } catch (err) {
    throw new Error("Failed to apply on job | have no premsision");
  }
}
