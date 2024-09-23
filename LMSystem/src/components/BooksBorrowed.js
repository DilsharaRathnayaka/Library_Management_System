import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function BooksBorrowed() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(collection(db, "borrowedBooks"));
      const booksData = querySnapshot.docs.map(doc => doc.data());
      setBooks(booksData);
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-6">Books Borrowed by Members</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index} className="bg-white shadow-md p-4 mb-2">
            {book.title} borrowed by {book.memberName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BooksBorrowed;
