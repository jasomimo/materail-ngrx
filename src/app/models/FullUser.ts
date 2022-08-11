export interface FullUser {
  login: string;
  fulllName: string;
  profileImg: string;
  isOrganization?: boolean;
  email: string;
  followers?: number;
  publicRepo?: number;
}
