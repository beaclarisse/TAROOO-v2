import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from '../layout/Header'
import { useNavigate } from 'react-router-dom';
import Filter from 'bad-words';
import filipinoBadWords from '../filipinoBadWords'; 

const AddPost = () => {
  const [title, setTitle] = useState('');
  const filter = new Filter({ list: filipinoBadWords });
  const [content, setContent] = useState('');
  const [images, setImage] = useState(null);
  const [tags, setTags] = useState('');
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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
    <div style={{ background: '#1b1b1b', padding: '20px', borderRadius: '10px', color: '#fff' }}>
      <Header />
      <h2 style={{ color: '#fff' }}>Share Experience</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label" style={{ color: '#fff' }}>
            Title
          </label>
          <input type="text" className="form-control" id="title" value={title} onChange={handleTitleChange} required style={{ backgroundColor: '#232b2b', color: '#fff' }} />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label" style={{ color: '#fff' }}>
            Content
          </label>
          <textarea className="form-control" id="content" rows="4" value={content} onChange={handleContentChange} required style={{ backgroundColor: '#232b2b', color: '#fff' }}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label" style={{ color: '#fff' }}>
            Image
          </label>
          <input type="file" className="form-control" id="images" accept="image/*" onChange={handleImageChange} required style={{ backgroundColor: '#232b2b', color: '#fff' }} />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label" style={{ color: '#fff' }}>
            Tags (comma-separated)
          </label>
          <input type="text" className="form-control" id="tags" value={tags} onChange={handleTagsChange} style={{ backgroundColor: '#232b2b', color: '#fff' }} />
        </div>
        {user ? (
        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#67568C', border: 'none' }} >
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
