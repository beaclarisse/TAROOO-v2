const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../middlewares/auth");

const {
    newTaro,
    getTaro,
    getSingleTaro,
    updateTaro,
    deleteTaro,
    allTaros,
} = require("../controllers/taroController");

//Admin Access
router.post("/taro/new", isAuthenticatedUser, authorizeRoles("admin"), upload.array("images", 10), newTaro);
router.get("/taro", getTaro);
router.get("/taro/:id", getSingleTaro);
router.put("/update/taro/:id", isAuthenticatedUser, authorizeRoles("admin"), upload.array("images", 10), updateTaro);
router.delete("/remove/taro/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteTaro);
router.get("/admin/taros", isAuthenticatedUser, authorizeRoles("admin"), allTaros);

module.exports = router;