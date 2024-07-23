import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { createUser, getUserByEmail } from '@/actions/auth';

interface ISignupRequest {
  email: string;
  password: string;
  name: string;
}

export const POST = async (request: Request) => {
  const body = await request.json();
  const { email, password, name } = body as ISignupRequest;

  if (!email || !password) {
    return NextResponse.json(
      {
        error: 'email and password are required',
      },
      {
        status: StatusCodes.BAD_REQUEST,
      },
    );
  }

  try {
    const existentUser = await getUserByEmail(email);

    if (existentUser) {
      return NextResponse.json(
        {
          error: 'User already exists',
        },
        {
          status: StatusCodes.BAD_REQUEST,
        },
      );
    }

    const result = await createUser({
      name,
      email,
      password,
    });

    return NextResponse.json(result, { status: StatusCodes.OK });
  } catch (error) {
    console.log('error => ', error);

    return NextResponse.json(
      {
        error: 'error creating user',
      },
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    );
  }
};
