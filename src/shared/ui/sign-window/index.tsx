import { Col, Row, Card } from 'antd';
import { PropsWithChildren } from 'react';
import style from './index.module.scss';

export interface SignWindowUIProp {}

function SignWindowUI({
  children = null,
}: PropsWithChildren<SignWindowUIProp>) {
  return (
    <Row justify="center">
      <Col style={{ flexBasis: 384, wordBreak: 'break-word' }}>
        <Card className={style.signWindow}>{children}</Card>
      </Col>
    </Row>
  );
}

export default SignWindowUI;
