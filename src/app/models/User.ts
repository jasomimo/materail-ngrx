export interface User {
  login: string;
  name: string;
  avatar_url: string;
  type?: boolean;
  email?: string;
  followers: number;
  public_repos: number;
  id: number;
  repos_url?: string;
}
