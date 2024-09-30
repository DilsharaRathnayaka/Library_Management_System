import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // Assuming this is your main component

describe('User Acceptance Testing for E-library Management System', () => {

  test('verify member registration process is user-friendly', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    fireEvent.click(screen.getByText(/Register/i));
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Name/i), {
      target: { value: 'Test User' },
    });
    fireEvent.click(screen.getByText(/Submit/i));

    expect(screen.getByText(/Registration successful/i)).toBeInTheDocument();
  });

  test('verify members can easily find and borrow books', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Simulate member login
    fireEvent.click(screen.getByText(/Member Login/i));
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText(/Login/i));

    // Search and borrow a book
    fireEvent.change(screen.getByPlaceholderText(/Search for books/i), {
      target: { value: 'Book Title' },
    });
    fireEvent.click(screen.getByText(/Search/i));
    fireEvent.click(screen.getByText(/Borrow Book/i));

    expect(screen.getByText(/Book borrowed successfully/i)).toBeInTheDocument();
  });

  test('verify that error messages are clear and helpful', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    fireEvent.click(screen.getByText(/Member Login/i));
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByText(/Login/i));

    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });

  test('verify overall system performance meets user expectations', async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Simulate system performance checks
    fireEvent.click(screen.getByText(/Browse Books/i));

    expect(await screen.findByText(/Loading/i)).toBeInTheDocument(); // Ensure loading is displayed
  });

  test('verify that the interface is intuitive and easy to navigate', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Explore different sections
    fireEvent.click(screen.getByText(/Profile/i));
    expect(screen.getByText(/User Profile/i)).toBeInTheDocument(); // Ensure user can navigate to Profile
  });
});
