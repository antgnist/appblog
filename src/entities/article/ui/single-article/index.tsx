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
  MarkdownArticleUI,
} from 'shared/ui';
import styles from './index.module.scss';

export interface SingleArticleProps {
  loading?: boolean;
  loggedIn?: boolean;
  tittle: string;
  description?: string;
  body?: string;
  likesCount?: number;
  tagsArr?: string[];
  fullName?: string;
  date?: string;
  avatarSrc?: string;
}

const primer = `Выделение текста
*Этот текст будет наклонным (курсив)*
_Этот текст будет наклонным (курсив)_

**Этот текст будет жирным**
__Этот текст будет жирным__
https://hexlet.io — текст простой ссылки станет кликабельной ссылкой автоматически
Ссылкой можно сделать любой текст:

[Это ссылка на Хекслет](https://hexlet.io)

* Пункт 
* Еще один пункт
  * Подпункт
  * Еще один подпункт
`;

export function SingleArticle({
  loading = true,
  loggedIn = false,
  tittle = '',
  description = '',
  body = primer,
  likesCount = 0,
  tagsArr = [],
  fullName = '',
  date = '',
  avatarSrc = '',
}: SingleArticleProps) {
  return (
    <Row justify="center">
      <Col style={{ flexBasis: 941, wordBreak: 'break-word' }}>
        <Card
          style={{
            minHeight: 'calc(100vh - 88px - var(--header-heght))',
            filter: 'drop-shadow(0px 4px 7px rgba(0, 0, 0, 0.15))',
            border: 'initial',
          }}
        >
          <Skeleton
            loading={loading}
            paragraph={{
              rows: 2,
            }}
            style={{
              padding: '15px 19px',
              display: 'flex',
              flexDirection: 'row-reverse',
            }}
            avatar
            active
          >
            <div className={styles.singleArticle}>
              <div className={styles.singleArticle__baseInfo}>
                <div className={styles.singleArticle__body}>
                  <div className={styles.singleArticle__header}>
                    <TittleUI tittle={tittle} />
                    <LikesUI
                      disabled={!loggedIn}
                      count={likesCount}
                      style={{ marginTop: '3px' }}
                    />
                  </div>
                  <TagsUI tagsArr={tagsArr} />
                  <DescriptionUI
                    style={{ maxHeight: '4em' }}
                    description={description}
                  />
                </div>
                <div className={styles.singleArticle__aside}>
                  <div className={styles.singleArticle__info}>
                    <FullNameUI fullName={fullName} />
                    <DateUI strDate={date} />
                  </div>
                  <AvatarUI src={avatarSrc} />
                </div>
              </div>

              <div className={styles.singleArticle__content}>
                <MarkdownArticleUI article={body} />
              </div>
            </div>
          </Skeleton>
        </Card>
      </Col>
    </Row>
  );
}
