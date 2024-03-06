import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Header from '../layout/Header'

const SSurveyForm = () => {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/v1/squestions');
        setQuestions(response.data.questions);
        const initialFormData = response.data.questions.map(question => ({
          questionId: question._id,
          questionText: question.questionText,
          selectedOption: ''
        }));
        setFormData(initialFormData);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleInputChange = (index, e) => {
    const option = e.target.value;
    const updatedFormData = [...formData];
    updatedFormData[index].selectedOption = option;
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataArray = questions.map((question, index) => ({
      questions: question._id, // or question.questionId depending on your backend expectation
      questionText: question.questionText,
      selectedOption: formData[index]?.selectedOption || '', // Ensure default value if no option selected
    }));
    console.log('Form Data:', formDataArray); // Log formDataArray
    try {
      // Send form data to the server
      await axios.post('/api/v1/ssubmit', formDataArray);

      console.log('Form submitted successfully');
      // Reload the page after successful submission
      window.location.reload();
    } catch (error) {
      console.error('Error submitting form:', error);
      // You can also add code to handle error message
    }
  };

  // Divide questions into three parts: first 5, next 5, and remaining
  const part1Questions = questions.slice(0, 1);
  const part2Questions = questions.slice(1, 2);
  const part3Questions = questions.slice(2, 3);
  const part4Questions = questions.slice(3, 4);
  const part5Questions = questions.slice(4, 5);
  const part6Questions = questions.slice(5, 6);
  const part7Questions = questions.slice(6, 7);
  const part8Questions = questions.slice(7, 8);


  return (
    <Fragment>
     <div className="survey-container" style={{ background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '90%', maxWidth: '800px', padding: '40px', border: '1px solid #ccc', borderRadius: '8px', margin: '40px auto 0' }}>
        <p className="form-title" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
        Seller Questions
      </p>
      <div className="parts-container">
        <Header />
        {/* Part 1 */}
        <div className="part-container-horizontal">
          <h2 className="part-title" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '20px', fontWeight: 'bold', color: '#333', textAlign: 'left',  marginBottom: '10px' }}>Base on your experience</h2>
          <form onSubmit={handleSubmit}>
            {part1Questions.map((question, index) => (
              <div key={question._id} className="question-container">
                <p className="question-text" style={{ textAlign: 'left' }}>{question.questionText}</p>
                <select
                  value={formData[index]?.selectedOption}
                  onChange={(e) => handleInputChange(index, e)}
                  style={{ width: '100%', padding: '8px', marginBottom: '10px' }} >
                  <option value="">Select an option</option>
                  {question.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </form>
          <h2 className="part-title" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '20px', fontWeight: 'bold', color: '#333', textAlign: 'left' }}>-------------</h2>
          <form onSubmit={handleSubmit}>
            {part2Questions.map((question, index) => (
              <div key={question._id} className="question-container">
                <p className="question-text" style={{ textAlign: 'left' }}>{question.questionText}</p>
                <select
                  value={formData[index + 1]?.selectedOption}
                  onChange={(e) => handleInputChange(index + 1, e)}
                >
                  <option value="">Select an option</option>
                  {question.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </form>

          <h2 className="part-title" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '20px', fontWeight: 'bold', color: '#333', textAlign: 'left' }}>---------------</h2>
          <form onSubmit={handleSubmit}>
            {part3Questions.map((question, index) => (
              <div key={question._id} className="question-container">
                <p className="question-text" style={{ textAlign: 'left' }}>{question.questionText}</p>
                <select
                  value={formData[index + 2]?.selectedOption}
                  onChange={(e) => handleInputChange(index + 2, e)}
                >
                  <option value="">Select an option</option>
                  {question.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </form>
          <h2 className="part-title" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '20px', fontWeight: 'bold', color: '#333', textAlign: 'left' }}>-------------</h2>
          <form onSubmit={handleSubmit}>
            {part4Questions.map((question, index) => (
              <div key={question._id} className="question-container">
                <p className="question-text" style={{ textAlign: 'left' }}>{question.questionText}</p>
                <select
                  value={formData[index + 3]?.selectedOption}
                  onChange={(e) => handleInputChange(index + 3, e)}
                >
                  <option value="">Select an option</option>
                  {question.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </form>
          <form onSubmit={handleSubmit}>
            {part5Questions.map((question, index) => (
              <div key={question._id} className="question-container">
                <p className="question-text" style={{ textAlign: 'left' }}>{question.questionText}</p>
                <select
                  value={formData[index + 4]?.selectedOption}
                  onChange={(e) => handleInputChange(index + 4, e)}
                >
                  <option value="">Select an option</option>
                  {question.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </form>

          <form onSubmit={handleSubmit}>
            {part6Questions.map((question, index) => (
              <div key={question._id} className="question-container">
                <p className="question-text" style={{ textAlign: 'left' }}>{question.questionText}</p>
                <select
                  value={formData[index + 5]?.selectedOption}
                  onChange={(e) => handleInputChange(index + 5, e)}
                >
                  <option value="">Select an option</option>
                  {question.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </form>


          <form onSubmit={handleSubmit}>
            {part7Questions.map((question, index) => (
              <div key={question._id} className="question-container">
                <p className="question-text" style={{ textAlign: 'left' }}>{question.questionText}</p>
                <select
                  value={formData[index + 6]?.selectedOption}
                  onChange={(e) => handleInputChange(index + 6, e)}
                >
                  <option value="">Select an option</option>
                  {question.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </form>

          <form onSubmit={handleSubmit}>
            {part8Questions.map((question, index) => (
              <div key={question._id} className="question-container">
                <p className="question-text" style={{ textAlign: 'left' }}>{question.questionText}</p>
                <select
                  value={formData[index + 7]?.selectedOption}
                  onChange={(e) => handleInputChange(index + 7, e)}
                >
                  <option value="">Select an option</option>
                  {question.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </form>

        </div>
      </div>


      {/* Submit button */}
      <div className="submit-button-container">
        <button type="submit" className="submit-button" onClick={handleSubmit}>
          INPUT
        </button>
      </div>
    </div>
    </Fragment>
  );
};

export default SSurveyForm;