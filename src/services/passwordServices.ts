import axios from "axios";

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_HOST_URL}/api/Auth/forgot-password`,
      { email }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to send password reset email");
  }
};

export async function resetPassword({
  userId,
  token,
  newPassword,
  confirmPassword,
}: {
  userId: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<any> {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_HOST_URL}/api/Auth/reset-password`,
      { userId, token, newPassword, confirmPassword }
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
    throw new Error("Failed to reset password");
  }
}
