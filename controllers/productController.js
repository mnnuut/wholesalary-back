"use strict";

const firebase = require("../db");

const firestore = firebase.firestore();

const addProduct = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("products").doc().set(data);
    res.send("Record saved successfuly");
    console.log(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getProducts = async (req, res, next) => {
  try {
    const products = await firestore.collection("products");
    const data = await products.get();
    const productsArray = [];

    if (data.empty) {
      res.status(404).send("No student record found");
    } else {
      data.forEach((doc) => {
        const newData = {
          id: doc.id,
          CountInStock: doc.data().CountInStock,
          Description: doc.data().Description,
          Option: doc.data().Option,
          Price: doc.data().Price,
          Productname: doc.data().Productname,
          Rating: doc.data().Rating,
          Unit: doc.data().Unit,
          Image: doc.data().Image,
        };
        productsArray.push(newData);
      });
      res.send(productsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await firestore.collection("products").doc(id);
    const data = await product.get();
    if (!data.exists) {
      res.status(404).send("Student with the given ID not found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const product = await firestore.collection("products").doc(id);
    await product.update(data);
    res.send("Student record updated successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection("products").doc(id).delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
