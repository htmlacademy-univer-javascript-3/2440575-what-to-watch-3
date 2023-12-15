export type UserData = {
    name: string;
    avatarUrl: string;
    email: string;
    token: string;
  };

export type User = Omit<UserData, 'token'>
