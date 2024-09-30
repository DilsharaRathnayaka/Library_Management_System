import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditProfile from './EditProfile';

test('renders Edit Profile form', () => {
    render(<EditProfile />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
});

test('updates profile successfully', () => {
    render(<EditProfile />);
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'NewUser' } });
    fireEvent.click(screen.getByText(/save/i));

    expect(screen.getByText(/profile updated successfully/i)).toBeInTheDocument();
});
