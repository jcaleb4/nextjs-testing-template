import { NextRequest, NextResponse } from 'next/server';

type ResponseData = {
  message: string;
};

export const GET = async (
  request: NextRequest,
  response: NextResponse<ResponseData>,
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('request.query => ', request.url);

  // return NextResponse.json({ error: 'error here' }, { status: 500 });

  return NextResponse.json({ message: 'hello world!' });
};

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>,
// ) {
//   res.status(200).json({ message: 'Hello from Next.js!' });
// }
