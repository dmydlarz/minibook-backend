export class AuthPayload {
  user: {
    userId: number;
    displayName: string;
    email: string;
    firstname: string;
    lastname: string;
    avatar: string;
  }
  exp?: number;
  iat?: number;
}

  // export class AuthPayload {
  //   user: AuthUserPayload
  //   exp?: number;
  //   iat?: number;
  // }