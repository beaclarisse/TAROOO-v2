import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Box, Typography } from '@mui/material';
import { BarChart, LineChart } from '@mui/x-charts';
import SurveyForm from '../Question/Survey';
import FSurveyForm from '../Question/farmerSurvey';
import SSurveyForm from '../Question/sellerSurvey';
import Header from '../layout/Header';


const chartSetting = {
  width: 500,
  height: 300,
};

const SurveyAnalysis = () => {
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [SlineChartData, SsetLineChartData] = useState([]);
  const [SbarChartData, SsetBarChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const chartContainerRef = useRef(null);


  useEffect(() => {
    const fetchSurveyAnswers = async () => {
      try {
        // Fetch submitted answers from the survey
        const response = await axios.get('/api/v1/answer');
        const { answers } = response.data;

        // Process the answers to format them for charts
        const lineChartDataMap = new Map();
        const lineChartDataMaps = new Map();
        const barChartDataMap = new Map();+


        answers.forEach(answer => {
          answer.answers.forEach(individualAnswer => {
            const { questions, selectedOption } = individualAnswer;

            // Convert question IDs to labels and filter out unwanted questions
            const questionLabel = mapQuestionIdToLabel(questions);
            if (!questionLabel) return;

            // For LineChart
            const lineData = lineChartDataMap.get(questionLabel) || { questionId: questionLabel, Yes: 0, No: 0, Maybe: 0 };
            lineData[selectedOption]++;
            lineChartDataMap.set(questionLabel, lineData);

            const linesData = lineChartDataMaps.get(questionLabel) || { questionId: questionLabel, Yes: 0, No: 0, Maybe: 0 };
            linesData[selectedOption]++;
            lineChartDataMaps.set(questionLabel, linesData);

            // For BarChart
            const barData = barChartDataMap.get(questionLabel) || { questionId: questionLabel, Yes: 0, No: 0, Maybe: 0 };

            // Validate and handle NaN values
            if (!isNaN(barData[selectedOption])) {
              barData[selectedOption]++;
              barChartDataMap.set(questionLabel, barData);
            }
          });
        });

        const newLineChartData = Array.from(lineChartDataMap.values());
        const newLineChartDatas = Array.from(lineChartDataMap.values());
        const newBarChartData = Array.from(barChartDataMap.values());

        console.log('Line Chart Data:', newLineChartData);
        console.log('Line Chart Data:', newLineChartDatas);
        console.log('Bar Chart Data:', newBarChartData);

        setLineChartData(newLineChartData);
        setBarChartData(newBarChartData);
        setLoading(false); // Set loading state to false after data fetching
      } catch (error) {
        console.error('Error fetching survey answers:', error);
        setError('Error fetching survey answers. Please try again later.');
        setLoading(false); // Set loading state to false in case of error
      }
    };

    const sellerfetchSurveyAnswers = async () => {
      try {
        // Fetch submitted answers from the survey


        const responses = await axios.get('/api/v1/sanswer');
        const { answers } = responses.data;

        // Process the answers to format them for charts
        const lineChartDataMap = new Map();
        const lineChartDataMaps = new Map();
        const barChartDataMap = new Map();+

        console.log(answers)
        answers.forEach(answer => {
          answer.answers.forEach(individualAnswer => {
            const { questions, selectedOption } = individualAnswer;

            // Convert question IDs to labels and filter out unwanted questions
            const questionLabel = mapQuestionIdToLabel(questions);
            if (!questionLabel) return;

            // For LineChart
            const lineData = lineChartDataMap.get(questionLabel) || { questionId: questionLabel, Yes: 0, No: 0, Maybe: 0 };
            lineData[selectedOption]++;
            lineChartDataMap.set(questionLabel, lineData);

            const linesData = lineChartDataMaps.get(questionLabel) || { questionId: questionLabel, Yes: 0, No: 0, Maybe: 0 };
            linesData[selectedOption]++;
            lineChartDataMaps.set(questionLabel, linesData);

            // For BarChart
            const barData = barChartDataMap.get(questionLabel) || { questionId: questionLabel, Yes: 0, No: 0, Maybe: 0 };

            // Validate and handle NaN values
            if (!isNaN(barData[selectedOption])) {
              barData[selectedOption]++;
              barChartDataMap.set(questionLabel, barData);
            }
          });
        });

        //consumer

        //seller
        const snewLineChartData = Array.from(lineChartDataMap.values());
        const snewLineChartDatas = Array.from(lineChartDataMap.values());
        const snewBarChartData = Array.from(barChartDataMap.values());

        console.log('Line Chart Data:', snewLineChartData);
        console.log('Line Chart Data:', snewLineChartDatas);
        console.log('Bar Chart Data:', snewBarChartData);


        SsetLineChartData(snewLineChartData);
        SsetBarChartData(snewBarChartData);
        setLoading(false); // Set loading state to false after data fetching
      } catch (error) {
        console.error('Error fetching survey answers:', error);
        setError('Error fetching survey answers. Please try again later.');
        setLoading(false); // Set loading state to false in case of error
      }
    };
    


    const mapQuestionIdToLabel = (questionId) => {
      switch (questionId) {
        case "65e71493547f2b087c3c4a45":
          return "Q35";
        case "65e72d31547f2b087c3c4b66":
          return "Q36";
        case "65e72fd4547f2b087c3c4bac":
          return "Q37";
        case "65e7554042fc18a100b563d1":
          return "Q38";

        //Consumer
        case "65e81cba3f4a907b962d6471":
          return "c1";
        case "65e81f803f4a907b962d653b":
          return "c2";
        case "65e820ba3f4a907b962d653d":
          return "c3";
        case "65e820f63f4a907b962d653f":
          return "c4";
        case "65e821293f4a907b962d6541":
          return "c5";
        case "65e821943f4a907b962d6543":
          return "c6";
        case "65e8350c3f4a907b962d9b00":
          return "c7";
        case "65e835923f4a907b962d9b4c":
          return "c8"

        //seller
        case "65e8224f3f4a907b962d654e":
          return "s1";
        case "65e83b3f3f4a907b962d9d54":
          return "s2";
        case "65e83b5e3f4a907b962d9d56":
          return "s3";
        case "65e83b7c3f4a907b962d9d58":
          return "s4";
        case "65e83ba93f4a907b962d9d5a":
          return "s5";
        case "65e83be93f4a907b962d9d5c":
          return "s6";
        case "65e83c0f3f4a907b962d9d5e":
          return "s7";
        case "65e83c193f4a907b962d9d60":
          return "c8"

        //farmer
        case "65e8072511423a2fbbc2d291":
          return "f1";
        case "65e815d1eb51db20ab7132c0":
          return "f2";
        case "65e838f43f4a907b962d9c2b":
          return "f3";
        case "65e8392b3f4a907b962d9c2d":
          return "f4";
        case "65e839543f4a907b962d9c2f":
          return "f5";
        case "65e8398d3f4a907b962d9c31":
          return "f6";
        case "65e839af3f4a907b962d9c33":
          return "f7";
        case "65e839bb3f4a907b962d9c35":
          return "f8"


        default:
          return null;
      }
    };

    fetchSurveyAnswers();
    sellerfetchSurveyAnswers();
  }, []);


  if (loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="body1">{error}</Typography>;
  }

  console.log(SlineChartData)
  // Filter lineChartData to exclude Q6 to Q10
  const fLineChartData = SlineChartData || lineChartData.filter(data => !data.questionId.startsWith('Q1') && !data.questionId.startsWith('Q4'));
  const BLineChartData = 
  SlineChartData.filter && lineChartData.filter
  (data => !data.questionId.startsWith('s2') 
  && !data.questionId.startsWith('Q35')
  && !data.questionId.startsWith('Q36')
  && !data.questionId.startsWith('Q37')
  && !data.questionId.startsWith('Q38')
  && !data.questionId.startsWith('s3')
  && !data.questionId.startsWith('s4')
  && !data.questionId.startsWith('s5')
  && !data.questionId.startsWith('s6')
  && !data.questionId.startsWith('s7')
  && !data.questionId.startsWith('s8')

  && !data.questionId.startsWith('c2')
  && !data.questionId.startsWith('c3')
  && !data.questionId.startsWith('c4')
  && !data.questionId.startsWith('c5')
  && !data.questionId.startsWith('c6')
  && !data.questionId.startsWith('c7')
  && !data.questionId.startsWith('c8')

  && !data.questionId.startsWith('f2')
  && !data.questionId.startsWith('f3')
  && !data.questionId.startsWith('f4')
  && !data.questionId.startsWith('f5')
  && !data.questionId.startsWith('f6')
  && !data.questionId.startsWith('f7')
  && !data.questionId.startsWith('f8'));

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 0, p: 0 }}>
      <Box sx={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '120px', margin: '120px' }}>
        <Sidebar />
        <SurveyForm />
        <FSurveyForm />
        <SSurveyForm />
      </Box>


      <Box sx={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Analytics
        </Typography>

        {/* Line Chart */}
        <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', marginBottom: '20px' }}>
          <Box sx={{ borderRadius: '10px', padding: '20px', width: '100%' }} className="card product-cart-text prodcard-JSON">
            <Typography variant="h5" gutterBottom>
              Rate 1 to 3
            </Typography>
            <LineChart
              dataset={fLineChartData}
              xAxis={[{ scaleType: 'band', dataKey: 'questionId' }]}
              series={[
                { dataKey: 'Yes', label: 'Yes' },
                { dataKey: 'No', label: 'No' },
                { dataKey: 'Somehow Familiar', label: 'Somehow Familiar' }
              ]}
              {...chartSetting}
              ref={chartRef}
            />
          </Box>
        </div>

        {/* Bar Chart */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Box sx={{ borderRadius: '10px', padding: '20px', width: '100%' }} className="card product-cart-text prodcard-JSON">
            <Typography variant="h5" gutterBottom>
              Questions #1 in Consumer  
            </Typography>
            <BarChart
              dataset={barChartData.filter(data => data.questionId.startsWith('c1')) }
              xAxis={[{ scaleType: 'band', dataKey: 'questionId' }]}
              series={[
                { dataKey: 'Yes', label: 'Yes' },
                { dataKey: 'No', label: 'No' },
                { dataKey: 'Maybe', label: 'Maybe' }
              ]}
              {...chartSetting}
              ref={chartRef}
            />
          </Box>
        </div>
        {/* <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Box sx={{ borderRadius: '10px', padding: '20px', width: '100%' }} className="card product-cart-text prodcard-JSON">
            <Typography variant="h5" gutterBottom>
              Nakatulong ba to?
            </Typography>
            <BarChart
              dataset={SbarChartData.filter(data => data.questionId.startsWith('s1') || data.questionId.startsWith('c1'))}
              xAxis={[{ scaleType: 'band', dataKey: 'questionId' }]}
              series={[
                { dataKey: 'Yes', label: 'Yes' },
                { dataKey: 'No', label: 'No' },
                { dataKey: 'Maybe', label: 'Maybe' }
              ]}
              {...chartSetting}
              ref={chartRef}
            />
          </Box>
        </div> */}

        {/* Additional Line Chart */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Box sx={{ borderRadius: '10px', padding: '20px', width: '100%' }} className="card product-cart-text prodcard-JSON">
            <Typography variant="h5" gutterBottom>
              Question (Additional)
            </Typography>
            <LineChart
              dataset={BLineChartData}
              xAxis={[{ scaleType: 'band', dataKey: 'questionId' }]}
              series={[
                { dataKey: 'Yes', label: 'Yes' },
                { dataKey: 'No', label: 'No' },
                { dataKey: 'Maybe', label: 'Maybe' }
              ]}
              {...chartSetting}
              ref={chartRef}
            />
          </Box>
        </div>
      </Box>
    </Box>

  );
}

export default SurveyAnalysis;