import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './AddBook.css'; // Ensure correct path

function AddBook() {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isbn, setIsbn] = useState('');

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'books'), {
        BookName: bookName,
        AuthorName: authorName,
        ISBN: isbn,
      });
      alert('Book added successfully!');
      setBookName('');
      setAuthorName('');
      setIsbn('');
    } catch (error) {
      console.error('Error adding book:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="add-book-container">
      <div className="add-book-card">
        <h2 className="add-book-title">Add Book</h2>
        <form onSubmit={handleAddBook}>
          <div>
            <label className="label">Book Name:</label>
            <input
              type="text"
              placeholder="Book Name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              className="input"
              required
            />
          </div>
          <div>
            <label className="label">Author Name:</label>
            <input
              type="text"
              placeholder="Author Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="input"
              required
            />
          </div>
          <div>
            <label className="label">ISBN:</label>
            <input
              type="text"
              placeholder="ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className="input"
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
