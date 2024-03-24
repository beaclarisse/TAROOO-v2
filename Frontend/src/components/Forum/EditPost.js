import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "../layout/Header";
import { useNavigate, useParams } from "react-router-dom";
import Filter from "bad-words";
import { getToken, successMsg } from "../../utils/helpers"


const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [post, setPost] = useState(true);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [tags, setTags] = useState("");
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isUpdated, setIsUpdated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const filter = new Filter();

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      'Authorization': `Bearer ${getToken()}`,
    },
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);

    setImages([]);

    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);

          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const fetchPost = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/userPost/${id}`,
        config
      );
      console.log(data);
      // const postData = response.data;
      setPost(data.post)
      console.log(data.post)
      setTitle(data.post.title);
      
      setContent(data.post.content);
      setTags(data.post.tags);
      setOldImages(data.post.images);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };
  // useEffect(() => {

  //   fetchPost();
  // }, [id]);

  const updatePosts = async (id, postData) => {
    try {
      const { data } = await axios.put(
        `/api/v1/updatePost/${id}`,
        postData,
        config
      );
      console.log(data)
      setIsUpdated(data.success);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  }
  useEffect(() => {
    if(post && post._id !== id){
      fetchPost(id)
    } else {
      setTitle(post.title);
      setContent(post.content);
      setTags(post.tags);
      setOldImages(post.images);
    }
    if (error){
      console.log(error)
    }
    if (isUpdated){
      successMsg('Post updated successfully')
      navigate(`/post/${id}`)
    }
  }, [error, isUpdated, id, post])

  const submitHandler = (e) => {
    e.preventDefault();
  
    // if (!post || !post._id) {
    //   console.error('Post is undefined or does not have _id property');
    //   return;
    // }
    
    const formData = new FormData();
    formData.set('title', title);
    formData.set('content', content);
    formData.set('tags', tags);
    
    if (e.target.images.value) {
      images.forEach(image => {
        formData.append('images', image)
      });
    }
    
    updatePosts(post._id, formData);
  }


  // const handleTitleChange = (e) => {
  //   setTitle(filter.clean(e.target.value));
  // };

  // const handleContentChange = (e) => {
  //   setContent(filter.clean(e.target.value));
  // };

  // const handleTagsChange = (e) => {
  //   setTags(filter.clean(e.target.value));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const formData = new FormData();
  //     formData.set("user", user._id);
  //     formData.set("title", title);
  //     formData.set("content", content);
  //     formData.set("tags", tags);

  //     images.forEach((image) => {
  //       formData.append("images", image);
  //     });

  //     await axios.put(
  //       `http://localhost:3000/api/v1/updatePost/${id}`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       }
  //     );
  //     navigate(`/post/${id}`);
  //   } catch (error) {
  //     console.error("Error editing post:", error);
  //   }
  // };

  return (
    <div
      className="container mt-5"
      style={{ background: "#1b1b1b", padding: "20px", borderRadius: "10px" }}
    >
      <Header />
      <h2>Edit Post</h2>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="content"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="images"
            accept="image/*"
            onChange={onChange}
            
          />
          <div align="center">
            {oldImages &&
              oldImages.map((img) => (
                <img
                  key={img}
                  src={img.url}
                  alt={img.url}
                  className="mt-3 mr-2"
                  width="140"
                  height="140"
                />
              ))}

            {imagesPreview.map((img) => (
              <img
                src={img}
                key={img}
                alt="Images Preview"
                className="mt-3 mr-2"
                width="140"
                height="140"
              />
            ))}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Tags (comma-separated)
          </label>
          {/* <textarea className="form-control" id="content" rows="4" value={tags} onChange={handleTagsChange} required></textarea> */}
          <input
            type="text"
            className="form-control"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        {user ? (
          <button
            type="submit"
            className="btn btn-primary"
            style={{ background: "#232b2b" }}
          >
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
