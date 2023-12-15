export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserData {
  name: string;
  avatarUrl: string;
  email: string;
  token: string;
}

export enum AuthorizationStatus {
  Unknown = 'Unknown',
  Authorized = 'Authorized',
  Unauthorized = 'Unauthorized',
}
