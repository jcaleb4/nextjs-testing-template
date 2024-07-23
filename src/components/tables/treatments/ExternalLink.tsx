import { FC } from 'react';

interface IExternalLink {
  value: {
    title: string;
    url: string;
  };
}

const ExternalLink: FC<IExternalLink> = ({ value: { title, url } }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="hover:underline text-blue-500 capitalize"
    >
      {title}
    </a>
  );
};

export default ExternalLink;
