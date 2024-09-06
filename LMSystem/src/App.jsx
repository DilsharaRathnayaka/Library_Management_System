import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import ViewBook from './components/ViewBook';
import Footer from './components/Footer'; // Ensure Footer component filename matches
import './App.css'; // Import the CSS file for styling


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <nav className="navbar">
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Register
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Login
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Profile
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Add Book
          </NavLink>
          <NavLink
            to="/viewbook"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            View Books
          </NavLink>
        </nav>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Login />} /> {/* Default route */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/edit/:id" element={<EditBook />} />
            <Route path="/viewbook" element={<ViewBook />} />
          </Routes>
        </main>

        <Footer /> {/* Footer is included here */}
      </div>
    </Router>
  );
}

export default App;
