import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteBook from './DeleteBook';

test('renders Delete Book button', () => {
    render(<DeleteBook />);
    expect(screen.getByText(/delete book/i)).toBeInTheDocument();
});

test('confirms deletion of the book', () => {
    render(<DeleteBook />);
    fireEvent.click(screen.getByText(/delete book/i));
    
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/yes/i));

    expect(screen.getByText(/book deleted successfully/i)).toBeInTheDocument();
});
