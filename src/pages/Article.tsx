// types
import { Article } from '@reduxTypes';

// hooks
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

// components
import { Breadcrumb, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const ArticlePage = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setArticle((state as Record<string, unknown>).article as Article);
    }
  }, [state]);

  if (!state || !state.article) {
    return (
      <div>
        <div data-testid="article-not-found">Article not found</div>
      </div>
    );
  }

  return (
    <Container data-testid="article">
      <Breadcrumb className="mt-2 w-75 mx-auto w-sm-100 breadcrumb-wrapper">
        <Breadcrumb.Item
          linkAs={NavLink}
          linkProps={{ to: state.from === 'Home' ? '/' : state.from }}
        >
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Article</Breadcrumb.Item>
      </Breadcrumb>
      <Card className="mt-5 mb-4 w-75 mx-auto w-sm-100">
        {article?.urlToImage && (
          <Card.Header className="p-0">
            <Image
              src={article.urlToImage}
              fluid
              className="rounded-top w-100"
              loading="lazy"
              decoding="async"
              alt={article.title}
            />
          </Card.Header>
        )}
        <Card.Body className="">
          <Row className="mb-4">
            {article?.source?.name && (
              <Col xs={12} md lg={4} className="d-flex align-items-center">
                <Image src="/images/source.png" fluid className="mr-2" />
                {article.source.name}
              </Col>
            )}
            {article?.author && (
              <Col
                xs={12}
                md
                lg={4}
                className="d-flex align-items-center mt-1 mt-md-0"
              >
                <Image src="/images/user.png" fluid className="mr-2" />
                <p className="max-height-with-overflow m-0">{article.author}</p>
              </Col>
            )}
            {article?.publishedAt && (
              <Col
                xs={12}
                md
                lg={4}
                className="d-flex align-items-center mt-1 mt-md-0"
              >
                <Image src="/images/clock.png" fluid className="mr-2" />
                {new Date(article!.publishedAt as string).toDateString()}
              </Col>
            )}
          </Row>
          <h1 className="h2 mb-4">{article?.title}</h1>
          {article?.content && <p>{article.content.split('…')[0]}</p>}
          {article?.description && <p>{article.description.split('…')[0]}</p>}
        </Card.Body>
        <Card.Footer className="bg-transparent">
          <a
            href={article?.url}
            target="_blank"
            rel="noreferrer"
            className="mt-auto w-100"
          >
            VISIT ORIGINAL ARTICLE
          </a>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ArticlePage;
