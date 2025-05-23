export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  display_name?: string | null;
  bio?: string | null;
};

export type UserRegistrationData = {
  username: string;
  email: string;
  password: string;
};
