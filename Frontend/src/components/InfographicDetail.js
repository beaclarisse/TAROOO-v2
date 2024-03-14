import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Header from "./layout/Header";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';

const InfographicDetail = () => {
    const [infographic, setInfographic] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchInfographic = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/Infographic/${id}`);
                setInfographic(response.data);
            } catch (error) {
                console.error('Error fetching infographic:', error);
            }
        };

        fetchInfographic();
    }, [id]);

    const generatePdf = () => {
        if (!infographic) return;

        const element = document.getElementById('infographic-container');

        html2canvas(element, { useCORS: true })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();

                const imgWidth = 115; 
                const imgHeight = (canvas.height * imgWidth) / canvas.width; 
                const xPos = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
                const yPos = (pdf.internal.pageSize.getHeight() - imgHeight) / 2; 

                pdf.addImage(imgData, 'PNG', xPos, yPos, imgWidth, imgHeight);
                pdf.save('infographic.pdf');
            })
            .catch((error) => {
                console.error('Error generating PDF:', error);
            });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
            <Header/>
            {infographic && (
                <div>
                    <div id="infographic-container" style={{ textAlign: 'center' }}>
                        <img
                            src={infographic.images[0].url}
                            alt={infographic.title}
                            style={{ maxWidth: '100%', maxHeight: '100%', margin: 'auto' }}
                        />
                        <h2>{infographic.title}</h2>
                    </div>
                    <IconButton onClick={generatePdf} style={{ color: 'white' }}>
                    <PictureAsPdfIcon />
                    </IconButton>
                    <Link to="/Infographic">
                    <Button color="inherit" component={Link} to="/Infographic">
                      <ArrowBackIcon />
                    </Button>
                  </Link>

                </div>
                
            )}
        </div>
    );

};


export default InfographicDetail;
