import axios, { Axios, AxiosError } from "axios";
import api from "./api";
import { promises } from "node:readline";
import { UserType } from "@/types/userType";

export async function login(email: string, password: string) {
  try {
    const response = await api.post(
      `${import.meta.env.VITE_HOST_URL}/api/auth/login`,
      { email, password }
    );
    return response.data.token;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
export async function register(
  fullName: string,
  email: string,
  password: string,
  role: string
) {
  try {
    const response = await api.post(
      `${import.meta.env.VITE_HOST_URL}/api/auth/register`,
      { fullName, email, password, role }
    );
    return response.data.token;
  } catch (error) {
    // Handle error response
    let errMessage = "";
    error.response.data.forEach((err: { description: string }) => {
      errMessage += `${err.description} `;
    });

    // error.response.data.forEach((err: any) => {

    // console.error("Registration error:", errMessage);
    throw new Error(errMessage);
  }
}

export async function logout() {
  try {
    await api.post(`${import.meta.env.VITE_HOST_URL}/api/auth/logout`);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

export async function getUserProfile(): Promise<UserType> {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_HOST_URL}/api/auth/me`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

export async function updateUserProfile(formData: FormData) {
  try {
    const res = await api.put(
      `${import.meta.env.VITE_HOST_URL}/api/auth/me`,
      formData
    );
  } catch (error) {
    let errMessage = "";
    error.response.data.forEach((err: { description: string }) => {
      errMessage += `${err.description} `;
    });
    throw new Error(errMessage);
  }
}
export async function getProfile(slug: string): Promise<UserType> {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_HOST_URL}/api/Users/${slug}`
    );
    return res.data;
  } catch (error) {
    throw new Error("can not get profile");
  }
}
