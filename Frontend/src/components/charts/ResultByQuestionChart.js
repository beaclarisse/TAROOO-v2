import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';
import {
    Button,
    Box,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    OutlinedInput,
} from '@mui/material';

const chartTypes = [
    { value: "bar", label: "Bar" },
    { value: "pie", label: "Pie" },
    { value: "doughnut", label: "Doughnut" },
    { value: "polarArea", label: "PolarChart" },
    { value: "line", label: "lineChart" },
];

const ResultByQuestionChart = () => {
    const [farmerQuestions, setFarmerQuestions] = useState([]);
    const [selectedQuestionId, setSeletedQuestionId] = useState('');
    const [selectedChartType, setSelectedChartType] = useState('bar');
    const [data, setData] = useState({});
    const chartContainerRef = useRef();

    const handleDownload = () => {
        const pdf = new jsPDF();
        const chartElement = document.getElementById('allCharts');

        if (chartElement) {
            // Add the selected question text to the PDF
            const selectedQuestionText = farmerQuestions.find(q => q._id === selectedQuestionId)?.questionText;
            pdf.setFontSize(12);
            pdf.text(`Farmer Selected Question:`, 10, 15);

            // Split the question text into lines to fit within the PDF
            const questionLines = pdf.splitTextToSize(selectedQuestionText, 150 - 20);

            // Add each justified line to the PDF
            questionLines.forEach((line, index) => {
                pdf.text(line, 20, 25 + index * 10, { align: 'justify' });
            });

            // Render the chart to the PDF
            const imgData = chartElement.toDataURL('image/png');
            const imgWidth = 150; // Adjusted width of the image in mm
            const imgHeight = (chartElement.height * imgWidth) / chartElement.width;
            const marginLeft = 20; // Adjusted left margin in mm
            const marginTop = 40 + questionLines.length * 10; // Adjusted top margin in mm

            // Add the chart image to the PDF
            pdf.addImage(imgData, 'PNG', marginLeft, marginTop, imgWidth, imgHeight);

            // Save the PDF
            pdf.save('FarmersAnalytics.pdf');
        } else {
            console.error('Chart element with id "allCharts" not found');
        }
    };

    const handleDownloadAll = async () => {
        const pdf = new jsPDF();

        // Iterate through all questions and download their charts
        for (const question of farmerQuestions) {
            const questionId = question._id;
            await getResults(questionId);

            // Add the selected question text to the PDF
            const selectedQuestionText = question.questionText;
            pdf.setFontSize(12);

            // Split the question text into lines to fit within the PDF
            const questionLines = pdf.splitTextToSize(selectedQuestionText, 150 - 20);

            // Calculate the height required for the text
            const textHeight = questionLines.length * 10;

            // Add each justified line to the PDF at the top of the page
            questionLines.forEach((line, index) => {
                const yPos = 20 + index * 10;  // Adjusted top margin in mm
                pdf.text(line, 20, yPos, { align: 'justify' });
            });

            // Render the chart to the PDF
            const chartElement = document.getElementById('allCharts');
            if (chartElement) {
                // Destroy existing chart
                const existingChart = Chart.getChart(chartElement);
                if (existingChart) {
                    existingChart.destroy();
                }

                new Chart(chartElement.getContext('2d'), {
                    type: selectedChartType,
                    data: {
                        labels: Object.keys(data),
                        datasets: [
                            {
                                label: 'Results',
                                data: Object.values(data),
                                backgroundColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(75, 192, 192)',
                                    'rgb(255, 205, 86)',
                                    'rgb(201, 203, 207)',
                                    'rgb(54, 162, 235)',
                                ],
                                borderWidth: 3,
                                borderColor: 'black',
                                fill: false,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                        animation: {
                            duration: 0, // Set the animation duration to 0 milliseconds
                        },
                    },
                });
                setTimeout(() => {
                    const imgData = chartElement.toDataURL('image/png');
                    const imgWidth = 150; // Adjusted width of the image in mm
                    const imgHeight = (chartElement.height * imgWidth) / chartElement.width;
                    const marginLeft = 20; // Adjusted left margin in mm
                    const marginTop = 20 + textHeight; // Adjusted top margin in mm

                    // Add the chart image to the PDF
                    pdf.addImage(imgData, 'PNG', marginLeft, marginTop, imgWidth, imgHeight);

                    // Add a page break for the next question
                    pdf.addPage();
                }, 520)
                // Convert the chart to an image

            } else {
                console.error('Chart element with id "allCharts" not found');
            }
        }

        // Save the combined PDF
        pdf.save('allFarmersAnalytics.pdf');
    };



    const getAllQuestions = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/v1/fquestions`);
        setFarmerQuestions(data.questions);
    };

    const getResults = async (id) => {
        if (id === '') {
            return alert('Huh?');
        }
        setSeletedQuestionId(id);
        const { data } = await axios.get(`http://localhost:5000/api/v1/get-results-by-question/${id}`);
        setData(data.answers);
    };

    useEffect(() => {
        getAllQuestions();
    }, []);

    useEffect(() => {
        const ctx = document.getElementById('allCharts').getContext('2d');

        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
            existingChart.destroy();
        }

        new Chart(ctx, {
            type: selectedChartType,
            data: {
                labels: Object.keys(data),
                datasets: [
                    {
                        label: 'Results',
                        data: Object.values(data),
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(75, 192, 192)',
                            'rgb(255, 205, 86)',
                            'rgb(201, 203, 207)',
                            'rgb(54, 162, 235)',
                        ],
                        borderWidth: 3,
                        borderColor: 'black',
                        fill: false,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }, [data, selectedChartType]);

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <div className="submit-button-container" style={{ padding: '10px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDownload}
                        style={{ marginBottom: '10px' }}
                    >
                        Download PDF
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDownloadAll}
                    >
                        Download All PDF
                    </Button>
                </div>


                <FormControl sx={{ m: 1, width: '100%' }}>
                    <InputLabel id="selectedQuestionId">Select Question</InputLabel>
                    <Select
                        onChange={(e) => getResults(e.target.value)}
                        fullWidth
                        required
                        id="selectedQuestionId"
                        labelId="selectedQuestionId"
                        name="selectedQuestionId"
                        input={<OutlinedInput label="Select Question" />}
                        value={selectedQuestionId}
                    >
                        <MenuItem selected={true} value="">
                            Select Question
                        </MenuItem>
                        {farmerQuestions.map((question, i) => (
                            <MenuItem key={i} value={question._id}>
                                {question.questionText}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: 600 }}>
                    <InputLabel id="selectedChartType">Chart Type</InputLabel>
                    <Select
                        fullWidth
                        required
                        id='selectedChartType'
                        labelId="selectedChartType"
                        name='selectedChartType'
                        input={<OutlinedInput label="Chart Type" />}
                        value={selectedChartType}
                        onChange={e => {
                            if (e.target.value === '') {
                                return alert('huh')
                            }
                            setSelectedChartType(e.target.value)
                        }}
                    >
                        <MenuItem selected={true} value=''>
                            Select Chart Type
                        </MenuItem>
                        {chartTypes.map((type, i) => (
                            <MenuItem sx={{ textTransform: 'capitalize' }} key={i} value={type.value}>
                                {type.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '600px' }}>
                    <canvas id="allCharts" />
                </Box>
            </Box>
        </div>
    );
};

export default ResultByQuestionChart;