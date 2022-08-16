export interface FullUser {
  id: number;
  login: string;
  fulllName: string;
  profileImg: string;
  isOrganization?: boolean;
  email: string;
  publicRepo?: number;
  repos_url: string;
}
