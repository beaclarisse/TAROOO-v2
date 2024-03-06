import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextareaAutosize } from '@mui/material';

import Sidebar from '../Sidebar';


const updateSurveyList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState({
    questionText: '',
    options: [],
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`/api/v1/allQuestions/${id}`);
        const { questionText, options } = response.data.question;

        // Ensure options is an array, if it's a string, split it
        const optionsArray = Array.isArray(options) ? options : options.split(',');

        setQuestion({
          questionText,
          options: optionsArray,
        });
      } catch (error) {
        console.error('Error fetching question:', error);
        // Handle error (e.g., show an error message to the user)
      }
    };

    fetchQuestion();
  }, [id]);

  const handleInputChange = (e) => {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value,
    });
  };

  const handleOptionsChange = (e) => {
    // Split the comma-separated string into an array
    const optionsArray = e.target.value.split(',');
    setQuestion({
      ...question,
      options: optionsArray,
    });
  };

  const handleUpdateQuestion = async () => {
    try {
      await axios.put(`/api/v1/allQuestions/${id}`, question);
      // Show success toast
      toast.success('Question updated successfully');
      // Optionally, you can redirect to another page or perform other actions.
      navigate('/overallSurvey');
    } catch (error) {
      console.error('Error updating question:', error);
      // Handle error (e.g., show an error message to the user)
      toast.error('Failed to update question');
    }
  };

  return (
    <div className="container mt-5" style={{ background: 'white' }}>
        <Sidebar/>
      <div className="row">
        <div className="col-md-3">

        </div>
        <div className="col-md-9 text-crud" style={{ paddingBottom: '50px' }}>
          <h2 className="title-crud">Update Question</h2>
          {/* <div className="mb-3">
            <label htmlFor="questionText" className="form-label">Question Text:</label>
            <input
              type="text"
              id="questionText"
              name="questionText"
              value={question.questionText}
              onChange={handleInputChange}
              className="form-control"
            />
          </div> */}
          <div className="mb-3">

            <label htmlFor="questionText" className="form-label d-block text-center">Question Text:</label>

            <TextareaAutosize
              id="questionText"
              name="questionText"
              value={question.questionText}
              onChange={handleInputChange}
              className="form-control mx-auto"
              style={{ maxWidth: '1000px', width: '800px', height: '100px', overflowWrap: 'break-word', wordWrap: 'break-word', resize: 'vertical' }}
              placeholder="Type your question text here..."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="options" className="form-label">Options (comma-separated):</label>
            <input
              type="text"
              id="options"
              name="options"
              value={question.options.join(',')} // Join options into a string for input
              onChange={handleOptionsChange} // Use separate handler for options
              className="form-control"
            />
          </div>
          <div>
            <button onClick={handleUpdateQuestion} className="btn btn-crud">Update Question</button>
          </div>
          <ToastContainer />
        </div>

      </div>
    </div>
  );
};

export default updateSurveyList;
