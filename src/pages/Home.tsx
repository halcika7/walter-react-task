// hooks
import { useEffect, SyntheticEvent, useState } from 'react';
import { createSelector } from 'reselect';
import { useThunkDispatch } from '@dispatch';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

// actions
import { fetchTopHeadlines, searchArticles, setArticles } from '@actions';

// types
import { AppState } from '../redux/reducers';
import { Article } from '@reduxTypes';

// components
import { Alert, Button, Col, Container, Dropdown, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ArticleCard from '@components/card';

const reduxProps = createSelector(
  (state: AppState) => state.home,
  home => ({ ...home })
);

function Home() {
  const [sortBy, setSortBy] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { articles, totalResults, message } = useSelector(reduxProps);
  const hide = currentPage * 20 >= totalResults;
  const { search } = useLocation();
  const dispatch = useThunkDispatch();
  const history = useHistory();
  const query = search?.split('=')[1];

  const onClick = (article: Article) => () => {
    const title = article.title.split(' ').join('-');
    const from = !query ? 'Home' : `/?query=${query}`;
    history.push(`/article/${title}`, { article, from });
  };

  const onClickItem = (eventKey: string | null, e: SyntheticEvent<unknown>) => {
    e.preventDefault();
    if (eventKey !== sortBy && articles?.length) {
      setSortBy(eventKey as string);
      setCurrentPage(1);
    }
  };

  const loadMore = () => {
    if (isLoading || hide) return null;

    setIsLoading(prev => !prev);
    setCurrentPage(prev => prev + 1);

    if (!query) {
      return dispatch(fetchTopHeadlines(currentPage + 1, true));
    }

    return dispatch(searchArticles(query, currentPage + 1, sortBy, true));
  };

  useEffect(() => {
    if (!query) {
      dispatch(fetchTopHeadlines(1));
    } else {
      dispatch(searchArticles(query, 1, sortBy));
    }
  }, [dispatch, query, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
    return () => {
      dispatch(setArticles({ articles: null, totalResults: 0 }, false));
    };
  }, [query, dispatch]);

  useEffect(() => {
    setIsLoading(false);
  }, [articles]);

  if (!articles) return null;

  if (!articles.length) {
    return (
      <Container className="mt-5 mb-5 p-sm-0" data-testid="no-articles">
        <Row noGutters>
          <Col className="p-lg-3">
            <Alert variant="danger">{message || 'No Articles found'}</Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5 p-sm-0">
      {query && (
        <Row className="align-items-center" noGutters>
          <Button variant="light" className="mr-2">
            <Link to="/" className="text-decoration-none">
              Go Back Home
            </Link>
          </Button>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              data-testid="dropdown"
            >
              Sort Search Results
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onSelect={onClickItem}
                eventKey=""
                active={sortBy === ''}
                data-testid="dropdown-item-1"
              >
                Published Date
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="popularity"
                active={sortBy === 'popularity'}
                onSelect={onClickItem}
                data-testid="dropdown-item-2"
              >
                Popularity
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="relevance"
                active={sortBy === 'relevance'}
                onSelect={onClickItem}
              >
                Relevance
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Row>
      )}
      <Row className="h-100">
        {articles.map(article => (
          <Col
            xs={12}
            md={6}
            lg={4}
            key={`${article.title}-${article.publishedAt}-${article.url}`}
            className="mt-4"
          >
            <ArticleCard
              description={article.description}
              title={article.title}
              urlToImage={article.urlToImage}
              source={article.source.id}
              onClick={onClick(article)}
            />
          </Col>
        ))}
      </Row>
      <Button
        variant="primary"
        className={`mx-auto mt-4 ${hide ? 'invisible' : ''}`}
        block
        onClick={loadMore}
        data-testid="load-more"
        disabled={isLoading}
      >
        Load More
      </Button>
    </Container>
  );
}

export default Home;
