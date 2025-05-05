export type JobType = {
  id: number;
  title: string;
  location: string;
  description: string;
  createdAt: Date;
  isClosed: boolean;
  jobType: number; // e.g., "Full-time", "Part-time", "Contract"
  careerLevel: number; // e.g., "Entry", "Mid", "Senior"
  requirements: string;
  categoryName: string;
};
