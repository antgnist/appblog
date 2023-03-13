import ReactMarkdown from 'react-markdown';

export interface MarkdownArticleProps {
  article: string;
}

function MarkdownArticle({ article }: MarkdownArticleProps) {
  return <ReactMarkdown>{article}</ReactMarkdown>;
}

export default MarkdownArticle;
