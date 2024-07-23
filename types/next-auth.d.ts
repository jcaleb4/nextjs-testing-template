import NextAuth, { Account, DefaultSession, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken?: Account.access_token;
    user?: User;
    error?: string;
  }
}

declare module 'next-auth' {
  interface Profile {
    email_verified?: Profile.email_verified;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: User;
    accessToken?: Account.access_token;
    refreshToken?: Account.refresh_token;
    accessTokenExpires?: Account.expires_in;
    error?: string;
  }
}
