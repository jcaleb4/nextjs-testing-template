'use server';

import { getCollection } from '@/services/db/utils';
import { hashPassword } from '@/utils/api';

interface ISignUpResponse {
  message?: string;
  error?: string;
}

export const signUp = async (
  prevState: ISignUpResponse,
  formData: FormData,
): Promise<ISignUpResponse> => {
  const email = formData.get('email')?.toString().trim().toLowerCase();
  const password = formData.get('password');
  const name = formData.get('name');

  if (!email || !password || !name) {
    return {
      error: 'Email, Password, Name are required',
    };
  }

  const response = await fetch('http://localhost:3000/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });

  const data = await response.json();

  console.log('response => ', data);

  return {
    message: 'success',
  };
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
