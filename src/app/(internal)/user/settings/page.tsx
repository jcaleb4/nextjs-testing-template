import { FC } from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Settings page',
};
interface IUserSettings {}

const UserSettings: FC<IUserSettings> = () => {
  return <div>User Settings</div>;
};

export default UserSettings;
