
import { JobType } from "@/components/jobs/JobCard";

// Sample users data
export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In a real app, this would be securely hashed
    role: "jobseeker",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    summary: "Experienced software developer with 5 years in web development.",
    phone: "+1 (123) 456-7890",
    isPremium: false,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123", // In a real app, this would be securely hashed
    role: "employer",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    summary: "HR Manager with 10+ years experience in tech recruitment.",
    phone: "+1 (234) 567-8901",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123", // In a real app, this would be securely hashed
    role: "admin",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    summary: "System administrator for the DAWAM platform.",
    phone: "+1 (345) 678-9012",
  },
];

// Sample jobs data
export const jobs: JobType[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechSolutions Inc.",
    location: "New York, NY (Remote)",
    type: "Full-time",
    level: "Mid-Level",
    category: "Web Development",
    posted: "2 days ago",
    description: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces and implementing web designs using modern frameworks like React.",
    requirements: [
      "3+ years experience with React",
      "Strong knowledge of JavaScript, HTML, and CSS",
      "Experience with responsive design",
      "Familiarity with REST APIs",
    ],
    isClosed: false,
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataWorks",
    location: "San Francisco, CA",
    type: "Full-time",
    level: "Senior",
    category: "Web Development",
    posted: "1 week ago",
    description: "Join our engineering team to build robust backend systems. You will be responsible for developing and maintaining our server-side applications and ensuring high performance.",
    requirements: [
      "5+ years of backend development",
      "Strong knowledge of Node.js or Python",
      "Experience with databases (MySQL, PostgreSQL)",
      "Understanding of server architecture",
    ],
    isClosed: false,
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Creative Solutions",
    location: "Austin, TX (Remote)",
    type: "Contract",
    level: "Mid-Level",
    category: "UI/UX Design",
    posted: "3 days ago",
    description: "We're seeking a talented UX/UI Designer to create amazing user experiences. You will work on designing user interfaces for web and mobile applications with a focus on usability and visual appeal.",
    requirements: [
      "Portfolio demonstrating UI design skills",
      "Experience with Figma, Sketch, or Adobe XD",
      "Understanding of user-centered design principles",
      "Knowledge of HTML/CSS is a plus",
    ],
    isClosed: false,
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudOps",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    category: "DevOps",
    posted: "1 day ago",
    description: "Help us build and maintain our cloud infrastructure. You will be responsible for implementing CI/CD pipelines, managing cloud resources, and ensuring system reliability and security.",
    requirements: [
      "4+ years in DevOps or SRE roles",
      "Experience with AWS, Azure, or GCP",
      "Knowledge of Docker, Kubernetes",
      "Scripting skills (Python, Bash)",
    ],
    isClosed: true,
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "AI Innovations",
    location: "Boston, MA (Hybrid)",
    type: "Full-time",
    level: "Senior",
    category: "Data Science",
    posted: "5 days ago",
    description: "Join our data science team to develop machine learning models and analyze complex datasets. You will work on cutting-edge AI projects and help derive insights from data.",
    requirements: [
      "Masters or PhD in a quantitative field",
      "Experience with Python and data science libraries",
      "Knowledge of machine learning algorithms",
      "Background in statistical analysis",
    ],
    isClosed: false,
  },
  {
    id: 6,
    title: "Mobile App Developer",
    company: "AppMakers",
    location: "Seattle, WA",
    type: "Full-time",
    level: "Mid-Level",
    category: "Mobile Development",
    posted: "1 week ago",
    description: "Develop iOS and Android applications for our clients. You will be responsible for building and maintaining mobile applications, implementing new features, and ensuring app performance.",
    requirements: [
      "3+ years in mobile app development",
      "Experience with Swift or Kotlin",
      "Knowledge of React Native or Flutter is a plus",
      "Understanding of mobile app architecture",
    ],
    isClosed: false,
  },
  {
    id: 7,
    title: "Product Manager",
    company: "Product Innovations",
    location: "Chicago, IL (Hybrid)",
    type: "Full-time",
    level: "Senior",
    category: "Product Management",
    posted: "3 days ago",
    description: "Lead product development from concept to launch. You will work with cross-functional teams to define product requirements, oversee development, and ensure successful product delivery.",
    requirements: [
      "5+ years of product management experience",
      "Strong analytical and problem-solving skills",
      "Excellent communication and leadership abilities",
      "Technical background is preferred",
    ],
    isClosed: false,
  },
  {
    id: 8,
    title: "IT Support Specialist",
    company: "TechHelp Inc.",
    location: "Miami, FL",
    type: "Part-time",
    level: "Entry-Level",
    category: "IT Support",
    posted: "2 days ago",
    description: "Provide technical support to our clients. You will troubleshoot hardware and software issues, assist with system setups, and ensure smooth operation of IT infrastructure.",
    requirements: [
      "Basic knowledge of computer systems",
      "Good problem-solving skills",
      "Customer service orientation",
      "IT certifications are a plus",
    ],
    isClosed: false,
  },
];

