import { HomeIcon, CubeIcon } from '@heroicons/react/24/outline';
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

export interface EMainNavigationItem {
  name: string;
  href?: string;
  icon?: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
  >;
}

export interface EMainNavigation extends EMainNavigationItem {
  children?: EMainNavigationItem[];
  basePath?: string;
}

export const MAIN_NAVIGATION: EMainNavigation[] = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  {
    name: 'Children',
    icon: CubeIcon,
    basePath: 'user',
    children: [{ name: 'Test', href: '/user/test' }],
  },
];
