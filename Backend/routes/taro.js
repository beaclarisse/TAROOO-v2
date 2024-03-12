const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../middlewares/auth");

const {
    newPost,
    getPosts,
    getSinglePost,
    updatePost,
    deletePost,
    createPostReview,
    getPostReviews,
    deleteReview,
    allPosts,
    Taro
} = require("../controllers/taroController");

//Admin Access
router.post("/post/new", isAuthenticatedUser, authorizeRoles("admin"), upload.array("images", 10), newPost);
router.get("/post", getPosts);
router.get("/post/:id", getSinglePost);
router.put("/update/post/:id", isAuthenticatedUser, authorizeRoles("admin"), upload.array("images", 10), updatePost);
router.delete("/remove/post/:id", isAuthenticatedUser, authorizeRoles("admin"), deletePost);
router.get("/admin/posts", isAuthenticatedUser, authorizeRoles("admin"), allPosts);

//User Access 
router.put("/create/review", isAuthenticatedUser, createPostReview);
router.get("/reviews", isAuthenticatedUser, getPostReviews);
router.delete("/remove/review/:id", isAuthenticatedUser, deleteReview);

module.exports = router;