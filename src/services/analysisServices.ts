import api from "./api";
export async function getAnalysis(): Promise<any> {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_HOST_URL}/api/Analysis`
    );
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch analysis | have no permission");
  }
}
