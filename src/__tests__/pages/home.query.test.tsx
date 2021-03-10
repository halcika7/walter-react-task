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
    history.push('/?query=trump');
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should render Home Page with a query', done => {
    renderPage();

    moxios.withMock(() => {
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 200,
            response: {
              articles: [article],
              totalResults: 0,
            },
          })
          .then(() => {
            expect(screen.queryByTestId('no-articles')).toBeNull();
            done();
          });
      });
    });
  });

  it('should render Home Page with a query, should be able to open the dropdown and sort articles', done => {
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
            // should not enter if statement
            fireEvent.click(screen.getByTestId('dropdown'));
            fireEvent.click(screen.getByTestId('dropdown-item-1'));
            // now it should
            fireEvent.click(screen.getByTestId('dropdown'));
            fireEvent.click(screen.getByTestId('dropdown-item-2'));
            expect(screen.queryByTestId('no-articles')).toBeNull();
            done();
          });
      });
    });
  });

  it('should render Home Page with a query, should be able to load more', done => {
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
});
