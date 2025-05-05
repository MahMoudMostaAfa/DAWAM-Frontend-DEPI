import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { jobs, applications, users } from "@/utils/mockData";

const AdminStats = ({ data }: { data: any }) => {
  // Job type distribution data
  const jobTypeData = [
    { name: "full-time", value: data.fullTimeJobs },
    { name: "part-time", value: data.partTimeJobs },
    { name: "remote", value: data.remoteJobs },
  ];

  // // Application data by experience level
  // const applicationExperienceData = applications.reduce((acc: any[], app) => {
  //   const expYears = app.yearsOfExperience;
  //   let expRange = "";

  //   if (expYears < 2) expRange = "0-2 years";
  //   else if (expYears < 5) expRange = "2-5 years";
  //   else if (expYears < 10) expRange = "5-10 years";
  //   else expRange = "10+ years";

  //   const existingRange = acc.find((item) => item.name === expRange);
  //   if (existingRange) {
  //     existingRange.value++;
  //   } else {
  //     acc.push({ name: expRange, value: 1 });
  //   }
  //   return acc;
  // }, []);

  // // User roles data
  const userRolesData = [
    { name: "jobseekers", value: data.jobAppliersCount },
    { name: "employers", value: data.jobPostersCount },
  ];
  const careerLevelData = [
    { name: "senior jobs", value: data.seniorJobs },
    { name: "junior jobs", value: data.juniorJobs },
    { name: "fresh jobs", value: data.freshJobs },
    { name: "interns", value: data.internshipJobs },
  ];
  // // Career level data
  // const careerLevelData = jobs.reduce((acc: any[], job) => {
  //   const existingLevel = acc.find((item) => item.name === job.level);
  //   if (existingLevel) {
  //     existingLevel.value++;
  //   } else {
  //     acc.push({ name: job.level, value: 1 });
  //   }
  //   return acc;
  // }, []);

  // Mock monthly application data
  const monthlyApplicationData = Object.entries(data.monthlyApplications).map(
    ([month, count]) => ({
      name: month,
      applications: count,
    })
  );

  // Colors for charts
  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#0088FE",
    "#00C49F",
  ];

  // Platform overview data
  const platformOverview = [
    { name: "Total Jobs", value: data.totalJobs },
    { name: "Total Applications", value: data.totalApplications },
    { name: "Total Users", value: data.totalUsers },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platformOverview.map((item, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {item.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-dawam-dark-purple dark:text-white">
                {item.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Type Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={jobTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {jobTypeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Roles</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userRolesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userRolesData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Career Level Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={careerLevelData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Jobs" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Applications</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyApplicationData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="applications"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStats;
