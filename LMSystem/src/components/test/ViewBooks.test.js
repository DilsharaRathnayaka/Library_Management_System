import React from 'react';
import { render, screen } from '@testing-library/react';
import ViewBooks from './ViewBooks';
import { BrowserRouter as Router } from 'react-router-dom';

describe('ViewBooks Component', () => {
  const mockBooks = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
  ];

  test('renders a list of books', () => {
    render(
      <Router>
        <ViewBooks books={mockBooks} />
      </Router>
    );

    expect(screen.getByText(/Book 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Book 2/i)).toBeInTheDocument();
  });

  test('displays no books message when no books available', () => {
    render(
      <Router>
        <ViewBooks books={[]} />
      </Router>
    );

    expect(screen.getByText(/No books available/i)).toBeInTheDocument();
  });
});
