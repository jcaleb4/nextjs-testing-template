import { FC, ReactElement } from 'react';
import { Disclosure as DisclosureComp } from '@headlessui/react';

interface IDisclosure {
  button: ReactElement;
  content: ReactElement;
  baseStyles?: string;
  closedStyles?: string;
  openStyles?: string;
}

const Disclosure: FC<IDisclosure> = ({ button, content }) => {
  return (
    <DisclosureComp>
      {() => (
        <>
          <DisclosureComp.Button>{button}</DisclosureComp.Button>
          <DisclosureComp.Panel>{content}</DisclosureComp.Panel>
        </>
      )}
    </DisclosureComp>
  );
};

export default Disclosure;
