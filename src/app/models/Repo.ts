export interface Repo {
  name: string;
  description: string;
  stargazers_count: number;
  isOrganization?: boolean;
  watchers: number;
  created_at: string;
  updated_at: string;
}
