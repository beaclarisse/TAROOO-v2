const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../middlewares/auth");

const {
    newPreventive,
    getPreventives,
    getSinglePreventive,
    updatePreventive,
    deletePreventive,
    allPreventives
} = require("../controllers/preventiveController");

//Admin Access
router.post("/preventive/new", isAuthenticatedUser, authorizeRoles("admin"), upload.array("images", 10), newPreventive);
router.get("/preventive", getPreventives);
router.get("/preventive/:id", getSinglePreventive);
router.put("/update/preventive/:id", isAuthenticatedUser, authorizeRoles("admin"), upload.array("images", 10), updatePreventive);
router.delete("/remove/preventive/:id", isAuthenticatedUser, authorizeRoles("admin"), deletePreventive);
router.get("/admin/preventives", isAuthenticatedUser, authorizeRoles("admin"), allPreventives);

module.exports = router;