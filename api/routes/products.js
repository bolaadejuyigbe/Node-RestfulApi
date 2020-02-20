const express = require('express');
const router = express.Router();
const moongoose = require('mongoose')
const Product = require("../models/product");


//get request
router.get('/', (req, res, next) => {
    Product.find()
    .exec()
    .then(docs => {
      console.log(docs);
     
      res.status(200).json(docs);
     
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


//get by id
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
  Product.findById(id)
  .exec()
  .then( doc => {
    console.log("From database", doc);
    if (doc) {
      res.status(200).json(doc);
    } else {
      res
        .status(404)
        .json({ message: "No valid entry found for provided ID" });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
});



//post request
router.post('/', (req, res, next) => {
   
    const product = new Product({
        _id: new moongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Handling POST requests to /products",
            createdProduct: result
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    });
    

// update reequest 
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

//delete request 
router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

module.exports =router;