import { Link } from 'react-router-dom';

export interface LinkUnderFormProp {
  text?: string;
  link?: string;
  linkText?: string;
  relative?: 'path' | 'route';
}

function LinkUnderForm({
  text = 'You have a problem? ',
  linkText = 'To Main.',
  link = '/',
  relative = 'route',
}: LinkUnderFormProp) {
  return (
    <div
      style={{
        color: 'var(--color-under-text)',
        lineHeight: 'var(--line-height-xsm)',
        fontSize: 'var(--font-size-sm)',
        textAlign: 'center',
      }}
    >
      {text}
      <Link to={link} relative={relative}>
        {linkText}
      </Link>
    </div>
  );
}

export default LinkUnderForm;