// Sample applications data
export const applications = [
  {
    id: 1,
    userId: 1,
    jobId: 3,
    appliedAt: "2023-11-10T14:30:00",
    experience: "4 years working as a UX designer",
    yearsOfExperience: 4,
    expectedSalary: "$90 per hour",
    cvUrl: "/mock-cv.pdf",
  },
  {
    id: 2,
    userId: 1,
    jobId: 5,
    appliedAt: "2023-11-05T09:15:00",
    experience: "Completed PhD in Computer Science with focus on machine learning",
    yearsOfExperience: 6,
    expectedSalary: "$130,000",
    cvUrl: "/mock-cv.pdf",
  },
];

// Function to authenticate a user with email and password
export const authenticateUser = (email: string, password: string) => {
  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

// Function to get a user by ID
export const getUserById = (id: number) => {
  const user = users.find(user => user.id === id);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

// Function to update user profile
export const updateUserProfile = (id: number, profileData: any) => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...profileData };
    const { password, ...userWithoutPassword } = users[userIndex];
    return userWithoutPassword;
  }
  return null;
};

// Function to get jobs with filtering
export const getJobs = (filters: any = {}) => {
  let filteredJobs = [...jobs];
  
  // Filter out closed jobs unless explicitly showing them
  if (!filters.showClosed) {
    filteredJobs = filteredJobs.filter(job => !job.isClosed);
  }
  
  if (filters.searchTerm) {
    const searchTerm = filters.searchTerm.toLowerCase();
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm) || 
      job.company.toLowerCase().includes(searchTerm) || 
      job.description.toLowerCase().includes(searchTerm)
    );
  }
  
  if (filters.jobType) {
    filteredJobs = filteredJobs.filter(job => 
      job.type.toLowerCase() === filters.jobType.toLowerCase()
    );
  }
  
  if (filters.careerLevel) {
    filteredJobs = filteredJobs.filter(job => 
      job.level.toLowerCase().includes(filters.careerLevel.toLowerCase())
    );
  }
  
  if (filters.category) {
    filteredJobs = filteredJobs.filter(job => 
      job.category.toLowerCase().includes(filters.category.toLowerCase())
    );
  }

  // Sorting by date
  if (filters.sortDate) {
    filteredJobs = filteredJobs.sort((a, b) => {
      const dateA = new Date(a.posted);
      const dateB = new Date(b.posted);
      return filters.sortDate === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
  }
  
  return filteredJobs;
};

// Function to get a job by ID
export const getJobById = (id: number) => {
  return jobs.find(job => job.id === id);
};

// Function to add a new job
export const addJob = (jobData: Omit<JobType, "id">) => {
  const newId = Math.max(...jobs.map(job => job.id)) + 1;
  const newJob = { id: newId, ...jobData };
  jobs.push(newJob);
  return newJob;
};

// Function to close/open a job
export const toggleJobStatus = (id: number) => {
  const jobIndex = jobs.findIndex(job => job.id === id);
  if (jobIndex !== -1) {
    jobs[jobIndex].isClosed = !jobs[jobIndex].isClosed;
    return jobs[jobIndex];
  }
  return null;
};

// Function to get user applications
export const getUserApplications = (userId: number) => {
  const userApps = applications.filter(app => app.userId === userId);
  return userApps.map(app => {
    const job = getJobById(app.jobId);
    return { ...app, job };
  });
};

// Function to get applications for a job
export const getJobApplications = (jobId: number) => {
  const jobApps = applications.filter(app => app.jobId === jobId);
  return jobApps.map(app => {
    const user = getUserById(app.userId);
    return { ...app, user };
  });
};

// Function to get jobs posted by an employer
export const getEmployerJobs = (userId: number) => {
  // In a real app, each job would have an employerId field
  // For mock data, let's assume employer with ID 2 owns all jobs except ID 1 and 3
  if (userId === 2) {
    return jobs.filter(job => job.id !== 1 && job.id !== 3);
  }
  return [];
};

// Function to update user premium status
export const updatePremiumStatus = (userId: number, isPremium: boolean) => {
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users[userIndex].isPremium = isPremium;
    return users[userIndex];
  }
  return null;
};

// Function to check if user is premium
export const isUserPremium = (userId: number) => {
  const user = users.find(user => user.id === userId);
  return user ? !!user.isPremium : false;
};
