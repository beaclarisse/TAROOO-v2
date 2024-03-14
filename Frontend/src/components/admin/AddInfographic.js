import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from '../layout/Header'
import { useNavigate } from 'react-router-dom';
import Filter from 'bad-words';

const AddInfographic = () => {
  const [title, setTitle] = useState('');
  const filter = new Filter();
  const [images, setImage] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    const cleanedTitle = filter.clean(e.target.value);
    setTitle(cleanedTitle);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('images', images);
      formData.append('user', user._id);

      await axios.post('http://localhost:3000/api/v1/admin/AddInfo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      });
      navigate('/Infographic');
    } catch (error) { 
      console.error('Error adding post:', error);
    }
  };
  
  return (
    <div className="container mt-5" style={{ background: '#1b1b1b', padding: '20px', borderRadius: '10px' }}>
      <Header />
      <h2>Add</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" id="title" value={title} onChange={handleTitleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input type="file" className="form-control" id="images" accept="image/*" onChange={handleImageChange} required />
        </div>
        {user ? (
          <button type="submit" className="btn btn-primary" style={{ background: '#232b2b'}} >
            Add 
          </button>
        ) : (
          <div className="alert alert-danger mt-5" type="alert">
            Login to post.
          </div>
        )}
      </form>
    </div>
  );
};

export default AddInfographic;

