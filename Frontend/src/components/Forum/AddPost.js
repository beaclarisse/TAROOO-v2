import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from '../layout/Header'
import { useNavigate } from 'react-router-dom';
import Filter from 'bad-words';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const filter = new Filter();
  const [content, setContent] = useState('');
  const [images, setImage] = useState(null);
  const [tags, setTags] = useState('');
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // const handleTitleChange = (e) => {
  //   setTitle(e.target.value);
  // };

  const handleTitleChange = (e) => {
    const cleanedTitle = filter.clean(e.target.value);
    setTitle(cleanedTitle);
  };

  const handleContentChange = (e) => {
    const cleanedContent = filter.clean(e.target.value);
    setContent(cleanedContent);
  };

  const handleTagsChange = (e) => {
    const cleanedTags = filter.clean(e.target.value);
    setTags(cleanedTags);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('images', images);
      formData.append('tags', tags);
      formData.append('user', user._id);

      await axios.post('http://localhost:3000/api/v1/AddPost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      });
      navigate('/forum');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
  
  return (
    <div className="container mt-5" style={{ background: '#1b1b1b', padding: '20px', borderRadius: '10px' }}>
      <Header />
      <h2>Share Experience</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" id="title" value={title} onChange={handleTitleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea className="form-control" id="content" rows="4" value={content} onChange={handleContentChange} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input type="file" className="form-control" id="images" accept="image/*" onChange={handleImageChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Tags (comma-separated)
          </label>
          <input type="text" className="form-control" id="tags" value={tags} onChange={handleTagsChange} />
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

export default AddPost;
