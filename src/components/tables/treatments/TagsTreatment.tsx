import { FC } from 'react';

interface ITagsTreatment {
  tags: string[];
  alignment: string;
}

const TagsTreatment: FC<ITagsTreatment> = ({ tags, alignment }) => {
  return (
    <div className={`flex space-x-2 ${alignment}`}>
      {tags.map((tag) => (
        <span
          key={`tag-${tag}`}
          className="bg-green-200 rounded-full border border-green-500 px-2"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
};

export default TagsTreatment;
