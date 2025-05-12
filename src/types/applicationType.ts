import { jobType } from "@/utils/DataMaps";
import { StringifyOptions } from "querystring";

export type ApplicationType = {
  id: number;
  posterName: string;
  jobId: number;
  jobType: number;
  careerLevel: number;
  jobTitle: string;
  status: string;
  appliedAt: Date;
};
export type MyPostedJob = {
  id: number;
  title: string;
  description: string;
  requirements: string;
  jobType: number;
  location: string;
  careerLevel: number;
  isClosed: boolean;
  createdAt: Date;
  categoryName: string;
  applicationCount: number;
};

export type MyPostedJobApplication = {
  id: number;
  userFullName: string;
  userEmail: string;
  yearsOfExperience: number;
  previousExperience: string;
  expectedSalary: number;
  phone: string;
  cvFilePath: string;
  imagePath: string;
  appliedAt: Date;
  slug: string;
};
export type Category = {
  id: number;
  name: string;
};
export type JobType = {
  title: string;
  description: string;
  requirements: string;
  jobType: number;
  careerLevel: number;
  location: string;
  categoryId: number;
};
