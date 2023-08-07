const db = require("../models");
const Products = db.products;


exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const product = new Products({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        pic_name: req.body.pic_name,
        quantity: req.body.quantity,
        weight: req.body.weight,
        nutrition_fact: req.body.nutrition_fact
    });

    Products
        .create(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the product."
            });
        });
};


exports.findAll = (req, res) => {
    const name = req.query.name;
    const category = req.query.category;

    const condition = {};

    if (name) {
        condition.name = { $regex: new RegExp(name), $options: "i" };
    }

    if (category) {
        condition.category = category;
    }

    Products.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    Products.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Product with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Product with id=" + id });
        });
};


exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Products.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found!`
                });
            }
            else res.send({ message: "Product was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Products.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
                });
            }
            else {
                res.send({

                    message: "Product was deleted successfully!"

                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Product with id=" + id
            });
        });
};


exports.deleteAll = (req, res) => {
    Products.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Products were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all products."
            });
        });
};