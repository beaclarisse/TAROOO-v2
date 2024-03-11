const express = require("express");
const router = express.Router();
const chartController = require("../controllers/chartController");


router.get("/get-results-by-question/:id", chartController.getResultsByQuestion);

router.get("/get-seller-results-by-question/:id", chartController.getSellerResultsByQuestion);

router.get("/get-consumer-results-by-question/:id", chartController.getConsumerResultsByQuestion);


// router.get("/getAllanswer", chartController.getAllAnswers);


module.exports = router;