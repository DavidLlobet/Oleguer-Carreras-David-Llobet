const express = require("express");
const { getPlatforms, addPlatform, updatePlatform, deletePlatform } = require("../controllers/platformsController");

const router = express.Router()

router.get("/", getPlatforms);
router.post("/", addPlatform);
router.put("/:idPlatform", updatePlatform);
router.delete("/:idPlatform", deletePlatform);



module.exports = router; 