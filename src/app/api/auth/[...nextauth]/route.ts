/* eslint-disable @typescript-eslint/require-await */

import NextAuth, {
  Account,
  AuthOptions,
  Profile,
  Session,
  User,
} from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/services/db/client';
import { getUserByEmail } from '@/actions/auth';
import { verifyPassword } from '@/utils/api';

const searchParams = new URLSearchParams({
  prompt: 'consent',
  access_type: 'offline',
  response_type: 'code',
});
const GOOGLE_AUTHORIZATION_URL = `https://accounts.google.com/o/oauth2/v2/auth?${searchParams.toString()}`;

async function refreshGoogleAccessToken(token: JWT) {
  try {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT ?? '',
      client_secret: process.env.GOOGLE_SECRET ?? '',
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
      authorizationUrl: GOOGLE_AUTHORIZATION_URL,
    });

    const url = `https://oauth2.googleapis.com/token?${params.toString()}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshGoogleAccessTokenError',
    };
  }
}

async function refreshCredentialsAccessToken(token: JWT) {
  //   try {
  //     return {
  //       ...token,
  //       accessToken: refreshedTokens.access_token,
  //       accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
  //       refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
  //     };
  //   } catch (error) {
  //     return {
  //       ...token,
  //       error: 'CredentialsAccessTokenError',
  //     };
  //   }
}

interface Credentials {
  email: string;
  password: string;
}

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    // strategy: 'database',
    maxAge: 600,
    updateAge: 480,
  },
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Credentials({
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as Credentials;

        if (!email || !password) {
          return null;
        }

        const user = await getUserByEmail(email);

        if (!user) {
          return null;
        }

        const isValid = await verifyPassword(password, user.password as string);

        if (isValid) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
          };
        }

        return null;
      },
    }),
    GoogleProvider({
      idToken: true,
      authorization: {
        params: {
          scope: 'openid email profile',
          access_type: 'offline',
          response_type: 'code',
        },
      },
      clientId: process.env.GOOGLE_CLIENT ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({
      account,
      profile,
    }: {
      account: Account;
      profile: Profile;
    }): Promise<boolean> {
      if (account.provider === 'google') {
        return Boolean(
          profile.email_verified && profile?.email?.endsWith('.com'),
        );
      }

      return true;
    },
    async jwt({
      token,
      account,
      user,
    }: {
      token: JWT;
      user: User;
      account: Account;
    }): Promise<JWT> {
      // Initial sign in
      console.log('account => ', account);
      console.log('user => ', user);
      console.log('token => ', token);

      if (account && user) {
        return {
          accessToken: account.accessToken,
          accessTokenExpires:
            Date.now() + (account.expires_in as number) * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshGoogleAccessToken(token);
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions as AuthOptions);

export { handler as GET, handler as POST };
