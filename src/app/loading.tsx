import { FC } from 'react';

interface ILoading {}

const Loading: FC<ILoading> = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
