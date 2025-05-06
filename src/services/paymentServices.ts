import api from "./api";

export async function getSession(): Promise<void> {
  try {
    const res = await api.post(
      `${import.meta.env.VITE_HOST_URL}/api/Payments/create-checkout-session`
    );

    if (res.data.url) window.location.href = res.data.url;
  } catch (err) {
    throw new Error("failed to get seesion");
  }
}
