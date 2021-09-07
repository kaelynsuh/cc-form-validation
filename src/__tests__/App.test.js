import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';

let today = new Date();
let yyyy = today.getFullYear();
let month = today.getMonth() + 1; // 0 = January

describe('renders the credit card page', () => {
  afterEach(cleanup);

  it('should display the credit card form page', () => {
    const api = render(<App />);

    expect(api.getByTestId('name')).toHaveAttribute('placeholder', 'Name');

    expect(api.getByTestId('card')).toHaveAttribute(
      'placeholder',
      'Card Number'
    );
    expect(api.getByTestId('cvv')).toHaveAttribute('placeholder', 'CVV2');

    expect(api.getByTestId('exp-month')).toHaveAttribute(
      'placeholder',
      'Exp. Month (MM)'
    );
    expect(api.getByTestId('exp-year')).toHaveAttribute(
      'placeholder',
      'Exp. Year (YYYY)'
    );
  });

  it('should display errors on the input', () => {
    const api = render(<App />);

    fireEvent.input(api.getByTestId('card'), {
      target: { value: '123' },
    });
    expect(api.getByTestId('error-card')).toHaveTextContent(
      'Invalid card number'
    );

    fireEvent.input(api.getByTestId('exp-month'), {
      target: { value: '29' },
    });
    expect(api.getByTestId('error-exp-month')).toHaveTextContent(
      'errorMonth must be between 1 and 12.'
    );

    fireEvent.input(api.getByTestId('exp-year'), {
      target: { value: '10' },
    });
    expect(api.getByTestId('error-exp-year')).toHaveTextContent(
      'errorYear must be between 2021 and 2031.'
    );
  });

  it('should display success message on submit', () => {
    const api = render(<App />);

    expect(api.getByTestId('name')).toHaveAttribute('placeholder', 'Name');

    fireEvent.input(api.getByTestId('name'), {
      target: { value: 'Kae' },
    });

    fireEvent.input(api.getByTestId('card'), {
      target: { value: '4111111111111111' },
    });

    fireEvent.input(api.getByTestId('cvv'), {
      target: { value: '123' },
    });

    fireEvent.input(api.getByTestId('exp-month'), {
      target: { value: month },
    });

    fireEvent.input(api.getByTestId('exp-year'), {
      target: { value: yyyy + 1 },
    });

    fireEvent.click(api.getByTestId('submit'));

    expect(api.getByTestId('result')).toHaveTextContent('check_circle');
    expect(api.getByTestId('result')).toHaveTextContent(
      'Your card has been succesfully added.'
    );
  });
});
