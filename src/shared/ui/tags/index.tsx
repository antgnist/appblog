import { Tag } from 'antd';

export interface TagsProps {
  tagsArr?: string[];
}

export default function Tags({ tagsArr = [] }: TagsProps) {
  const listTags = tagsArr.map((tag) => {
    if (tag && tag.trim()) {
      return (
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
        </Tag>
      );
    }
    return null;
  });

  return <div>{listTags}</div>;
}
