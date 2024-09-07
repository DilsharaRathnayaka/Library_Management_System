import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import ViewBook from './components/ViewBook';
import Footer from './components/Footer';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <nav className="bg-[#000000] p-5 shadow-md">
          <div className="container mx-auto flex justify-around items-center">
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `text-white px-10 py-2 rounded-lg ${isActive ? 'bg-[#c7b0ee]' : 'hover:bg-[#000000]'} transition-colors`
              }
            >
              Register
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-white px-10 py-2 rounded-lg ${isActive ? 'bg-[#c7b0ee]' : 'hover:bg-gray-700'} transition-colors`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-white px-10 py-2 rounded-lg ${isActive ? 'bg-[#c7b0ee]' : 'hover:bg-gray-700'} transition-colors`
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                `text-white px-4 py-2 rounded-lg ${isActive ? 'bg-[#c7b0ee]' : 'hover:bg-gray-700'} transition-colors`
              }
            >
              Add Book
            </NavLink>
            <NavLink
              to="/viewbook"
              className={({ isActive }) =>
                `text-white px-4 py-2 rounded-lg ${isActive ? 'bg-[#c7b0ee]' : 'hover:bg-gray-700'} transition-colors`
              }
            >
              View Books
            </NavLink>
          </div>
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
