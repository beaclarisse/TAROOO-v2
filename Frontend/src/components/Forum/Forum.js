import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SaveIcon from '@mui/icons-material/Save';
import CommentIcon from '@mui/icons-material/Comment';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ReactPaginate from 'react-paginate';
// import Sidebar from '../layout/SideBar';
import Header from '../layout/Header';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePosts = await axios.get('http://localhost:3000/api/v1/posts');
        setPosts(responsePosts.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const DisplayPost = ({ post }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
      const fetchUserData = async () => {
        try {

          if (post.user) {
            const responseUser = await axios.get(`http://localhost:3000/api/v1/user/${post.user}`);
            setUser(responseUser.data);
          } else {
            setUser({ name: "Anonymous" });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser({ name: "Anonymous" });
        }
      };

      fetchUserData();
    }, [post.user]);

    if (!user) {
      return null;
    }

    //   return (
    //     <div className="col-sm-12 col-md-4 my-3" key={post._id}>
    //       <div className="card mb-3 rounded" style={{ width: '18rem', height: '20rem' }}>
    //         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10rem' }}>
    //           <img className="card-img-top" src={post.images[0]?.url} alt="Post" style={{ maxWidth: '100%', maxHeight: '100%' }} />
    //         </div>
    //         <div className="card-body text-center">
    //           <h5 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{post.title}</h5>
    //           <h6 className="card-subtitle mb-2 text-muted" style={{ fontSize: '1rem', marginBottom: '1rem' }}>
    //             Posted by: {user && user.name ? user.name || user.handle : "Anonymous"}
    //           </h6>
    //           {post.avatar && <img src={post.avatar} alt={`${user.name || user.handle}'s avatar`} className="mb-2" style={{ maxWidth: '50px', borderRadius: '50%' }} />}
    //           <div className="icon-container d-flex align-items-center justify-content-around mt-2">
    //             <FavoriteIcon color="error" fontSize="small" />
    //             <SaveIcon color="primary" fontSize="small" />
    //             <CommentIcon color="action" fontSize="small" />
    //           </div>
    //           <Link to={`/post/${post._id}`} id="view_btn" className="btn btn-block mt-2" style={{ background: '#33FF6E', marginTop: 'auto' }}>
    //             View Details
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // };

    return (
      <div className="custom-col-md-6 my-3" key={post._id}>
        <div className="card mb-3 rounded" style={{ width: '100%', height: '20rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10rem' }}>
            <img className="card-img-top" src={post.images[0]?.url} alt="Post" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </div>
          <div className="card-body text-center">
            <h5 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{post.title}</h5>
            {/* <h6 className="card-subtitle mb-2 text-muted" style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              Posted by: {user && user.name ? user.name || user.handle : "Anonymous"}
            </h6> */}
            {post.avatar && <img src={post.avatar} alt={`${user.name || user.handle}'s avatar`} className="mb-2" style={{ maxWidth: '50px', borderRadius: '50%' }} />}
            <div className="icon-container d-flex align-items-center justify-content-around mt-2">
              <FavoriteIcon color="error" fontSize="small" />
              <SaveIcon color="primary" fontSize="small" />
              <CommentIcon color="action" fontSize="small" />
            </div>
            <Link to={`/post/${post._id}`} id="view_btn" className="btn btn-block mt-2" style={{ background: '#c8a2c8', marginTop: 'auto' }}>
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  };
  const displayPosts = posts
    .slice(pageNumber * postsPerPage, (pageNumber + 1) * postsPerPage)
    .map((post) => <DisplayPost key={post._id} post={post} />);

  return (
    <div className="d-flex flex-column vh-100 bg-white">
      <Header />
      <div className="flex-grow-1 p-4 rounded">
        <h2 align="center" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Post Forum
        </h2>
        <Link to="/AddPost" className="btn btn-primary mt-3" style={{ background: '#b57edc'}}>
          Share Something
        </Link>
        <div className="d-flex flex-column">
          {displayPosts}
          <div className="pagination-container d-flex justify-content-center mt-3">
            <ReactPaginate
              previousLabel={<NavigateBeforeIcon />}
              nextLabel={<NavigateNextIcon />}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={'pagination'}
              previousLinkClassName={'pagination__link btn btn-sm'}
              nextLinkClassName={'pagination__link btn btn-sm'}
              disabledClassName={'pagination__link--disabled'}
              activeClassName={'pagination__link--active'}
              pageClassName={'pagination__number'}
              breakClassName={'pagination__break'}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
// return (
//   <div className="d-flex align-items-start vh-100 bg-white">
//     <Header />
//     <div className="d-flex flex-column w-25">
//       {/* <Sidebar /> */}
//     </div>
//     <div className="w-75 p-4 rounded">
//       <h2 align="center" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
//         Post Forum
//       </h2>
//       <div className="d-flex flex-wrap justify-content-around">
//         {displayPosts}
//       </div>
//       <div className="pagination-container d-flex justify-content-center mt-3">
//         <ReactPaginate
//           previousLabel={<NavigateBeforeIcon />}
//           nextLabel={<NavigateNextIcon />}
//           pageCount={pageCount}
//           onPageChange={changePage}
//           containerClassName={'pagination'}
//           previousLinkClassName={'pagination__link btn btn-sm'}
//           nextLinkClassName={'pagination__link btn btn-sm'}
//           disabledClassName={'pagination__link--disabled'}
//           activeClassName={'pagination__link--active'}
//           pageClassName={'pagination__number'}
//           breakClassName={'pagination__break'}
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={5}
//         />
//       </div>
//       <Link to="/AddPost" className="btn btn-primary mt-3">
//         Add Post
//       </Link>
//     </div>
//   </div>
// );


export default Forum;
