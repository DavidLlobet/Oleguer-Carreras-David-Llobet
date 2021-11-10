const express = require("express");
const { getAllSeries, getViewedSeries, getPendingSeries, createSerie, modifySerie, deleteSerie, markViewedSerie } = require("../controllers/seriesController");

const router = express.Router();

router.get("/", getAllSeries);
router.get("/viewed", getViewedSeries);
router.get("/pending", getPendingSeries);
router.post("/", createSerie);
router.put("/:idSerie", modifySerie);
router.delete("/:idSerie", deleteSerie);
router.view("/view/:idSerie", markViewedSerie);

module.exports = router; 