import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@components/navbar';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('Testing Navbar Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  });

  it('should render navbar', () => {
    expect(screen.getByTestId('navbar')).toBeTruthy();
  });

  it('should not submit a form', () => {
    userEvent.click(screen.getByTestId('submit'));
    const form = screen.getByTestId('form');
    const input = screen.getByTestId('input');
    expect(form.className).toEqual(
      'mt-2 mt-lg-0 ml-auto search-form was-validated form-inline'
    );
    fireEvent.change(input, { target: { value: 'a' } });
    expect(input).toHaveValue('a');
  });

  it('should submit the form and navigate to a new route', () => {
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'trump' } });
    userEvent.click(screen.getByTestId('submit'));
    expect(input).toHaveValue('trump');
  });
});
