var express = require('express');
var router = express.Router();

// GET /product
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('product');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

// GET /product/{id}
router.get('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('product');
    var productId = req.params.id;
    collection.findOne({ id: productId }, {}, function (e, docs) {
        res.json(docs);
    });
});

// POST /product
router.post('/', function (req, res) {
    var db = req.db;
    var collection = db.get('product');
    collection.findOne({ id: req.body.id }, {}, function (e, docs) {
        return !!docs;
    }).then(function(productExists) {
        if (productExists) {
            res.send(`product with id ${req.body.id} already exists`);
        } else{
            var product = {
                id: req.body.id,
                name: req.body.name,
                budget: req.body.budget
            };
            collection.insert(product, function (e, docs) {
                if (e) {
                    res.send(e);
                } else {
                    // res.redirect(`/product/${product.id}`);
                    res.send(`Successfully created product [${product.id}] ${product.name} ${product.budget}`);
                }
            });
        }
    });
});

// PUT /product
router.put('/', function (req, res) {
    var db = req.db;
    var collection = db.get('product');
    var product = {
        id: req.body.id,
        name: req.body.name,
        budget: req.body.budget
    };
    collection.update({ id: product.id }, product, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            // res.redirect(`/product/${product.id}`);
            res.send(`Successfully updated product with id [${product.id}]`);
        }
    });
});

// DELETE /product/{id}
router.delete('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('product');
    var productId = req.params.id;
    collection.remove({ id: productId }, {}, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Successfully deleted product with id ${productId}`);
        }
    });
});

module.exports = router;
