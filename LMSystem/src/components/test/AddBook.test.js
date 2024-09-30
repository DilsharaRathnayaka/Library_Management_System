import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddBook from './AddBook';

test('renders Add Book form', () => {
    render(<AddBook />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/author/i)).toBeInTheDocument();
});

test('submits form with valid data', () => {
    render(<AddBook />);
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Book' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Author Name' } });
    fireEvent.click(screen.getByText(/submit/i));

    expect(screen.getByText(/book added successfully/i)).toBeInTheDocument();
});
