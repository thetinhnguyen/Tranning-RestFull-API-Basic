const mongoose = require("mongoose");
const Product = require("../models/product.model");

const multer = require("multer");

module.exports.get_all_product = (req, res) => {
  Product.find()
    .select("name price _id productImage")
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// set up multer

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(new Error(" "), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
}).single("productImage");

module.exports.create_product = (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.status(500).json({
        err,
        message: "Image file don't add"
      });
    } else {
      const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
      });
      product
        .save()
        .then(result => {
          res.status(201).json({
            message: "This is Post products",
            createProduct: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    }
  });
};
module.exports.get_one_product=(req, res) => {
    const id = req.params.productId;
    Product.findById(id)
      .select("name price _id")
      .then(doc => {
        if (doc) {
          res.status(200).json({
            message: "This is ProducctId",
            search: doc
          });
        } else {
          res.status(404).json({
            error: "Not found"
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          error
        });
      });
  }

  module.exports.remove_product=(req, res) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
      .then(result => {
        if(result.n>0){
          res.status(200).json({
            message: "This DELETE Product",
            result
          });
  
        }
        else{
          res.status(404).json({
            message: "Not found id "
          });
        }
       
      })
      .catch(err => {
        res.status(500).json({
          err
        });
      });
  }

  module.exports.update_product= (req, res) => {
    const id = req.params.productId;
    const updatOps = {};
    for (const ops of req.body) {
      updatOps[ops.propName] = ops.value;
    }
    Product.update(
      { _id: id },
      {
        $set: updatOps
      }
    )
      .then(result => {
        res.status(200).json({
          result
        });
      })
      .catch(error =>
        res.status(500).json({
          error
        })
      );
  }
