const express = require("express");
const router = express.Router();
const Trip = require("../models/trips");
const moment = require('moment');

/* GET rechercher les voyages selon le départ - arrivee -date */

router.get("/", async (req, res) => {
    const dateStr = req.query.date;
    const startOfDay = moment(dateStr).startOf('day').toDate();
    const endOfDay = moment(dateStr).endOf('day').toDate();

  /*check if trip exist*/
  let tripExisting = await Trip.find({
    departure: new RegExp(req.query.departure, "i"),
    arrival: new RegExp(req.query.arrival, "i"),
    date: {$gte: startOfDay, $lt: endOfDay}});

  if (tripExisting.length > 0) {
    res.json({ result: true, tripExisting });
  } else {
    res.json({ result: false, error: "No trip found" });
  }
});

module.exports = router;