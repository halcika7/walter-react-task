import { render, screen } from '@testing-library/react';
import Spinner from '@components/Spinner';

describe('Testing Spinner Component', () => {
  it('should render card without an image', () => {
    render(<Spinner />);

    const spinner = screen.getByTestId('spinner');

    expect(spinner).toBeTruthy();
  });
});
