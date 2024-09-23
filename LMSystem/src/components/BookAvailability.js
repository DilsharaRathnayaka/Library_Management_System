import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function BookAvailability() {
  const [availableBooks, setAvailableBooks] = useState([]);

  useEffect(() => {
    const fetchAvailableBooks = async () => {
      const querySnapshot = await getDocs(collection(db, "availableBooks"));
      const booksData = querySnapshot.docs.map(doc => doc.data());
      setAvailableBooks(booksData);
    };

    fetchAvailableBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-6">Book Availability</h2>
      <ul>
        {availableBooks.map((book, index) => (
          <li key={index} className="bg-white shadow-md p-4 mb-2">
            {book.title} - {book.available ? "Available" : "Not Available"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookAvailability;
