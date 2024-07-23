import { FC } from 'react';
import UserTreatment from './treatments/UserTreatment';
import TagsTreatment from './treatments/TagsTreatment';
import ExternalLink from './treatments/ExternalLink';

export enum ETreatments {
  user = 'user',
  tags = 'tags',
  externalLink = 'externalLink',
}

export interface IPlatformTreatmentProps {
  platformName: string;
  url: string;
}

export interface IExternalLinkTreatmentProps {
  title: string;
  url: string;
}

export interface IUserTreatmentProps {
  id: string;
  name: string;
  avatar: string;
}

export interface ITableTreatments {
  treatment: ETreatments;
  alignment: string;
  value:
    | number
    | string
    | string[]
    | IExternalLinkTreatmentProps
    | IPlatformTreatmentProps[]
    | IUserTreatmentProps;
}

export const isSafeValue = (value: ITableTreatments['value']) => {
  return typeof value === 'number' || typeof value === 'string';
};

const TableTreatments: FC<ITableTreatments> = ({
  treatment,
  value,
  alignment,
}) => {
  // Tags treatment
  if (treatment === ETreatments.tags && Array.isArray(value)) {
    return <TagsTreatment tags={value as string[]} alignment={alignment} />;
  }

  // User treatment
  if (treatment === ETreatments.user && value) {
    return <UserTreatment user={value as IUserTreatmentProps} />;
  }

  // User treatment
  if (treatment === ETreatments.externalLink && value) {
    return <ExternalLink value={value as IExternalLinkTreatmentProps} />;
  }

  return null;
};

export default TableTreatments;
