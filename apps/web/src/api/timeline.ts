import { Timeline } from "../types/timeline";

const URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
const GATEWAY_URL =
  process.env.NEXT_PUBLIC_GATEWAY_URL || "http://localhost:8080";

export const getTimelineByUserId = async (
  user_id: string
): Promise<Timeline> => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();

  const response = await fetch(`${GATEWAY_URL}/timeline/${user_id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenData,
    },
  });

  const timeline = await response.json();

  return timeline;
};
