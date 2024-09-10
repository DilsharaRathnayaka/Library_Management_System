import { auth, db } from '../firebase'; // Import Firestore DB
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

function Profile() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [borrowedBooks, setBorrowedBooks] = useState([]); // State to store borrowed books

  useEffect(() => {
    if (!user) {
      alert('You need to be logged in to view your profile.');
      navigate('/login');
    } else {
      // Fetch borrowed books from Firestore
      const fetchBorrowedBooks = async () => {
        const booksCollection = collection(db, `users/${user.uid}/borrowedBooks`);
        const booksSnapshot = await getDocs(booksCollection);
        const booksList = booksSnapshot.docs.map(doc => doc.data());
        setBorrowedBooks(booksList); // Store in state
      };

      fetchBorrowedBooks();
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-[#c7b0ee]"> {/* Full-screen flex layout with background */}
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full"> {/* Card container */}
        <h2 className="text-3xl font-bold text-center text-Black-600 mb-10">Profile</h2> {/* Title */}
        <div className="text-left space-y-4"> {/* Content section */}
          <p className="text-lg">
            <span className="font-semibold text-teal-400">Email:</span> {user.email}
          </p>

          {/* List of borrowed books */}
          <h3 className="text-2xl font-semibold text-teal-400 mt-6">Borrowed Books</h3>
          {borrowedBooks.length > 0 ? (
            <ul className="list-disc ml-6 space-y-2">
              {borrowedBooks.map((book, index) => (
                <li key={index} className="text-lg">
                  <p>
                    <span className="font-semibold">Book ID:</span> {book.bookID}
                  </p>
                  <p>
                    <span className="font-semibold">Return Date:</span> {book.dateOfReturn}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No books borrowed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
