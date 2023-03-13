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

export function SingleArticle({ loading = false }: SingleArticleProps) {
  return (
    <Row justify="center">
      <Col style={{ flexBasis: 941 }}>
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
                    <TittleUI tittle="Some article title" />
                    <LikesUI style={{ marginTop: '3px' }} />
                  </div>
                  <TagsUI tagsArr={['Tag1', 'Tag2']} />
                  <DescriptionUI
                    style={{ maxHeight: '4em' }}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris  nisi ut aliquip ex ea commodo consequat. "
                  />
                </div>
                <div className={styles.singleArticle__aside}>
                  <div className={styles.singleArticle__info}>
                    <FullNameUI fullName="John Doe" />
                    <DateUI strDate="2023-03-09T12:39:02.714Z" />
                  </div>
                  <AvatarUI src="" />
                </div>
              </div>

              <div className={styles.singleArticle__content}>
                <MarkdownArticleUI article={primer} />
              </div>
            </div>
          </Skeleton>
        </Card>
      </Col>
    </Row>
  );
}
