import { UserAdminType } from "@/types/userType";
import api from "./api";
///api/Users
export async function getUsers(): Promise<UserAdminType[]> {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_HOST_URL}/api/Users`
    );
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch users | have no permission");
  }
}

export async function deleteUser(id: string): Promise<void> {
  console.log(`${import.meta.env.VITE_HOST_URL}/api/Users/${id}`);
  try {
    const response = await api.delete(
      `${import.meta.env.VITE_HOST_URL}/api/Users/${id}`
    );
    console.log("end");
  } catch (err) {
    throw new Error("Failed to delete user | have no permission");
  }
}
export async function activeUser(id: string): Promise<void> {
  try {
    const response = await api.post(
      `${import.meta.env.VITE_HOST_URL}/api/Users/${id}`
    );
  } catch (err) {
    throw new Error("Failed to active user | have no permission");
  }
}
