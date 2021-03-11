import { render, screen } from '@testing-library/react';
import Article from '@pages/Article';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { article } from '@mocks/articles';

const history = createBrowserHistory();

describe('Testing Article Page', () => {
  it('should render Article not found', () => {
    render(
      <Router history={history}>
        <Article />
      </Router>
    );
    expect(screen.getByTestId('article-not-found')).toBeTruthy();
  });

  it('should render Article not found', () => {
    const state = { article: null };
    history.push('/article/title', state);

    render(
      <Router history={history}>
        <Article />
      </Router>
    );
    expect(screen.getByTestId('article-not-found')).toBeTruthy();
  });

  it('should render Article', () => {
    const state = { article, from: 'Home' };
    history.push('/article/title', state);

    render(
      <Router history={history}>
        <Article />
      </Router>
    );
    expect(screen.queryByTestId('article-not-found')).toBeNull();
    expect(screen.getByTestId('article')).toBeTruthy();
  });

  it('should render Article after search', () => {
    const state = { article, from: '/?query=trump' };
    history.push('/article/title', state);

    render(
      <Router history={history}>
        <Article />
      </Router>
    );
    expect(screen.queryByTestId('article-not-found')).toBeNull();
    expect(screen.getByTestId('article')).toBeTruthy();
  });
});
