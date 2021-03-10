import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@pages/Home';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ReduxProvider from '@mocks/provider';
import moxios from 'moxios';
import { axios } from '@axios';
import { article, buildArticles } from '@mocks/articles';

const history = createBrowserHistory();

const renderPage = () =>
  render(
    <ReduxProvider>
      <Router history={history}>
        <Home />
      </Router>
    </ReduxProvider>
  );

describe('Testing Home Page', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should return null', () => {
    renderPage();

    expect(screen.queryByTestId('no-articles')).toBeNull();
  });

  it('should render Home not-articles', done => {
    renderPage();

    moxios.withMock(() => {
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 200,
            response: {
              articles: [],
              totalResults: 0,
            },
          })
          .then(() => {
            expect(screen.queryByTestId('no-articles')).toBeTruthy();
            done();
          });
      });
    });
  });

  it('should render Home Page should be able to load more', done => {
    renderPage();

    moxios.withMock(() => {
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 200,
            response: {
              articles: [article],
              totalResults: 21,
            },
          })
          .then(() => {
            const loadButton = screen.getByTestId('load-more');
            fireEvent.click(loadButton);
            moxios.withMock(() => {
              moxios.wait(() => {
                const req = moxios.requests.mostRecent();
                req
                  .respondWith({
                    status: 200,
                    response: {
                      articles: buildArticles(21),
                      totalResults: 21,
                    },
                  })
                  .then(() => {
                    const loadButton = screen.getByTestId('load-more');
                    fireEvent.click(loadButton);
                    expect(screen.queryByTestId('no-articles')).toBeNull();
                    done();
                  });
              });
            });
          });
      });
    });
  });

  it('should render Home Page should respond with an error', done => {
    renderPage();

    moxios.withMock(() => {
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 200,
            response: {
              articles: [article],
              totalResults: 21,
            },
          })
          .then(() => {
            const loadButton = screen.getByTestId('load-more');
            fireEvent.click(loadButton);
            moxios.withMock(() => {
              moxios.wait(() => {
                const req = moxios.requests.mostRecent();
                req
                  .respondWith({
                    status: 400,
                    response: {
                      message: 'message',
                    },
                  })
                  .then(() => {
                    expect(screen.queryByTestId('no-articles')).toBeNull();
                    done();
                  });
              });
            });
          });
      });
    });
  });

  it('should render Home Page should be able to visit Article Page', done => {
    renderPage();

    moxios.withMock(() => {
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 200,
            response: {
              articles: [article],
              totalResults: 200,
            },
          })
          .then(() => {
            fireEvent.click(screen.getByTestId('article-button'));
            expect(screen.queryByTestId('no-articles')).toBeNull();
            done();
          });
      });
    });
  });
});
