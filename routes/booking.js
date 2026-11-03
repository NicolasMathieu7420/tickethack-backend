const express = require("express");
const router = express.Router();
const moment = require("moment");
const Cart = require("../models/carts");
const Booking = require("../models/bookings");

/* affichage des voyages bookés*/
router.get("/", (req, res) => {
  const date = new Date(req.body.date);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const heureMinute = `${hour}:${minutes}`;

  Booking.find({}).then((data) => {
    if (data) {
      res.json({ result: true, data });
    } else {
      res.json({ result: false, error: "No booking yet" });
    }
  });
});

/* Booking réccupéré dans cart */

router.post("/", (req, res) => {
  Cart.find().then((cartItems) => {
    //si panier vide on s'arrete
    if (cartItems.length === 0) {
      return res.json({ result: false, error: "No items in cart to book" });
    }
    Booking.insertMany(cartItems).then(() => {
      Cart.deleteMany().then(() => {
        res.json({ result: true, bookings: cartItems });
      });
    });
  });
});

module.exports = router;
