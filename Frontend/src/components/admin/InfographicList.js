import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBDataTable } from 'mdbreact';
import Sidebar from './Sidebar';


const InfographicList = () => {
  const [questions, setQuestions] = useState([]);
  const [infographics, setInfographic] = useState([]);

  useEffect(() => {
    axios
      .get('/api/v1/admin/Infographic')
      .then((res) => {
        setInfographic(res.data.info);
        console.log(res.data.info)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
 
  const handleDelete = (infographicId) => {
    axios
      .delete(`/api/v1/delete/Infographic/${infographicId}`)
      .then(() => {
        setInfographic(infographics.filter((infographic) => infographic._id !== infographicId));
        toast.success('Infographic deleted successfully');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to delete Infographic');
      });
  };

  const setDataTable = () => {
    const data = {
      columns: [
        {
          label: 'ID',
          field: '_id',
          sort: 'asc',
        },
        {
          label: 'Infographic Text',
          field: 'infographicText',
          sort: 'asc',
        },
        
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    infographics?.forEach((infographic) => {
      data.rows.push({
        _id: infographic._id,
        infographicText: infographic.title,
        // options: infographic.options.join(', '), // Assuming options is an array
        actions: (
          <div>
            {/* <Link to={`/questions/update/${question._id}`} className="btn btn-warning mr-2">
              Edit
            </Link> */}
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(infographic._id)}
            >
              Delete
            </button>
          </div>
        ),
      });
    });

    return data;
  };

  return (
    <div className="container mt-5" style={{ background: 'white' }} >
      <Sidebar />
      <div className="row" >
        <div className="col-md-3" >
        
        </div>
        <div className="col-md-9" style={{ color: '#A97155' }}>
          <h2 className="title-crud">List of Questions in Infographic</h2>
          <Link to="/admin/AddInfo" className="btn btn-primary mb-3">
            Create Infographic
          </Link>
          <MDBDataTable
            data={setDataTable()}
            className="px-3"
            bordered
            striped
            hover
          />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default InfographicList;