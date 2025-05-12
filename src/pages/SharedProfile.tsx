import Layout from "@/components/layout/Layout";
import ProfileForm from "@/components/profile/ProfileForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services/authServices";
import { useParams } from "react-router-dom";
import Spinner from "@/components/ui/Spinner";

const SharedProfile = () => {
  const { slug } = useParams();
  const { isPending, data: profileData } = useQuery({
    queryFn: () => getProfile(slug),
    queryKey: ["profile", slug],
    enabled: !!slug,
  });
  // const profileData = {
  //   fullName: "John Doe",
  //   title: "Software Engineer",
  //   email: "mahmoud2030@gmail",
  //   phone: "+1 (123) 456-7890",
  //   careerLevel: 0,
  //   experienceYears: 3,
  //   location: "Cairo, Egypt",
  //   address: "18 Street, City Center",
  //   imagePath: "",
  //   summary:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  // };
  if (isPending) return <Spinner />;
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-dawam-dark-purple dark:text-white">
          <span
            className="text-dawam-purple uppercase
          "
          >
            {profileData.fullName}
          </span>{" "}
          Profile
        </h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsContent value="profile">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-dawam-dark-purple dark:text-white">
                  Profile Information
                </h2>
              </div>

              <form>
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-3 group">
                    {profileData.imagePath ? (
                      <img
                        src={`${import.meta.env.VITE_HOST_URL}${
                          profileData.imagePath
                        }`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-gray-500">
                        <User size={48} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="block mb-1">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={profileData.fullName}
                      placeholder="John Doe"
                      readOnly={true}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="block mb-1">
                      Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={profileData.title}
                      placeholder="software engineer"
                      readOnly={true}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="block mb-1">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      placeholder="johndoe@example.com"
                      readOnly={true}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="block mb-1">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      placeholder="+1 (123) 456-7890"
                      readOnly={true}
                    />
                  </div>
                  <div>
                    <Label htmlFor="jobType">Career level</Label>
                    <Select
                      disabled={true}
                      value={profileData.careerLevel.toString()}
                    >
                      <SelectTrigger id="jobType" className="w-full">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="0">Senior</SelectItem>
                          <SelectItem value="1">Junior</SelectItem>
                          <SelectItem value="2">Fresh</SelectItem>
                          <SelectItem value="3">Internship</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experienceYears" className="block mb-1">
                      Experience Years
                    </Label>
                    <Input
                      min={0}
                      max={20}
                      type="number"
                      id="experienceYears"
                      name="experienceYears"
                      value={profileData.experienceYears}
                      placeholder="1-3 years"
                      readOnly={true}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <Label htmlFor="summary" className="block mb-1">
                    Professional Summary
                  </Label>
                  <Textarea
                    id="summary"
                    name="summary"
                    value={profileData.bio}
                    placeholder="no summary available"
                    readOnly={true}
                    className={"bg-gray-50 dark:bg-gray-700 min-h-[120px]"}
                  />
                </div>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SharedProfile;
