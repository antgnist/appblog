import { Col, Row, Skeleton } from 'antd';
import Card from 'antd/es/card/Card';
import { DeleteArticleButton } from 'features/delete-button';
import { Favorites } from 'features/favorites';
import { useNavigate } from 'react-router-dom';
import {
  AvatarUI,
  DateUI,
  FullNameUI,
  TittleUI,
  TagsUI,
  DescriptionUI,
  MarkdownArticleUI,
  ButtonUI,
} from 'shared/ui';
import styles from './index.module.scss';

export interface SingleArticleProps {
  loading?: boolean;
  loggedIn?: boolean;
  currentAuthor?: boolean;
  slug: string;
  tittle: string;
  description?: string;
  body?: string;
  tagsArr?: string[];
  fullName?: string;
  date?: string;
  avatarSrc?: string;
  deleteCallback?: () => void;
}

export function SingleArticle({
  loading = true,
  loggedIn = false,
  currentAuthor = false,
  slug = '',
  tittle = '',
  description = '',
  body = '',
  tagsArr = [],
  fullName = '',
  date = '',
  avatarSrc = '',
  deleteCallback,
}: SingleArticleProps) {
  const navigate = useNavigate();

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
                    <TittleUI
                      tittle={tittle}
                      style={{ maxHeight: 'initial' }}
                    />
                    <Favorites
                      keySlug={slug}
                      disabled={!loggedIn}
                      style={{ marginTop: '3px', alignSelf: 'flex-start' }}
                    />
                  </div>
                  <TagsUI tagsArr={tagsArr} />
                  <DescriptionUI description={description} />
                </div>
                <div className={styles.singleArticle__aside}>
                  <div className={styles.singleArticle__user}>
                    <div className={styles.singleArticle__info}>
                      <FullNameUI fullName={fullName} />
                      <DateUI strDate={date} />
                    </div>
                    <AvatarUI src={avatarSrc} />
                  </div>

                  {currentAuthor ? (
                    <div className={styles.singleArticle__manage}>
                      <DeleteArticleButton
                        slug={slug}
                        className={styles.singleArticle__deleteButton}
                        callback={deleteCallback || undefined}
                      />
                      <ButtonUI
                        className={styles.singleArticle__editButton}
                        action={() => {
                          navigate(`/articles/${slug}/edit`);
                        }}
                      >
                        Edit
                      </ButtonUI>
                    </div>
                  ) : null}
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
