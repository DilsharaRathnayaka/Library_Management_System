import { auth, db } from '../firebase'; // Import Firestore DB and auth
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDoc, doc, getDocs, deleteDoc } from 'firebase/firestore'; // Add deleteDoc for profile deletion
import { signOut } from 'firebase/auth'; // Add signOut for logging out

function Profile() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [borrowedBooks, setBorrowedBooks] = useState([]); // State to store borrowed books
  const [role, setRole] = useState(''); // State to store user's role
  const [name, setName] = useState(''); // State to store user's name

  useEffect(() => {
    if (!user) {
      alert('You need to be logged in to view your profile.');
      navigate('/login');
    } else {
      // Fetch user's role and name from Firestore
      const fetchUserData = async () => {
        const userDoc = doc(db, 'users', user.uid); // Reference to the user's document
        const docSnapshot = await getDoc(userDoc); // Fetch the document
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setRole(userData.role); // Set the role in state
          setName(userData.name); // Set the name in state
        }
      };

      // Fetch borrowed books from Firestore
      const fetchBorrowedBooks = async () => {
        const booksCollection = collection(db, `users/${user.uid}/borrowedBooks`);
        const booksSnapshot = await getDocs(booksCollection);
        const booksList = booksSnapshot.docs.map(doc => doc.data());
        setBorrowedBooks(booksList); // Store in state
      };

      fetchUserData();
      fetchBorrowedBooks();
    }
  }, [user, navigate]);

  // Delete user profile function
  const handleDeleteProfile = async () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'users', user.uid)); // Delete user's profile from Firestore
        alert('Profile deleted successfully.');
        signOut(auth); // Log out user after profile deletion
        navigate('/login');
      } catch (error) {
        alert('Error deleting profile: ' + error.message);
      }
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out user
      alert('You have been logged out.');
      navigate('/login');
    } catch (error) {
      alert('Error logging out: ' + error.message);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-[#f4e5ff]">
      <div className="bg-white p-12 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-black-600 mb-6">
          {`Welcome, ${name}!`}
        </h2>
        <div className="text-left space-y-6">
          {role === 'member' && (
            <>
              <h3 className="text-2xl font-semibold text-black-400 mt-4">Borrowed Books</h3>
              {borrowedBooks.length > 0 ? (
                <ul className="space-y-4">
                  {borrowedBooks.map((book, index) => (
                    <li key={index} className="p-4 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm">
                      <p className="font-semibold text-lg text-gray-800">Book Name: {book.BookName}</p>
                      <p className="font-semibold text-lg text-gray-800">Book ID: {book.bookID}</p>
                      <p className="text-gray-700">Return Date: {book.dateOfReturn}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No books borrowed yet.</p>
              )}
              <div className="flex justify-center mt-4">
                <button className="bg-[#000000] text-white py-2 px-4 rounded hover:bg-[#c7b0ee] transition">
                  <a href="/Searchbook">Borrow Books</a>
                </button>
              </div>
            </>
          )}
          <p className="mt-10 text-center text-gray-600 italic">
            {role === 'member'
             ? `"Books are a uniquely portable magic." - Stephen King`
             : `"Saving one book at a time, changing the world with knowledge." - Unknown`}
          </p>

          {role === 'admin' && (
            <div className="flex justify-center mt-4 space-x-4">
              <button className="bg-[#000000] text-white py-2 px-4 rounded hover:bg-[#c7b0ee] transition">
                <a href="/Add">Add Book</a>
              </button>
              <button className="bg-[#000000] text-white py-2 px-4 rounded hover:bg-[#c7b0ee] transition">
                <a href="/Viewbook">View Books</a>
              </button>
              {/* Generate Report button */}
              <button className="bg-[#000000] text-white py-2 px-4 rounded hover:bg-[#c7b0ee] transition">
                <a href="/ReportTypes">Generate Report</a>
              </button>
            </div>
          )}

          {/* Edit Profile button */}
          <div className="flex justify-center mt-4">
            <button
              className="bg-[#000000] text-white py-2 px-4 rounded hover:bg-[#c7b0ee] transition"
              onClick={() => navigate('/EditProfile')}
            >
              Edit Profile
            </button>
          </div>

         {/* Delete Profile button */}
         <div className="flex justify-center mt-4">
            <button
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition"
              onClick={handleDeleteProfile}
            >
              Delete Profile
            </button>
          </div>

        {/* Logout button */}
        <div className="flex justify-center mt-4">
            <button
              className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-500 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
