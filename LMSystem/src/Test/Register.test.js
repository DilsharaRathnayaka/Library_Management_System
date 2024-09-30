import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from './Register';

describe('Register Component', () => {
    test('renders registration form', () => {
        render(<Register />);
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    test('successful registration', () => {
        render(<Register />);
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'newuser@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText(/register/i));

        expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
    });
});
