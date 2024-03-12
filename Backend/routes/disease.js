const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../middlewares/auth");

const {
    newDisease,
    getDisease,
    getSingleDisease,
    updateDisease,
    deleteDisease,
    allDiseases
} = require("../controllers/diseaseController");

//Admin Access
router.post("/disease/new", isAuthenticatedUser, authorizeRoles("admin"), upload.array("images", 10), newDisease);
router.get("/disease", getDisease);
router.get("/disease/:id", getSingleDisease);
router.put("/update/disease/:id", isAuthenticatedUser, authorizeRoles("admin"), upload.array("images", 10), updateDisease);
router.delete("/remove/disease/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteDisease);
router.get("/admin/diseases", isAuthenticatedUser, authorizeRoles("admin"), allDiseases);

module.exports = router;