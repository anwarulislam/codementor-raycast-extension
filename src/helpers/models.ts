export type RequestType = "one_on_one" | "longterm" | "offline_help" | "code_review";

export interface RequestItem {
  random_key: string;
  title: string;
  body: string;
  request_type: RequestType;
  aasm_state: string;
  estimated_budget: string;
  is_featured: boolean;
  has_recruiter_addon: boolean;
  created_at: number;
  interest_count: number;
  user: User;
  read: boolean;
  categories: Category[];
}

export type RequestDetail = RequestItem & {
  skipped: boolean;
  reported_as_homework: boolean;
  can_express_interest: boolean;
  interest: Interest;
  user: User;
  categories: Category[];
  detail: Detail;
};

interface Category {
  name: string;
  url_string: string;
}

export interface Detail {
  kind: string;
  description: string;
  estimated_length: string;
}

interface User {
  name: string;
  username: string;
  small_avatar_url: string;
  time_zone_display?: string;
  is_student?: boolean;
}

interface Interest {
  message: string;
}

export interface ScheduleItem {
  random_key: string;
  aasm_state: string;
  start_at: number;
  end_at: number;
  mentor: User;
  user: User;
}
