'use server';

import { getCollection } from '@/services/db/utils';
import { hashPassword, verifyPassword } from '@/utils/api';
import { signIn } from 'next-auth/react';

export interface IAuthState {
  message?: string;
  error?: string;
  credentials?: {
    email: string;
    password: string;
  };
}

export const signUp = async (
  state: IAuthState,
  formData: FormData,
): Promise<IAuthState> => {
  const email = formData.get('email')?.toString().trim().toLowerCase();
  const password = formData.get('password')?.toString();
  const name = formData.get('name')?.toString();

  if (!email || !password || !name) {
    return {
      error: 'Email, Password, Name are required',
    };
  }

  // Create User in DB
  try {
    const existentUser = await getUserByEmail(email);

    if (existentUser) {
      return {
        error: 'User already exists',
      };
    }

    await createUser({
      name,
      email,
      password,
    });

    return {
      message: 'success',
    };
  } catch (error) {
    console.log('error => ', error);

    return {
      error: 'error creating user',
    };
  }
};

export const Login = async (
  prevState: IAuthState,
  formData: FormData,
): Promise<IAuthState> => {
  const email = formData.get('email')?.toString().trim().toLowerCase();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return {
      error: 'Email, Password are required',
    };
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return {
        error: 'User does not exists',
      };
    }

    const isValid = await verifyPassword(password, user.password as string);

    if (isValid) {
      return {
        message: 'success',
        credentials: {
          email,
          password,
        },
      };
    }

    return {
      error: 'Please verify your password',
    };
  } catch (error) {
    console.log('error => ', error);

    return {
      error: 'error in login user',
    };
  }
};

export const getUserByEmail = async (email: string) => {
  const collection = await getCollection('users');
  const existentUser = await collection.findOne({ email });

  return existentUser;
};

export const createUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const hashedPassword = await hashPassword(password);
  const collection = await getCollection('users');
  const result = await collection.insertOne({
    name,
    email,
    password: hashedPassword,
  });

  return result;
};
