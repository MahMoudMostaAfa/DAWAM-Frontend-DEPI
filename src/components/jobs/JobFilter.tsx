import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, Filter, X } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/types/applicationType";
import { getCategories } from "@/services/applicationsServices";
import Spinner from "../ui/Spinner";

interface JobFilterProps {
  onFilterChange: () => void;
}

const JobFilter = ({ onFilterChange }: JobFilterProps) => {
  const { data: categories, isPending } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("");
  const [careerLevel, setCareerLevel] = useState("");
  const [category, setCategory] = useState("");
  const [sortDate, setSortDate] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Initialize filter values from URL search params
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setJobType(searchParams.get("type") || "");
    setCareerLevel(searchParams.get("level") || "");
    setCategory(searchParams.get("category") || "");
    setSortDate(searchParams.get("sort") || "");

    // Apply filters on initial load if there are any params
    if ([...searchParams.entries()].length > 0) {
      handleFilterSubmit();
    }
  }, []);

  if (isPending) return <Spinner />;

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterSubmit = () => {
    onFilterChange();

    // Update URL search params
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (jobType) params.set("type", jobType);
    if (careerLevel) params.set("level", careerLevel);
    if (category) params.set("category", category);
    if (sortDate) params.set("sort", sortDate);

    navigate(`/jobs?${params.toString()}`);
  };

  const handleFilterReset = () => {
    setSearchTerm("");
    setJobType("");
    setCareerLevel("");
    setCategory("");
    setSortDate("");

    navigate("/jobs");
  };

  return (
    <div className="mb-8">
      {/* Search bar with filter button for mobile */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for jobs..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-dawam-purple focus:border-dawam-purple dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-dawam-purple hover:bg-secondary-purple text-white w-full md:w-auto"
            onClick={handleFilterSubmit}
          >
            Search
          </Button>
          <Button
            variant="outline"
            onClick={handleFilterToggle}
            className="border-dawam-purple text-dawam-purple hover:bg-dawam-purple hover:text-white md:hidden"
          >
            <Filter size={18} className="mr-2" /> Filters
          </Button>
        </div>
      </div>

      {/* Filter section (always visible on desktop, toggleable on mobile) */}
      <div
        className={`${
          !isFilterOpen ? "hidden md:block" : "block"
        } transition-all duration-300`}
      >
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Filter Jobs</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFilterReset}
                  className="text-sm"
                >
                  <X size={14} className="mr-1" /> Reset
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="md:hidden text-sm"
                  onClick={handleFilterToggle}
                >
                  Close
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="jobType">Job Type</Label>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger id="jobType" className="w-full">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="careerLevel">Career Level</Label>
              <Select value={careerLevel} onValueChange={setCareerLevel}>
                <SelectTrigger id="careerLevel" className="w-full">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="fresh">Fresh Graduate</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Job Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories?.map((cat: Category) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                    {/* Uncomment and modify the following lines if you want to add static categories */}
                    {/* <SelectItem value="web-development">
                      Web Development
                    </SelectItem>
                    <SelectItem value="mobile-development">
                      Mobile Development
                    </SelectItem>
                    <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                    <SelectItem value="data-science">Data Science</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                    <SelectItem value="qa">Quality Assurance</SelectItem> */}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sortDate">Sort By Date</Label>
              <Select value={sortDate} onValueChange={setSortDate}>
                <SelectTrigger id="sortDate" className="w-full">
                  <SelectValue placeholder="Select sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobFilter;
