import { useAuth } from "@/context/authContext";
import Layout from "@/components/layout/Layout";
import { Navigate } from "react-router-dom";

// Protected route component that checks user role
export default function ProtectedRoute({
  element,
  allowedRoles,
}: {
  element: JSX.Element;
  allowedRoles: string[];
}) {
  const { user, isLoading } = useAuth();
  if (isLoading)
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dawam-purple"></div>
        </div>
      </Layout>
    );

  if (!user) {
    return <Navigate to="/login" />;
  }
  console.log(user.roles[0], allowedRoles[0]);
  if (user.roles[0] === allowedRoles[0]) {
    return element;
  } else {
    if (user.roles[0] === "Admin") {
      return <Navigate to="/dashboard" />;
    } else if (user.roles[0] === "JobPoster") {
      return <Navigate to="/employer" />;
    } else {
      return <Navigate to="/profile" />;
    }
  }
}
