import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useMutation, useQuery } from "@tanstack/react-query";
import { addJob, getCategories } from "@/services/applicationsServices";
import Spinner from "../ui/Spinner";
import { Category } from "@/types/applicationType";
import { toast } from "sonner";
import { jobType } from "@/utils/DataMaps";
const JobPostForm = () => {
  const { data: categories, isPending } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
  });
  const { mutate, isPending: isPosting } = useMutation({
    mutationFn: addJob,
    onSuccess: () => {
      toast.success("job added successfully!");
    },
    onError: () => toast.error("failed to add job"),
  });
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "0",
    level: "0",
    category: "0",
    description: "",
    requirements: [""],
  });

  if (isPending) return <Spinner />;
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRequirementChange = (index: number, value: string) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      requirements: updatedRequirements,
    }));
  };

  const addRequirement = () => {
    setFormData((prevData) => ({
      ...prevData,
      requirements: [...prevData.requirements, ""],
    }));
  };

  const removeRequirement = (index: number) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      requirements: updatedRequirements,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty requirements
    const filteredRequirements = formData.requirements.filter(
      (req) => req.trim() !== ""
    );
    const jobData = {
      ...formData,
      requirements:
        filteredRequirements.length > 0
          ? filteredRequirements
          : ["No specific requirements"],
    };
    mutate(
      {
        title: jobData.title,
        careerLevel: +jobData.level,
        categoryId: +jobData.category,
        description: jobData.description,
        requirements: jobData.requirements.join(","),
        jobType: +jobData.type,
        location: jobData.location,
      },
      {
        onSuccess: () => {
          setFormData({
            title: "",
            location: "",
            type: "0",
            level: "0",
            category: "0",
            description: "",
            requirements: [""],
          });
        },
      }
    );

    // Reset form
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-dawam-dark-purple dark:text-white">
        Post a New Job
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="title" className="block mb-1">
              Job Title*
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Frontend Developer"
              required
            />
          </div>

          <div>
            <Label htmlFor="location" className="block mb-1">
              Location*
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., New York, NY"
              required
            />
          </div>

          <div>
            <Label htmlFor="category" className="block mb-1">
              Job Category*
            </Label>
            <Select
              value={formData.category.toString()}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select job category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat: Category) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="type" className="block mb-1">
              Job Type*
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Full-time</SelectItem>
                <SelectItem value="1">Part-time</SelectItem>
                <SelectItem value="2">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="level" className="block mb-1">
              Career Level*
            </Label>
            <Select
              value={formData.level}
              onValueChange={(value) => handleSelectChange("level", value)}
            >
              <SelectTrigger id="level">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Senior</SelectItem>
                <SelectItem value="1">Junior</SelectItem>
                <SelectItem value="2">Fresh Graduate</SelectItem>
                <SelectItem value="3">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description" className="block mb-1">
            Job Description*
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe the job role, responsibilities, and other relevant information"
            className="min-h-[120px]"
            required
          />
        </div>

        <div>
          <Label className="block mb-2">Requirements</Label>
          {formData.requirements.map((requirement, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <Input
                value={requirement}
                onChange={(e) => handleRequirementChange(index, e.target.value)}
                placeholder={`Requirement ${index + 1}`}
                className="flex-grow"
              />
              {formData.requirements.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeRequirement(index)}
                  className="flex-shrink-0"
                >
                  &times;
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addRequirement}
            className="mt-2 text-dawam-purple border-dawam-purple hover:bg-dawam-purple hover:text-white"
          >
            Add Requirement
          </Button>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-dawam-purple hover:bg-secondary-purple text-white"
            disabled={isPosting}
          >
            {isPosting ? "Posting..." : "Post Job"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobPostForm;
