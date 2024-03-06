import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import Post from "../post/Post";
import Loader from "../layout/Loader";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../actions/taroAction";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider, { Range, createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import { Grid } from "@mui/material";

const Taro = ({ match }) => {
    const dispatch = useDispatch();

    const {
        loading,
        taroPosts,
        filteredPostsCount,
    } = useSelector((state) => state.taroPosts);

    useEffect(() => {
        dispatch(getPost());
    }, [dispatch]);

    const [dataSource, setDataSource] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loadedItems, setLoadedItems] = useState(0);

    useEffect(() => {
        setDataSource(products.slice(0, loadedItems + 3));
        setLoadedItems(loadedItems + 3);
    }, [taroPosts, loadedItems]);

    const fetchMoreData = () => {
        if (dataSource.length < taroPosts.length) {
            setTimeout(() => {
                const newData = products.slice(0, dataSource.length + 3);
                setDataSource(newData);
            }, 500);
        } else {
            setHasMore(dataSource.length < taroPosts.length);
        }
    };

    return (
        <Fragment>
            <div className="container">
                <MetaData title={"Learn About Taro"} />
                <div className="row"></div>
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <h1 id="products_heading" style={{ textAlign: "center" }}>
                            <span> Learn about Taro </span>
                        </h1>
                        <InfiniteScroll
                            dataLength={loadedItems}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={<p>Loading...</p>}
                            endMessage={
                                <p style={{ textAlign: "center" }}>
                                    <b>Yay! You have seen it all, I hope you learned something!</b>
                                </p>
                            }
                        >
                            <Grid>
                                {dataSource.map((post) => (
                                    <Post key={post._id} post={post} col={4} />
                                ))}
                            </Grid>
                        </InfiniteScroll>
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
};

export default Taro;