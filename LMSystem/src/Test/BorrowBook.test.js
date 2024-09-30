import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BorrowBook from './BorrowBook';
import { BrowserRouter as Router } from 'react-router-dom';

describe('BorrowBook Component', () => {
  test('renders Borrow Book form', () => {
    render(
      <Router>
        <BorrowBook />
      </Router>
    );

    expect(screen.getByLabelText(/Select a book/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Borrow/i })).toBeInTheDocument();
  });

  test('borrows a book successfully', () => {
    render(
      <Router>
        <BorrowBook />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Select a book/i), {
      target: { value: 'Book 1' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Borrow/i }));

    expect(screen.getByText(/Book borrowed successfully/i)).toBeInTheDocument();
  });

  test('shows error when no book is selected', () => {
    render(
      <Router>
        <BorrowBook />
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: /Borrow/i }));

    expect(screen.getByText(/Please select a book/i)).toBeInTheDocument();
  });
});
