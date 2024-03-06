const Question = require('../models/questions'); // Adjust the path based on your project structure

// Create a new question
// const createQuestion = async (req, res) => {
//   try {
//     const { questionText, options } = req.body;

//     // Split the options string into an array using commas
//     const optionsArray = options.split(',').map(option => option.trim());

//     const newQuestion = await Question.create({ questionText, options: optionsArray });
//     res.status(201).json(newQuestion);
//   } catch (error) {
//     console.error('Error creating question:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
const createQuestion = async (req, res) => {
  try {
    const { questionText, options } = req.body;

    const newQuestion = await Question.create({ questionText, options });
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({ questions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a question by ID
// const getQuestionById = async (req, res) => {
//   try {
//     const { questionId } = req.params;
//     const question = await Question.findById(questionId);
//     if (!question) {
//       return res.status(404).json({ error: 'Question not found' });
//     }
//     res.status(200).json({ question });
//   } catch (error) {
//     console.error('Error fetching question:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const getQuestionById = async (req, res, next) => {
  const question = await Question.findById(req.params.id);
  if (!question) {
    return res.status(404).json({
      success: false,
      message: 'Question not found'
    })
  }
  res.status(200).json({
    success: true,
    question
  })
}

// Update a question by ID
// const updateQuestion = async (req, res) => {
//   try {
//     const { questionId } = req.params;
//     const { questionText, options } = req.body;
//     const updatedQuestion = await Question.findByIdAndUpdate(
//       questionId,
//       { questionText, options },
//       { new: true }
//     );
//     if (!updatedQuestion) {
//       return res.status(404).json({ error: 'Question not found' });
//     }
//     res.status(200).json(updatedQuestion);
//   } catch (error) {
//     console.error('Error updating question:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update category' });
  }
};

// Delete a question by ID
const deleteQuestion = async (req, res) => {
  try {
    
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};