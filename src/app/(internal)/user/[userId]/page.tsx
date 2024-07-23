import { FC } from 'react';

interface IUserDetails {
  params: { userId: string };
}

const UserDetails: FC<IUserDetails> = ({ params: { userId } }) => {
  return <div>{userId}</div>;
};

export default UserDetails;
