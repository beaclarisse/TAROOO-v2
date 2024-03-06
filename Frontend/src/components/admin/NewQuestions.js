import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Sidebar from './Sidebar';


const newQuestion = () => {
  const [newQuestion, setNewQuestion] = useState({
    questionText: '',
    options: '', // Initialize options as an empty string
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateQuestion = async () => {
    // Ensure options is always a string
    const optionsArray = (typeof newQuestion.options === 'string' ? newQuestion.options.split(',').map(option => option.trim()) : []);

    try {
      await axios.post('/api/v1/questions', {
        questionText: newQuestion.questionText,
        options: optionsArray,
      });
      // Show success toast
      toast.success('Question created successfully');
      // Optionally, you can redirect to another page or perform other actions.
      console.log('Question created successfully');
      // Reset the form after successful creation
      setNewQuestion({
        questionText: '',
        options: '',
      });
    } catch (error) {
      console.error('Error creating question:', error);
      // Handle error (e.g., show an error message to the user)
      toast.error('Failed to create question');
    }
  };

  return (
    <div className="container mt-5" style={{ background: 'white' }}>
      <Sidebar />
      <div className="row">
        <div className="col-md-3">
        </div>
        <div className="col-md-9 text-crud" style={{ paddingBottom: '50px' }}>
          <h2 className='title-crud'>Create Question</h2>
          <div className="mb-3">
            <label htmlFor="questionText" className="form-label d-block text-center">Question Text:</label>
            <input
              type="text"
              id="questionText"
              name="questionText"
              value={newQuestion.questionText}
              onChange={handleInputChange}
              className="form-control mx-auto"
              style={{ maxWidth: '500px', width: '400px', height: '100px', wordWrap: 'break-word' }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="options" className="form-label d-block text-center">Options (comma-separated):</label>
            <input
              type="text"
              id="options"
              name="options"
              value={newQuestion.options}
              onChange={handleInputChange}
              className="form-control mx-auto"
              style={{ maxWidth: '300px' }}
            />
          </div>
          <div className="text-center">
            <button
              className="btn btn-crud btn-success"
              onClick={handleCreateQuestion}
              style={{ borderRadius: '5px', padding: '10px 20px', fontSize: '16px' }}
            >
              Create Question
            </button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default newQuestion;
