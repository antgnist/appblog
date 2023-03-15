import { Link, RelativeRoutingType } from 'react-router-dom';

interface GoBackUIProps {
  text?: string;
  linkTo?: string;
  linkText?: string;
  relative?: RelativeRoutingType | undefined;
  onClicked?: () => void;
}

function GoBackUI({
  text = 'Ошибка при получении данных',
  linkTo = '/',
  linkText = 'На главную',
  relative = 'path',
  onClicked = () => {},
}: GoBackUIProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '50px',
        alignItems: 'center',
      }}
    >
      <div>{text}</div>
      <Link to={linkTo} relative={relative} onClick={onClicked}>
        {linkText}
      </Link>
    </div>
  );
}

export default GoBackUI;
