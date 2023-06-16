// Description: Timeline Data Access Layer
import { Timeline } from "../models/timeline";

export async function GetTimelines() {
  const timelines = await Timeline.find();
  return timelines;
}

export async function CreateTimeline(data: any) {
  const timeline = await Timeline.create(data).catch((error) => {
    return null;
  });
  return timeline;
}
