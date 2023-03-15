import { Tag } from 'antd';

export interface TagsProps {
  tagsArr?: string[];
  addStyle?: object;
}

export default function Tags({ tagsArr = [], addStyle = {} }: TagsProps) {
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

  return <div style={addStyle}>{listTags}</div>;
}
