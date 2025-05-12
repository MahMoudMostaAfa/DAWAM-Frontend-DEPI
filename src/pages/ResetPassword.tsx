import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import AuthCard from "@/components/auth/AuthCard";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/services/passwordServices";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Password reset successfully",
      });
      navigate("/login");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim() || !confirmNewPassword.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    if (!searchParams.has("userId") && !searchParams.has("token")) {
      toast({
        title: "Error",
        description: "Invalid link",
        variant: "destructive",
      });
      return;
    }
    // validate password strength
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d])(?=.{8,}).*$/;
    if (!passwordRegex.test(newPassword)) {
      toast({
        title: "Error",
        description:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
        variant: "destructive",
      });
      return;
    }

    const userId = searchParams.get("userId");
    const token = searchParams.get("token");

    mutate({
      userId: userId,
      token: token,
      newPassword,
      confirmPassword: confirmNewPassword,
    });
  };

  return (
    <Layout>
      <AuthCard title="Reset Password" description="Enter your new password ">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="new-password"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              new password
            </label>
            <Input
              id="email"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="cnew-password"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              confirm new password
            </label>
            <Input
              id="email"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-dawam-purple hover:bg-secondary-purple text-white"
            disabled={isPending}
          >
            {isPending ? "reseting..." : "Reset Password"}
          </Button>
        </form>
      </AuthCard>
    </Layout>
  );
};

export default ResetPassword;
