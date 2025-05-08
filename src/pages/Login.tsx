import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { authenticateUser } from "@/utils/mockData";
import Layout from "@/components/layout/Layout";
import AuthCard from "@/components/auth/AuthCard";
import { useLogin } from "@/components/auth/useLogin";
// import { Toast } from "@/components/ui/toast";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { mutate, isPending, isError } = useLogin();
  const navigate = useNavigate();
  // const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // setLoading(true);
    // setError("");
    mutate(
      {
        email,
        password,
      },
      {
        onSuccess(data) {
          toast.success("Login successful!");
          navigate("/");
        },
      }
    );

    // Simulating login process
    // setTimeout(() => {
    //   const user = authenticateUser(email, password);

    //   if (user) {
    //     localStorage.setItem("dawamUser", JSON.stringify(user));
    //     toast({
    //       title: "Login Successful",
    //       description: `Welcome back, ${user.name}!`,
    //     });

    //     // Redirect based on user role
    //     if (user.role === "admin") {
    //       navigate("/dashboard");
    //     } else if (user.role === "employer") {
    //       navigate("/employer");
    //     } else {
    //       navigate("/jobs");
    //     }
    //   } else {
    //     setError("Invalid email or password. Please try again.");
    //   }

    //   setLoading(false);
    // }, 1000);
  };

  return (
    <Layout>
      <AuthCard
        title="Login to DAWAM"
        description="Enter your credentials to access your account"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 mb-4 text-sm bg-red-100 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-dawam-purple hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-dawam-purple hover:bg-secondary-purple text-white"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-dawam-purple hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                Demo Accounts
              </span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Job Seeker:</span>{" "}
              mahmoud@gmail.com / @#&22552002Mahmoud
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Employer:</span> mahmoud@yahoo.com
              / @#&22552002Mahmoud
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Admin:</span> admin@dawam.com /
              Admin@12345
            </p>
          </div>
        </form>
      </AuthCard>
    </Layout>
  );
};

export default Login;
