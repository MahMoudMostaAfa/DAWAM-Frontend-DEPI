import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/authContext";
import { useLogout } from "../auth/useLogout";
import { json } from "stream/consumers";
import { stringify } from "querystring";
import { parse } from "path";

const NavBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("isDark")) || false
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mutate, isPending } = useLogout();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem("isDark"));
    if (storedDarkMode) {
      setIsDarkMode(storedDarkMode);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    localStorage.setItem("isDark", JSON.stringify(!isDarkMode));
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle logout
  const handleLogout = () => {
    mutate();
  };

  // Determine which dashboard to show based on user role
  const getDashboardLink = () => {
    if (!user) return "/login";

    if (user.roles[0] === "Admin") {
      return "/dashboard";
    } else if (user.roles[0] === "JobPoster") {
      return "/employer";
    } else {
      return "/profile";
    }
  };

  const dashboardVisible =
    user && (user.roles[0] === "Admin" || user.roles[0] === "JobPoster");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-dawam-dark-purple shadow-sm dark:shadow-gray-800 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2  ">
          <img className="h-10 md:h-12 max-h-full" src="/lOGO.jpg" alt="log" />
          {/* <span className="text-2xl font-bold text-dawam-purple">DAWAM</span> */}
        </Link>

        {/* Desktop Navigation */}
        <div className=" hidden md:flex items-center space-x-10 ml-36">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-300 hover:text-dawam-purple dark:hover:text-dawam-purple transition"
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className="text-gray-700 dark:text-gray-300 hover:text-dawam-purple dark:hover:text-dawam-purple transition"
          >
            Jobs
          </Link>
          <Link
            to="/about"
            className="text-gray-700 dark:text-gray-300 hover:text-dawam-purple dark:hover:text-dawam-purple transition"
          >
            About
          </Link>
          <Link
            to="/services"
            className="text-gray-700 dark:text-gray-300 hover:text-dawam-purple dark:hover:text-dawam-purple transition"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 dark:text-gray-300 hover:text-dawam-purple dark:hover:text-dawam-purple transition"
          >
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4 ">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user && !isLoading ? (
            <div className="flex items-center space-x-4">
              {/* User Avatar Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none group">
                  <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition">
                    <Avatar className="h-9 w-9 border-2 border-gray-200 dark:border-gray-700 group-hover:border-dawam-purple transition">
                      {user?.imagePath ? (
                        <AvatarImage
                          src={`${import.meta.env.VITE_HOST_URL}${
                            user.imagePath
                          }`}
                          alt={user.fullName}
                        />
                      ) : (
                        <AvatarFallback className="bg-dawam-purple text-white">
                          {user?.fullName
                            ? user.fullName.charAt(0).toUpperCase()
                            : "U"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {user?.fullName}
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/profile"
                        className="flex cursor-pointer items-center"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    {dashboardVisible && (
                      <DropdownMenuItem asChild>
                        <Link
                          to={getDashboardLink()}
                          className="flex cursor-pointer items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4"
                          >
                            <rect width="7" height="9" x="3" y="3" rx="1" />
                            <rect width="7" height="5" x="14" y="3" rx="1" />
                            <rect width="7" height="9" x="14" y="12" rx="1" />
                            <rect width="7" height="5" x="3" y="16" rx="1" />
                          </svg>
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    disabled={isPending}
                    onClick={handleLogout}
                    className="cursor-pointer text-red-500 focus:text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{isPending ? "Logging out .." : "Log out"} </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-dawam-purple hover:bg-secondary-purple text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {user && !isLoading && (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-8 w-8 border-2 border-gray-200 dark:border-gray-700">
                  {user?.imagePath ? (
                    <AvatarImage
                      src={`${import.meta.env.VITE_HOST_URL}${user.imagePath}`}
                      alt={user.fullName}
                    />
                  ) : (
                    <AvatarFallback className="bg-dawam-purple text-white">
                      {user?.fullName
                        ? user.fullName.charAt(0).toUpperCase()
                        : "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link
                      to="/profile"
                      className="flex cursor-pointer items-center"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  {dashboardVisible && (
                    <DropdownMenuItem
                      asChild
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link
                        to={getDashboardLink()}
                        className="flex cursor-pointer items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4"
                        >
                          <rect width="7" height="9" x="3" y="3" rx="1" />
                          <rect width="7" height="5" x="14" y="3" rx="1" />
                          <rect width="7" height="9" x="14" y="12" rx="1" />
                          <rect width="7" height="5" x="3" y="16" rx="1" />
                        </svg>
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="cursor-pointer text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-dawam-dark-purple shadow-lg py-4 px-6 absolute w-full">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-dawam-purple dark:hover:text-dawam-purple py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className="text-gray-700 dark:text-gray-300 hover:text-dawam-purple dark:hover:text-dawam-purple py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link
              to="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-dawam-purple dark:hover:text-dawam-purple py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-gray-700 dark:text-gray-300 hover:text-dawam-purple dark:hover:text-dawam-purple py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-dawam-purple dark:hover:text-dawam-purple py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {!(user && !isLoading) && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full mb-2">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-dawam-purple hover:bg-secondary-purple text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
