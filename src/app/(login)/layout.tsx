import { FC } from 'react';

interface ILoginLayout {
  children: React.ReactNode;
}

const LoginLayout: FC<ILoginLayout> = ({ children }) => {
  // const { data: session } = useSession();

  // useEffect(() => {
  //   if (session) {
  //     redirect('/');
  //   }
  // }, [session]);

  return (
    <div className="flex-1 flex justify-center items-center bg-red-200 h-full">
      {children}
    </div>
  );
};

export default LoginLayout;
