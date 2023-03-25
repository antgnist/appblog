import { Col, Row, Card } from 'antd';
import { PropsWithChildren } from 'react';
import style from './index.module.scss';

export interface SignWindowUIProp {
  flexBasis?: number;
}

function SignWindowUI({
  children = null,
  flexBasis = 384,
}: PropsWithChildren<SignWindowUIProp>) {
  return (
    <Row justify="center">
      <Col style={{ flexBasis, wordBreak: 'break-word' }}>
        <Card className={style.signWindow}>{children}</Card>
      </Col>
    </Row>
  );
}

export default SignWindowUI;
