"use strict";

const { response } = require("express");
const User = require("../models/user");

const firebase = require("../db");

const firestore = firebase.firestore();

const addTest = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("products").doc().set(data);
    res.send("Record saved successfuly");
    console.log(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getTests = async (req, res, next) => {
  try {
    const products = await firestore
      .collection("users")
      .doc("GFJTmbEl9NUKGykqeWfn")
      .collection("wholesaler-quotation-request")
      .doc("WYMLY5SgSpdM2dZntPE8");

    const data = await products.get();
    // console.log(data);
    const productsArray = [];

    if (data.empty) {
      res.status(404).send("No student record found");
    } else {
      data.forEach((doc) => {
        const newData = new User(
          doc.id,
          doc.data().customer,
          doc.data().customerID,
          doc.data().status
        );
        productsArray.push(newData);
        // console.log(productsArray);
      });
      res.send(productsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getTests2 = async (req, res, next) => {
  try {
    const products = await firestore
      .collection("users")
      .doc("wholesaler-quotation-request");

    const data = await products.get();
    console.log(data);
    response.send(data);
    // const productsArray = [];

    // if (data.empty) {
    //   res.status(404).send("No student record found");
    // } else {
    //   data.forEach((doc) => {
    //     const newData = {
    //       id: doc.id,
    //       customer: doc.data().customer,
    //       customerID: doc.data().customerID,
    //       status: doc.data().status,
    //     };
    //     productsArray.push(newData);
    //     console.log(productsArray);
    //   });
    //   res.send(productsArray);
    // }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getTest = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await firestore
      .collection("users")
      .doc("wholesaler-quotation-request")
      .doc(id);
    //   .doc("WYMLY5SgSpdM2dZntPE8");
    const data = await product.get();
    if (!data.exists) {
      res.status(404).send("the item not found with the given ID not found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const updateTest = async (req, res, next) => {
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
const deleteTest = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection("products").doc(id).delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getTests,
  getTest,
  addTest,
  updateTest,
  deleteTest,
  getTests2,
};
