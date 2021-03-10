import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from '@pages/404';

describe('Testing 404 Page', () => {
  it('should render 404 page', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('404')).toBeTruthy();
  });
});
