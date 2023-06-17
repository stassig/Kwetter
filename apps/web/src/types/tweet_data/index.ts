export interface TweetData {
  _id: string;
  profile_image_url: string;
  created_at: string;
  user_id: string;
  content: string;
  likes_count: number;
  username: string;
  liked: boolean;
  liked_by: string[];
}
