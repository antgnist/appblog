import { Tag } from 'antd';

export interface TagsProps {
  tagsArr?: string[];
  addStyle?: object;
}

interface IAccumTags {
  unic: string[];
  tagsJsx: JSX.Element[];
}

export default function Tags({ tagsArr = [], addStyle = {} }: TagsProps) {
  const objTags = tagsArr.reduce(
    (accum: IAccumTags, tag) => {
      const trimedTag = tag.trim();
      if (trimedTag && !accum.unic.includes(trimedTag)) {
        accum.unic.push(trimedTag);
        accum.tagsJsx.push(
          <Tag
            key={tag}
            style={{
              color: 'var(--color-text-secondary)',
              borderColor: 'var(--color-text-secondary)',
              borderRadius: '2px',
              maxWidth: '300px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {tag}
          </Tag>,
        );

        return accum;
      }
      return accum;
    },
    { unic: [], tagsJsx: [] },
  );

  return <div style={addStyle}>{objTags.tagsJsx}</div>;
}
