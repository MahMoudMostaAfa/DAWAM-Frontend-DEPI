export type UserType = {
  id?: string;
  fullName?: string;
  email?: string;
  title?: string | null;
  bio?: string | null;
  phone?: string | null;
  address?: string | null;
  location?: string | null;
  careerLevel?: number | null;
  imagePath?: string | null;
  isActive?: boolean | null;
  isPremium?: boolean | null;
  experienceYears?: number | null;
  roles?: string[];
  createdAt?: Date;
};

export type UserAdminType = {
  id: string;
  fullName: string;
  email: string;
  userName: string;
  isActive: boolean;
  createdAt: Date;
  phone: string | null;
  role: string[];
};
