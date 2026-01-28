import { JOB_API_URL } from "../constants/api";

export const fetchJobs = async () => {
  const response = await fetch(JOB_API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await response.json();
  return data.data;
};
