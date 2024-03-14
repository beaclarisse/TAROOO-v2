const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const auth = require("./routes/auth");
const taro = require("./routes/taro");
const disease = require("./routes/disease");
const preventive = require("./routes/preventive");
const forum = require("./routes/Forum");
const comment = require("./routes/comment");
const videos = require("./routes/video");
const infographic = require("./routes/Infographic");

const answer = require("./routes/answer");
const question = require("./routes/question")
const fquestion = require("./routes/farmerQuestions")
const squestions = require("./routes/sellerQuestions")
const fanswer = require("./routes/fanswer")
const sanswer = require("./routes/sanswer")
const allQuestions = require("./routes/allQuestion")
const allAnswer = require("./routes/allAnswer")
const chartRoutes = require("./routes/chartRoutes")

const consultation = require("./routes/consultation")
const ConsultComment = require("./routes/ConsultComment")


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());

app.use("/api/v1", auth);
app.use("/api/v1", taro);
app.use("/api/v1", disease);
app.use("/api/v1", preventive);
app.use("/api/v1", forum);
app.use("/api/v1", comment);
app.use("/api/v1", videos);
app.use("/api/v1", infographic);

app.use("/api/v1", chartRoutes);


///questions
app.use("/api/v1", question);
app.use("/api/v1", fquestion);
app.use("/api/v1", squestions);
app.use("/api/v1", allQuestions)

//answer
app.use("/api/v1", answer);
app.use("/api/v1", fanswer);
app.use("/api/v1", sanswer);
app.use("/api/v1", allAnswer )

app.use("/api/v1", consultation)
app.use("/api/v1", ConsultComment)

module.exports = app;
