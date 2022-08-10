export interface User {
  login: string;
  fullName?: string;
  profileImg?: string;
  isOrganization?: boolean;
  email?: string;
  followers?: number;
  publicRepo?: number;
}
