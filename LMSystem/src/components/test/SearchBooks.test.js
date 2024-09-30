import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBooks from './SearchBooks';
import { BrowserRouter as Router } from 'react-router-dom';

describe('SearchBooks Component', () => {
  const mockBooks = [
    { id: 1, title: 'Harry Potter', author: 'J.K. Rowling' },
    { id: 2, title: 'Lord of the Rings', author: 'J.R.R. Tolkien' },
  ];

  test('renders search input', () => {
    render(
      <Router>
        <SearchBooks books={mockBooks} />
      </Router>
    );

    expect(screen.getByPlaceholderText(/Search for books/i)).toBeInTheDocument();
  });

  test('displays results based on search query', () => {
    render(
      <Router>
        <SearchBooks books={mockBooks} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Search for books/i), {
      target: { value: 'Harry' },
    });

    expect(screen.getByText(/Harry Potter/i)).toBeInTheDocument();
    expect(screen.queryByText(/Lord of the Rings/i)).not.toBeInTheDocument();
  });

  test('shows no results message when no books match', () => {
    render(
      <Router>
        <SearchBooks books={mockBooks} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Search for books/i), {
      target: { value: 'Non-existing book' },
    });

    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });
});
