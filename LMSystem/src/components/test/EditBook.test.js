import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditBook from './EditBook';

test('renders Edit Book form', () => {
    render(<EditBook />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
});

test('submits edited book data', () => {
    render(<EditBook />);
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Updated Book' } });
    fireEvent.click(screen.getByText(/submit/i));

    expect(screen.getByText(/book updated successfully/i)).toBeInTheDocument();
});
