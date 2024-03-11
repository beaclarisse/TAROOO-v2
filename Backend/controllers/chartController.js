const FarmerQuestion = require("../models/farmerQuestions");
const FarmerAnswer = require("../models/fanswer");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

exports.getResultsByQuestion = async (req, res, next) => {
  try {
    const farmerQuestion = await FarmerQuestion.findById(req.params.id);

    const farmerAnswers = await FarmerAnswer.find();

    const flattenedAnswers = farmerAnswers.flatMap((item) => item.answers);
    const results = flattenedAnswers.filter(
      (item) => item.questions.toString() === farmerQuestion._id.toString()
    );

    const initialResults = results.reduce((acc, curr) => {
      const option = curr.selectedOption;
      acc[option] = (acc[option] || 0) + 1;
      return acc;
    }, {});

    const answers = farmerQuestion.options.reduce((acc, option) => {
      acc[option] = 0;
      return acc;
    }, {});

    for (const option in initialResults) {
      answers[option] = initialResults[option];
    }

    if (!farmerQuestion) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    return res.status(200).json({
      success: true,
      farmerQuestion: farmerQuestion,
      answers: answers,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};



// const FarmerQuestion = require("../models/farmerQuestions");
// const FarmerAnswer = require("../models/fanswer");
const SellerQuestion = require("../models/sellerQuestions");
const SellerAnswer = require("../models/sanswer");

exports.getSellerResultsByQuestion = async (req, res, next) => {
  try {
    const sellerQuestion = await SellerQuestion.findById(req.params.id);

    const sellerAnswers = await SellerAnswer.find();

    const flattenedAnswers = sellerAnswers.flatMap((item) => item.answers);
    const results = flattenedAnswers.filter(
      (item) => item.questions.toString() === sellerQuestion._id.toString()
    );

    const initialResults = results.reduce((acc, curr) => {
      const option = curr.selectedOption;
      acc[option] = (acc[option] || 0) + 1;
      return acc;
    }, {});

    const answers = sellerQuestion.options.reduce((acc, option) => {
      acc[option] = 0;
      return acc;
    }, {});

    for (const option in initialResults) {
      answers[option] = initialResults[option];
    }

    if (!sellerQuestion) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    return res.status(200).json({
      success: true,
      sellerQuestion: sellerQuestion,
      answers: answers,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//CONSUMER

const ConsumerQuestion = require("../models/questions");
const ConsumerAnswer = require("../models/answer");

exports.getConsumerResultsByQuestion = async (req, res, next) => {
  try {
    const consumerQuestion = await ConsumerQuestion.findById(req.params.id);

    const consumerAnswers = await ConsumerAnswer.find();

    const flattenedAnswers = consumerAnswers.flatMap((item) => item.answers);
    const results = flattenedAnswers.filter(
      (item) => item.questions.toString() === consumerQuestion._id.toString()
    );

    const initialResults = results.reduce((acc, curr) => {
      const option = curr.selectedOption;
      acc[option] = (acc[option] || 0) + 1;
      return acc;
    }, {});

    const answers = consumerQuestion.options.reduce((acc, option) => {
      acc[option] = 0;
      return acc;
    }, {});

    for (const option in initialResults) {
      answers[option] = initialResults[option];
    }

    if (!ConsumerQuestion) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    return res.status(200).json({
      success: true,
      consumerQuestion: consumerQuestion,
      answers: answers,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};
const Answer = require('../models/fanswer');

exports.getAllAnswers = async (req, res, next) => {
  try {
    // Fetch all answers from the database
    const answers = await Answer.find({});
    console.log('Fetched answers:', answers); // Log the fetched answers

    // Check if answers is an array before sending the response
    if (!Array.isArray(answers)) {
      throw new Error('Fetched data is not an array');
    }

    res.status(200).json({
      success: true,
      answers,
    });
  } catch (error) {
    console.error('Error fetching answers:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};