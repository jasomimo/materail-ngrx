export interface User {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  followers: number;
  public_repos: number;
  repos_url?: string;
  type?: boolean;
  email?: string;
  token?: string;
}
