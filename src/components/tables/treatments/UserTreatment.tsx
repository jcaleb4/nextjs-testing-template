import { FC } from 'react';
import { IUserTreatmentProps } from '../TableTreatments';
import { Avatar } from '@nextui-org/react';
import Link from 'next/link';

interface IUserTreatment {
  user: IUserTreatmentProps;
}

const UserTreatment: FC<IUserTreatment> = ({ user }) => {
  return (
    <div className="inline-block">
      <Link
        href={`/content_creators/${user.id}`}
        className="flex items-center space-x-3"
      >
        <Avatar isBordered radius="full" size="md" src={user.avatar} />
        <h4>{user.name}</h4>
      </Link>
    </div>
  );
};

export default UserTreatment;
