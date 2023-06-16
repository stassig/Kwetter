// Description: Timeline Service Layer

import * as prisma from "../integration/index";

export async function GetTimelines() {
  const timelines = await prisma.GetTimelines();

  return timelines;
}

export async function CreateTimeline(data: any) {
  const timeline = await prisma.CreateTimeline(data);

  return timeline;
}
