import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import Post from "./post/Post";
import Loader from "./layout/Loader";
import Header from "./layout/Header";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/taroAction";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider, { Range, createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";

//

const TaroPosts = ({ match }) => {
    const dispatch = useDispatch();

    const createSliderWithToolTip = Slider.createSliderWithToolTip;
    const Range = createSliderWithTooltip(Slider.Range);
    const [price, setPrice] = useState([1, 1000]);
    const [category, setCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const {
        loading,
        posts,
        error,
        postsCount,
        resPerPage,
        filteredProductsCount,
    } = useSelector((state) => state.posts);

    let { keyword } = useParams();

    useEffect(() => {
        dispatch(getPosts(keyword, currentPage, price));
        if (error) {
            return alert.error(error);
        }
    }, [dispatch, alert, error, keyword, price, currentPage]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    let count = postsCount;

    if (keyword) {
        count = filteredProductsCount;
    }

    console.log(keyword);

    return (
        <Fragment>
            <Header /><br /><br /><br />
            <div className="container">
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <MetaData title={"Learn about Taro"} />
                        <h1 id="products_heading" style={{ textAlign: "center" }}><span> Learn about Taro </span></h1>
                        <section id="products" className="container mt-5">

                            <div className="row">
                                {posts && posts.length > 0 ? (
                                    <Fragment>
                                        <div className="col-6 col-md-9">
                                            <div className="row">
                                                {posts.map((post) => (
                                                    <Post key={post._id} post={post} col={3} />
                                                ))}
                                            </div>
                                        </div>
                                    </Fragment>
                                ) : (
                                    <div>No posts available</div>
                                )}
                            </div>
                        </section>
                        {resPerPage <= count && (
                            <div className="d-flex justify-content-center mt-5">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resPerPage}
                                    totalItemsCount={postsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText={"Next"}
                                    prevPageText={"Prev"}
                                    firstPageText={"First"}
                                    lastPageText={"Last"}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                            </div>
                        )}
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
};

export default TaroPosts;