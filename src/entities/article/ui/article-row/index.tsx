import { Col, Row, Skeleton } from 'antd';
import Card from 'antd/es/card/Card';
import {
  AvatarUI,
  DateUI,
  FullNameUI,
  TittleUI,
  TagsUI,
  DescriptionUI,
  LikesUI,
} from 'shared/ui';
import styles from './index.module.scss';

export interface ArticleRowProps {
  status?: string;
  loggedIn?: boolean;
  tittle?: string;
  description?: string;
  tagsArr?: string[];
  fullName?: string;
  date?: string;
  avatarSrc?: string;
}

export function ArticleRow({
  status = 'idle',
  loggedIn = false,
  tittle = 'Some article title',
  description = 'Тестовая строка описания',
  tagsArr = ['Tag1', 'Tag2'],
  fullName = 'John Doe',
  date = '2023-03-09T12:39:02.714Z',
  avatarSrc = '',
}: ArticleRowProps) {
  const loadKey = status === 'pending';

  return (
    <Row justify="center">
      <Col style={{ flexBasis: 941 }}>
        <Card
          style={{
            height: 140,
            filter: 'drop-shadow(0px 4px 7px rgba(0, 0, 0, 0.15))',
            border: 'initial',
          }}
        >
          <Skeleton
            loading={loadKey}
            paragraph={{
              rows: 1,
            }}
            style={{
              padding: '15px 19px',
              display: 'flex',
              flexDirection: 'row-reverse',
            }}
            avatar
            active
          >
            <div className={styles.articleRow}>
              <div className={styles.articleRow__body}>
                <div className={styles.articleRow__header}>
                  <TittleUI tittle={tittle} />
                  <LikesUI disabled={!loggedIn} style={{ marginTop: '3px' }} />
                </div>
                <TagsUI tagsArr={tagsArr} />
                <DescriptionUI
                  style={{
                    maxHeight: 'calc(2 * var(--line-height-sm))',
                    maxWidth: '682px',
                  }}
                  description={description}
                />
              </div>
              <div className={styles.articleRow__aside}>
                <div className={styles.articleRow__info}>
                  <FullNameUI fullName={fullName} />
                  <DateUI strDate={date} />
                </div>
                <AvatarUI src={avatarSrc} />
              </div>
            </div>
          </Skeleton>
        </Card>
      </Col>
    </Row>
  );
}
