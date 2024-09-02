import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Crud.css';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [updatedBook, setUpdatedBook] = useState({ title: '', author: '' });
  const Navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []); 

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/books', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      if (error.response && error.response.status === 403) {
        alert('Please log in to proceed.');
        Navigate('/Login');
      }else{
        console.error('Error fetching books:', error);
        alert('Error fetching books');
      }
    }
  };

  const handleAddBook = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/api/books', newBook, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks([...books, response.data]);
      setNewBook({ title: '', author: '' });
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('Please log in to proceed.');
        Navigate('/Login');
      }else{
        console.error('Error adding book:', error);
        alert("Error adding book");
      }
    }
  };

  const handleUpdateBook = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/books/${id}`, updatedBook, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedBooks = books.map(book => {
        if (book.id === id) {
          return { ...book, title: updatedBook.title, author: updatedBook.author };
        }
        return book;
      });
      setBooks(updatedBooks);
      setSelectedBookId(null); // Hide the input fields after update
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('Please log in to proceed.');
        Navigate('/Login');
      }else{
        console.error('Error updating book:', error);
        alert("Error updating book");
      }
      
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedBooks = books.filter(book => book.id !== id);
      setBooks(updatedBooks);
    } catch (error) {
      
      if (error.response && error.response.status === 403) {
        alert('Please log in to proceed.');
        Navigate('/Login');
      }else{
        console.error('Error deleting book:', error);
        alert("Error deleting book");
      }
    }
  };

  return (
    <div className='center-container'>
    <div className='container'> 
      <h2>Let the creation begin!</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {selectedBookId === book.id ? (
              <>
                <input
                  type="text"
                  placeholder="Updated Title"
                  value={updatedBook.title}
                  onChange={(e) => setUpdatedBook({ ...updatedBook, title: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Updated Author"
                  value={updatedBook.author}
                  onChange={(e) => setUpdatedBook({ ...updatedBook, author: e.target.value })}
                />
                <button onClick={() => handleUpdateBook(book.id)}>
                  Save
                </button>
              </>
            ) : (
              <>
                {book.title} by {book.author}
                <button onClick={() => { setSelectedBookId(book.id); setUpdatedBook({ title: book.title, author: book.author }) }}>
                  Update
                </button>
                <button onClick={() => handleDeleteBook(book.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <h3>Add New Book</h3>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <button onClick={handleAddBook}>
          Add Book
        </button>
      </div>
    </div>
    </div>
  );
};

export default App;
