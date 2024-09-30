import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders homepage', () => {
    render(<Home />);
    expect(screen.getByText(/welcome to the e-library/i)).toBeInTheDocument();
});
