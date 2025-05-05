
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import AuthCard from "@/components/auth/AuthCard";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "Recovery email sent",
        description: "Check your inbox for password reset instructions",
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <AuthCard
        title="Forgot Password"
        description="Enter your email and we'll send you instructions to reset your password"
      >
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
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
            
            <Button
              type="submit"
              className="w-full bg-dawam-purple hover:bg-secondary-purple text-white"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Instructions"}
            </Button>
            
            <div className="text-center mt-4">
              <Link to="/login" className="text-sm text-dawam-purple hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <div className="py-4 text-center">
            <div className="mb-6 mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
              Check Your Email
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We've sent password reset instructions to:
              <br />
              <span className="font-medium">{email}</span>
            </p>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Didn't receive the email? Check your spam folder or:
              </p>
              
              <Button
                onClick={handleSubmit}
                variant="outline"
                className="border-dawam-purple text-dawam-purple hover:bg-dawam-purple hover:text-white"
              >
                Resend Email
              </Button>
              
              <div className="mt-4">
                <Link to="/login" className="text-sm text-dawam-purple hover:underline">
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </AuthCard>
    </Layout>
  );
};

export default ForgotPassword;
