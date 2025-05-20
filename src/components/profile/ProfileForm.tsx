import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { updateUserProfile, getUserById } from "@/utils/mockData";
import { User, PencilLine, Check, Upload } from "lucide-react";
import { UserType } from "@/types/userType";
import { useAuth } from "@/context/authContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateProfile } from "../auth/useUpdateProfile";

const ProfileForm = () => {
  const { user, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    careerLevel: 0,
    summary: "",
    profileImage: "",
    location: "",
    address: "",
    experienceYears: 0,
  });
  useEffect(() => {
    if (!isLoading && user) {
      setProfileData({
        name: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        title: user.title || "",
        careerLevel: +user.careerLevel || 0,
        summary: user.bio || "",
        profileImage: user.imagePath || "",
        experienceYears: user.experienceYears || 0,
        location: user.location || "",
        address: user.address || "",
      });
      setPreviewUrl(`${import.meta.env.VITE_HOST_URL}${user.imagePath}` || "");
    }
  }, [user, isLoading]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { isPending, mutate } = useUpdateProfile();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);

      // Create a preview URL for the selected image
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (typeof fileReader.result === "string") {
          setPreviewUrl(fileReader.result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (user.fullName !== profileData.name)
      formData.append("FullName", profileData.name);
    if (user.bio !== profileData.summary)
      formData.append("Bio", profileData.summary);
    if (user.experienceYears !== profileData.experienceYears)
      formData.append("ExperienceYears", "" + profileData.experienceYears);
    if (user.address !== profileData.address)
      formData.append("Address", profileData.address);
    if (user.careerLevel !== profileData.careerLevel)
      formData.append("CareerLevel", "" + profileData.careerLevel);
    if (user.location !== profileData.location)
      formData.append("Location", "" + profileData.location);
    if (user.phone !== profileData.phone)
      formData.append("Phone", "" + profileData.phone);
    if (user.title !== profileData.title)
      formData.append("Title", "" + profileData.title);
    if (imageFile) formData.append("Image", imageFile);

    mutate(formData, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dawam-purple"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-dawam-dark-purple dark:text-white">
          Profile Information
        </h2>
        <Button
          variant="outline"
          className="flex items-center gap-1 text-dawam-purple hover:bg-dawam-purple hover:text-white"
          onClick={() => {
            setIsEditing(!isEditing);
            if (previewUrl !== profileData.profileImage) {
              setPreviewUrl(
                `${import.meta.env.VITE_HOST_URL}${profileData.profileImage}`
              );
            }
          }}
        >
          {isEditing ? (
            <>
              <Check size={16} /> Cancel
            </>
          ) : (
            <>
              <PencilLine size={16} /> Edit Profile
            </>
          )}
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-3 group">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-500">
                <User size={48} />
              </div>
            )}
            {isEditing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-100 group-hover:opacity-90 transition-opacity cursor-pointer">
                <Upload size={24} className="text-white" />
              </div>
            )}
          </div>

          {isEditing && (
            <div className="mt-2 w-full max-w-xs">
              <Label htmlFor="profileImage" className="block mb-1">
                Profile Photo
              </Label>
              <Input
                id="profileImage"
                name="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload a profile image (max 5MB)
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name" className="block mb-1">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              defaultValue={user.fullName}
              value={profileData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-50 dark:bg-gray-700" : ""}
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
              onChange={handleInputChange}
              placeholder="software engineer"
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-50 dark:bg-gray-700" : ""}
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
              onChange={handleInputChange}
              placeholder="johndoe@example.com"
              readOnly={true}
              disabled={true}
              className={!isEditing ? "bg-gray-50 dark:bg-gray-700" : ""}
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
              onChange={handleInputChange}
              placeholder="01XXXXXXXXX"
              maxLength={11}
              minLength={11}
              type="tel"
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-50 dark:bg-gray-700" : ""}
            />
          </div>
          <div>
            <Label htmlFor="jobType">Career level</Label>
            <Select
              disabled={!isEditing}
              value={profileData.careerLevel.toString()}
              onValueChange={(value) =>
                setProfileData((prev) => ({ ...prev, careerLevel: +value }))
              }
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
              onChange={handleInputChange}
              placeholder="1-3 years"
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-50 dark:bg-gray-700" : ""}
            />
          </div>
          <div>
            <Label htmlFor="location" className="block mb-1">
              Location
            </Label>
            <Input
              id="location"
              name="location"
              value={profileData.location}
              onChange={handleInputChange}
              placeholder="cairo , alex ,etc"
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-50 dark:bg-gray-700" : ""}
            />
          </div>
          <div>
            <Label htmlFor="address" className="block mb-1">
              address
            </Label>
            <Input
              id="address"
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              placeholder="18 street city center"
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-50 dark:bg-gray-700" : ""}
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
            value={profileData.summary}
            onChange={handleInputChange}
            placeholder="Write a short summary about yourself"
            readOnly={!isEditing}
            className={
              !isEditing
                ? "bg-gray-50 dark:bg-gray-700 min-h-[120px]"
                : "min-h-[120px]"
            }
          />
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end">
            <Button
              disabled={isPending}
              type="submit"
              className="bg-dawam-purple hover:bg-secondary-purple text-white"
            >
              Save Changes
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;
