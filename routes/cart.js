const express = require("express");
const router = express.Router();
const moment = require("moment");
const Cart = require("../models/carts");

/* Pour ajouter le voyage selectionne dans le pannier*/

router.post("/", (req, res) => {
  const date = new Date(req.body.date);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const heureMinute = `${hour}:${minutes}`;

  console.log(req.body);
  const newItemCart = new Cart({
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: heureMinute,
    price: Number(req.body.price),
  });
  newItemCart.save().then((saveDoc) => {
    if (saveDoc) {
      console.log(saveDoc);
      res.json({ result: true, cart: saveDoc });
    } else {
      res.json({ result: false, error: "Failed to add trip to cart" });
    }
  });
});

/*check si voyage dans le panier*/

router.get("/", (req, res) => {
  const date = new Date(req.body.date);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const heureMinute = `${hour}:${minutes}`;
  Cart.find({}).then((data) => {
    if (data) {
      res.json({ result: true, trip: data });
    } else {
      res.json({ result: false, error: "No ticket in your card" });
    }
  });
});

/* pour supprimer un voyage dans le panier*/

router.delete("/:id", (req, res) => {
  Cart.deleteOne({ id: req.params.id }).then((deleteDoc) => {
    if (deleteDoc.deletedCount > 0) {
      // document successfully deleted
      Cart.find().then((data) => {
        res.json({
          result: true,
          cart: data,
          message: "Trip removed from cart",
        });
      });
    } else {
      res.json({ result: false, error: "Trip not found in cart" });
    }
  });
});

module.exports = router;
