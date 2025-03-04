import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Button } from '@/components/Button/Button';
afterEach(cleanup);

it('renders the button text', () => {
  const { getByText } = render(<Button appliedStyle='contactUs' innerText='Contact Us' />);
  expect(getByText('Contact Us')).toBeInTheDocument();
})

it('renders with a different style', () => {
  const { container } = render(<Button appliedStyle='booking' innerText='Book now' />);
  expect(container.firstChild).toHaveClass('booking');
})

it('renders the link to the correct path with city and country ids', () => {
  const { container } = render(<Button appliedStyle='searchingBar' innerText='Search' path='/search' idCity='2' idCountry='5' />);
  expect(container.firstChild.querySelector('a')).toHaveAttribute('href', '/search?idCity=2&idCountry=5');
})
