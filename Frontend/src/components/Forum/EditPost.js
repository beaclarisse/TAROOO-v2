import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from '../layout/Header'
import { useNavigate, useParams } from 'react-router-dom';
import Filter from 'bad-words';

const EditPost = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImage] = useState(null);
  const [tags, setTags] = useState('');
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const filter = new Filter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/posts/${id}`);
        const postData = response.data;
        setTitle(postData.title);
        setContent(postData.content);
    
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  const handleTitleChange = (e) => {
    setTitle(filter.clean(e.target.value));
  };

  const handleContentChange = (e) => {
    setContent(filter.clean(e.target.value));
  };

  const handleTagsChange = (e) => {
    setTags(filter.clean(e.target.value));
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
      formData.append('tags', tags);
      formData.append('user', user._id);

      await axios.put(`http://localhost:3000/api/v1/updatePost/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      });
      navigate(`/post/${id}`); 
    } catch (error) { 
      console.error('Error editing post:', error);
    }
  };
  
  return (
    <div className="container mt-5" style={{ background: '#1b1b1b', padding: '20px', borderRadius: '10px' }}>
      <Header />
      <h2>Edit Post</h2>
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
            Save Changes
          </button>
        ) : (
          <div className="alert alert-danger mt-5" type="alert">
            Login to edit this post.
          </div>
        )}
      </form>
    </div>
  );
};

export default EditPost;
