import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // Assuming this is your main component

describe('System Testing for E-library Management System', () => {
  
  test('end-to-end member registration and book borrowing', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Simulate member registration
    fireEvent.click(screen.getByText(/Register/i));
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Name/i), {
      target: { value: 'Test User' },
    });
    fireEvent.click(screen.getByText(/Submit/i));

    expect(screen.getByText(/Welcome, Test User/i)).toBeInTheDocument();

    // Simulate book browsing and borrowing
    fireEvent.click(screen.getByText(/Browse Books/i));
    fireEvent.click(screen.getByText(/Borrow Book/i)); // Assuming there's a borrow button for a book

    expect(screen.getByText(/Book borrowed successfully/i)).toBeInTheDocument();
  });

  test('end-to-end admin adding, editing, and deleting books', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Simulate admin login
    fireEvent.click(screen.getByText(/Admin Login/i));
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'admin@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'adminpassword' },
    });
    fireEvent.click(screen.getByText(/Login/i));

    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();

    // Simulate adding a new book
    fireEvent.click(screen.getByText(/Add Book/i));
    fireEvent.change(screen.getByPlaceholderText(/Book Title/i), {
      target: { value: 'New Book' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Author/i), {
      target: { value: 'Author Name' },
    });
    fireEvent.click(screen.getByText(/Submit/i));

    expect(screen.getByText(/Book added successfully/i)).toBeInTheDocument();

    // Simulate editing the book
    fireEvent.click(screen.getByText(/Edit/i)); // Assuming there's an edit button for the book
    fireEvent.change(screen.getByPlaceholderText(/Book Title/i), {
      target: { value: 'Updated Book' },
    });
    fireEvent.click(screen.getByText(/Save/i));

    expect(screen.getByText(/Book updated successfully/i)).toBeInTheDocument();

    // Simulate deleting the book
    fireEvent.click(screen.getByText(/Delete/i)); // Assuming there's a delete button for the book
    expect(screen.getByText(/Book deleted successfully/i)).toBeInTheDocument();
  });

  test('member cannot access admin functionalities', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Simulate member login
    fireEvent.click(screen.getByText(/Member Login/i));
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText(/Login/i));

    // Attempt to access admin page
    fireEvent.click(screen.getByText(/Admin Dashboard/i));

    expect(screen.getByText(/Access Denied/i)).toBeInTheDocument();
  });

  test('system behavior when a member deletes their profile', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Simulate member login
    fireEvent.click(screen.getByText(/Member Login/i));
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText(/Login/i));

    // Simulate profile deletion
    fireEvent.click(screen.getByText(/Delete Profile/i));
    fireEvent.click(screen.getByText(/Confirm/i));

    expect(screen.getByText(/Profile deleted successfully/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument(); // Check if redirected to login
  });

  test('verify system handles invalid login attempts', () => {
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

  test('verify password change functionality for members', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Simulate member login
    fireEvent.click(screen.getByText(/Member Login/i));
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText(/Login/i));

    // Simulate password change
    fireEvent.click(screen.getByText(/Change Password/i));
    fireEvent.change(screen.getByPlaceholderText(/New Password/i), {
      target: { value: 'newpassword123' },
    });
    fireEvent.click(screen.getByText(/Save/i));

    expect(screen.getByText(/Password changed successfully/i)).toBeInTheDocument();

    // Log out and log in with the new password
    fireEvent.click(screen.getByText(/Logout/i));
    fireEvent.click(screen.getByText(/Member Login/i));
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'newpassword123' },
    });
    fireEvent.click(screen.getByText(/Login/i));

    expect(screen.getByText(/Welcome, Test User/i)).toBeInTheDocument();
  });
});
