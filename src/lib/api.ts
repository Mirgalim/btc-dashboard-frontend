import { API_BASE_URL } from "./constants";
import { DashboardData } from "../types/dashboard";

export async function getDashboardData(days: number): Promise<DashboardData> {
  const url = new URL(`${API_BASE_URL}/dashboard`);
  url.searchParams.append("days", days.toString());

  const res = await fetch(url.toString());
  const json = await res.json();
  console.log("API response:", json);

  if (!res.ok) throw new Error("Failed to fetch dashboard data");

  return json;
}
