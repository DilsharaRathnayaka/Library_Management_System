import React from 'react';
import './Navbar.css'; // Import the CSS file

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">MyApp</div>
      <ul className="navbar-links">
        <li><a href="/register">Register</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/add-book">Add Book</a></li>
        <li><a href="/view-books">View Books</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
