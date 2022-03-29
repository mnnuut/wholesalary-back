"use strict";

const firebase = require("../db");
const firestore = firebase.firestore();
// import { collection, query, where } from "firebase/firestore";

const addQuotationRequest = async (req, res, next) => {
  try {
    const data = req.body;
    const IDinfo = req.params.storeID;
    const id = IDinfo.trim();
    console.log(id);
    await firestore
      .collection("users")
      .doc(id)
      .collection("wholesaler-quotation-request")
      .doc()
      .set(data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const addOrderRequest = async (req, res, next) => {
  try {
    const data = req.body;
    const IDinfo = req.params.storeID;
    const id = IDinfo.trim();
    console.log(id);
    await firestore
      .collection("users")
      .doc(id)
      .collection("wholesaler-order-request")
      .doc()
      .set(data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const addProduct = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("products").doc().update(data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getQuotations = async (req, res, next) => {
  try {
    const id = req.params.id;
    const quotation = await firestore
      .collection("users")
      .doc(id)
      .collection("wholesaler-quotation-request");
    const data = await quotation.get();
    const productsArray = [];

    if (data.empty) {
      res.status(404).send("No student record found");
    } else {
      data.forEach((doc) => {
        const newData = {
          id: doc.id,
          customer: doc.data().customer,
          dateTime: doc.data().dateTime,
          orderID: doc.data().orderID,
          status: doc.data().status,
          total: doc.data().total,
          storeName: doc.data().storeName,
          storeID: doc.data().storeID,
          userName: doc.data().userName,
        };
        productsArray.push(newData);
      });
      res.send(productsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getOrders = async (req, res, next) => {
  try {
    const id = req.params.id;
    const quotation = await firestore
      .collection("users")
      .doc(id.trim())
      .collection("wholesaler-order-request");
    const data = await quotation.get();
    const productsArray = [];

    if (data.empty) {
      res.status(404).send("No student record found");
    } else {
      data.forEach((doc) => {
        const newData = {
          id: doc.id,
          orderID: doc.data().orderID,
          status: doc.data().status,
          customerName: doc.data().customerName,
          total: doc.data().total,
          storeID: doc.data().storeID,
          dateTimeInfo: doc.data().dateTimeInfo,
        };
        productsArray.push(newData);
      });
      res.send(productsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getQuotationInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const uid = req.params.uid;
    const product = await firestore
      .collection("users")
      .doc(uid)
      .collection("wholesaler-quotation-request")
      .doc(id);
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
const getOrderInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const uid = req.params.uid;
    const product = await firestore
      .collection("users")
      .doc(uid)
      .collection("wholesaler-order-request")
      .doc(id);
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

const getWholesalerQuotation = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await firestore
      .collection("users", where("order ID", "==", 1))
      .doc(id);
    const data = await user.get();
    if (!data.exists) {
      res.status(404).send("Student with the given ID not found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error.message);
  }
};
const updateQuotationStatus = async (req, res, next) => {
  try {
    const id = req.params.secondId;
    const uid = req.params.secondUid;
    const data = req.body;
    const product = await firestore
      .collection("users")
      .doc(uid.trim())
      .collection("wholesaler-quotation-request")
      .doc(id.trim());
    await product.update(data);
    res.send("Student record updated successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const updateOrderStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const uid = req.params.uid;
    const data = req.body;
    const product = await firestore
      .collection("users")
      .doc(uid.trim())
      .collection("wholesaler-order-request")
      .doc(id.trim());
    await product.update(data);
    res.send("Student record updated successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const deleteQuotation = async (req, res, next) => {
  try {
    const id = req.params.id;
    const uid = req.params.uid;
    await firestore
      .collection("users")
      .doc(uid.trim())
      .collection("wholesaler-quotation-request")
      .doc(id.trim())
      .delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const deleteOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const uid = req.params.uid;
    await firestore
      .collection("users")
      .doc(uid.trim())
      .collection("wholesaler-order-request")
      .doc(id.trim())
      .delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// const deleteQuotation = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const uid = req.params.id;
//     await firestore
//       .collection("users")
//       .doc(uid.trim())
//       .collection("wholesaler-quotation-request")
//       .doc(id.trim())
//       .delete();
//     res.send("Record deleted successfuly");
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

module.exports = {
  addQuotationRequest,
  getQuotations,
  getQuotationInfo,
  getWholesalerQuotation,
  addProduct,
  updateQuotationStatus,
  deleteQuotation,
  addOrderRequest,
  getOrders,
  getOrderInfo,
  updateOrderStatus,
  deleteOrder,
};
