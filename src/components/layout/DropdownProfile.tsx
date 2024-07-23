import { FC, ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  ChevronDownIcon,
  Cog6ToothIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { signOut, useSession } from 'next-auth/react';

interface IDropdownProfile {}

interface IUserNavigation {
  name: string;
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
  >;
  href?: string;
  callback?: () => void;
}

const USER_NAVIGATION: IUserNavigation[] = [
  {
    name: 'Settings',
    href: '/user/settings',
    icon: Cog6ToothIcon,
  },
  {
    name: 'Sign Out',
    icon: ArrowLeftStartOnRectangleIcon,
    callback: () => void signOut(),
  },
];

const DropdownProfile: FC<IDropdownProfile> = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!session) {
    return null;
  }

  return (
    <div className="relative">
      <Menu>
        <Menu.Button className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center overflow-hidden text-gray-950 border border-slate-200">
            <Image
              src={session?.user?.image ?? '/images/quasar-logo.png'}
              alt="Quasar"
              width={40}
              height={40}
              className="w-auto h-full"
            />
          </div>
          <div className="pl-2 text-gray-950 text-sm">
            {session?.user?.name}
          </div>
          <ChevronDownIcon
            className="h-5 w-5 text-gray-950"
            aria-hidden="true"
          />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0">
            <div className="bg-white border border-slate-200 rounded shadow-lg overflow-hidden mt-1 whitespace-nowrap text-gray-950 flex flex-col text-sm">
              <div className="p-2 border-b border-slate-200">
                <h4 className="text-lg leading-5">{session?.user?.name}</h4>
                <h5 className="text-xs text-gray-400">User Role</h5>
              </div>
              <div className="flex flex-col p-2 space-y-1">
                {USER_NAVIGATION.map((item) => (
                  <Menu.Item key={item.name}>
                    {item.href ? (
                      <Link
                        className={classNames(
                          'px-2 flex items-center rounded-md text-sm h-8 hover:text-white hover:bg-[#7fdbda]',
                          {
                            ' text-white bg-[#7fdbda]': item.href
                              ? pathname.includes(item.href)
                              : false,
                          },
                        )}
                        href={item.href || ''}
                      >
                        <item.icon
                          className="h-5 w-5 mr-1"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ) : (
                      <button
                        className="px-2 flex items-center rounded-md text-sm h-8 hover:text-white hover:bg-[#7fdbda]"
                        onClick={() => item.callback?.()}
                      >
                        <item.icon
                          className="h-5 w-5 mr-1"
                          aria-hidden="true"
                        />
                        {item.name}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropdownProfile;
