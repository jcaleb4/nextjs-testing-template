'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import { EMainNavigation, MAIN_NAVIGATION } from '@/constants/navigation';

interface INavigation {}

const Navigation: FC<INavigation> = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full">
      <ul role="list">
        {MAIN_NAVIGATION.map((item) => (
          <li key={item.name} className="py-2">
            {item.children ? (
              <Disclosure as="div">
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={getCopyStyles(
                        item.basePath
                          ? pathname.includes(item.basePath)
                          : pathname.includes(item.href || ''),
                        ['w-full relative'],
                        open,
                      )}
                    >
                      {NavigationItem(item, pathname, open)}
                    </Disclosure.Button>
                    <Disclosure.Panel
                      as="ul"
                      className="p-2 bg-gray-900 rounded-b-md"
                    >
                      {item.children?.map((subItem) => (
                        <li key={subItem.name}>
                          {NavigationItem(subItem, pathname)}
                        </li>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ) : (
              NavigationItem(item, pathname)
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;

// Get styles for options and sub-options base path and open status
const getCopyStyles = (
  isSelected: boolean, // option is currently the nav page
  extraStyles?: string[], // array with custom styles
  isOpen?: boolean, // disclosure open state
): string => {
  return classNames(
    ...(extraStyles || []),
    {
      'rounded-b-none bg-gray-900 hover:bg-gray-900 text-gray-400': isOpen,
      'bg-gray-50 hover:bg-gray-50 text-gray-950': isSelected && !isOpen,
      'hover:bg-gray-950 text-gray-400': !isSelected,
      'text-gray-400': isOpen && isSelected,
    },
    'flex items-center rounded-md px-2 text-sm leading-4 h-10 text-gray-400 space-x-2',
  );
};

// Get markup for both type of options
const NavigationContent = (
  item: EMainNavigation,
  isOpen: boolean,
  isSelected: boolean,
) => {
  return (
    <>
      {item.icon && (
        <item.icon
          className={`h-6 w-6 shrink-0 ${isSelected && !isOpen ? 'text-gray-950' : ''}`}
          aria-hidden="true"
        />
      )}
      <h5>{item.name}</h5>
      {!!item.children?.length && (
        <ChevronRightIcon
          className={classNames(
            isOpen ? 'rotate-90' : '',
            'ml-auto h-6 w-6 shrink-0 absolute right-2',
          )}
          aria-hidden="true"
        />
      )}
    </>
  );
};

// Get markup for single option or parent option
const NavigationItem = (
  item: EMainNavigation,
  pathname: string,
  isOpen = false,
) => {
  const isSelected = item.href
    ? item.href === '/'
      ? pathname === item.href
      : pathname.includes(item.href)
    : false;

  return item.href ? (
    <Link className={getCopyStyles(isSelected)} href={item.href}>
      {NavigationContent(item, isOpen, isSelected)}
    </Link>
  ) : (
    NavigationContent(item, isOpen, isSelected)
  );
};
