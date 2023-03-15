import { Col, Row, Skeleton } from 'antd';
import Card from 'antd/es/card/Card';
import { Link } from 'react-router-dom';
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
  loading?: boolean;
  loggedIn?: boolean;
  tittle?: string;
  description?: string;
  tagsArr?: string[];
  fullName?: string;
  date?: string;
  avatarSrc?: string;
  likesCount?: number | string;
  slug?: string;
}

export function ArticleRow({
  loading = true,
  loggedIn = false,
  tittle = 'Some article title',
  description = 'Тестовая строка описания',
  tagsArr = ['Tag1', 'Tag2'],
  fullName = 'John Doe',
  date = '2023-03-09T12:39:02.714Z',
  avatarSrc = '',
  likesCount = 0,
  slug = '',
}: ArticleRowProps) {
  return (
    <Row justify="center">
      <Col style={{ flexBasis: 941, wordBreak: 'break-word' }}>
        <Card
          style={{
            height: 140,
            filter: 'drop-shadow(0px 4px 7px rgba(0, 0, 0, 0.15))',
            border: 'initial',
          }}
        >
          <Skeleton
            loading={loading}
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
                  <Link to={`/articles/${slug}`}>
                    <TittleUI tittle={tittle} />
                  </Link>
                  <LikesUI
                    disabled={!loggedIn}
                    count={likesCount}
                    style={{ marginTop: '3px' }}
                  />
                </div>
                <TagsUI
                  tagsArr={tagsArr}
                  addStyle={{
                    maxHeight: 'calc(1 * var(--line-height-sm))',
                    overflow: 'hidden',
                  }}
                />
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
