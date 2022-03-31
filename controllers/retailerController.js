"use strict";

const firebase = require("../db");
const firestore = firebase.firestore();
const { query, orderBy, limit } = require("firebase/firestore");


// import { collection, query, where } from "firebase/firestore";

const addProductList = async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.body.creatorID;
    await firestore
      .collection("users")
      .doc(id)
      .collection("retailer-request-quotation")
      .doc()
      .set(data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const quotationLists = async (req, res, next) => {
  try {
    console.log(req.body)
    const data = req.body;
    const id = req.params.id;
    await firestore
      .collection("users")
      .doc(id)
      .collection("retailer-quotation-lists")
      .doc()
      .set(data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};



const getQuotationDetails = async (req, res, next) => {
  try {
    const id = req.params.id;
    const uid = req.params.uid;
    const QuotationDetails = await firestore
      .collection("users")
      .doc(uid.trim())
      .collection("retailer-quotation-lists")
      .doc(id.trim());
    const data = await QuotationDetails.get();
    if (!data.exists) {
      res.status(404).send("the given ID not found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getCartlists = async (req, res, next) => {
  try {
    const id = req.params.id;
    const quotation = await firestore
      .collection("users")
      .doc(id)
      .collection("retailer-request-quotation");
    const data = await quotation.get();
    const productsArray = [];

    if (data.empty) {
      res.status(404).send("No student record found");
    } else {
      data.forEach((doc) => {
        const newData = {
          id: doc.id,
          price: doc.data().price,
          productName: doc.data().productName,
          quantity: doc.data().quantity,
          storeName: doc.data().storeName,
          storeID: doc.data().storeID,
        };
        productsArray.push(newData);
      });
      res.send(productsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getRetailerTransectionInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const quotation = await firestore
      .collection("users")
      .doc(id.trim())
      .collection("retailer-quotation-lists");
    const data = await quotation.get();
    const productsArray = [];

    if (data.empty) {
      res.status(404).send("No student record found");
    } else {
      data.forEach((doc) => {
        const newData = {
          id: doc.id,
          orderID: doc.data().orderID,
          // storeName: doc.data().storeName,
          // storeID: doc.data().storeID,
          // countLists: doc.data().countLists,
          // creatorID: doc.data().creatorID,
          // dateTime: doc.data().dateTime,
          // total: doc.data().total,
        };
        productsArray.push(newData);
      });
      res.send(productsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getQuotationLists = async (req, res, next) => {
  try {
    const id = req.params.id;
    const quotation = await firestore
      .collection("users")
      .doc(id)
      .collection("retailer-quotation-lists")
      .orderBy("dateTime", "asc")
    const data = await quotation.get();
    const productsArray = [];
    if (data.empty) {
      res.status(404).send("No student record found");
    } else {
      data.forEach((doc) => {
        const newData = {
          id: doc.id,
          creatorID: doc.data().creatorID,
          dateTime: doc.data().dateTime,
          orderID: doc.data().orderID,
          status: doc.data().status,
          storeID: doc.data().storeID,
          total: doc.data().total,
          countLists: doc.data().countLists,
          storeName: doc.data().storeName,
          shippingInfo: doc.data().shippingInfo,
        };
        productsArray.push(newData);
      });
      res.send(productsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getQuotationListsConfirm = async (req, res, next) => {
  try {
    const id = req.params.id;
    const quotation = await firestore
      .collection("users")
      .doc(id)
      .collection("retailer-quotation-lists")
      .orderBy("dateTime", 'asc')
    const data = await quotation.get();
    console.log(data)
    const productsArray = [];
    if (data.empty) {
      res.status(404).send("No student record found");
    } else {
      // console.log(data.data())
      data.forEach((doc) => {
        // console.log(doc.data().dateTime)
        if (doc.data().status === "Confirm"){
        const newData = {
          id: doc.id,
          creatorID: doc.data().creatorID,
          dateTime: doc.data().dateTime,
          orderID: doc.data().orderID,
          status: doc.data().status,
          storeID: doc.data().storeID,
          total: doc.data().total,
          countLists: doc.data().countLists,
          storeName: doc.data().storeName,
          shippingInfo: doc.data().shippingInfo,
        };
        productsArray.push(newData);
      }
      });
      res.send(productsArray);
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
    const id = req.params.id;
    const uid = req.params.uid;
    const data = req.body;
    const product = await firestore
      .collection("users")
      .doc(uid.trim())
      .collection("retailer-quotation-lists")
      .doc(id.trim());
    await product.update(data);
    res.send("Student record updated successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const uid = req.params.uid;
    await firestore
      .collection("users")
      .doc(uid.trim())
      .collection("retailer-request-quotation")
      .doc(id.trim())
      .delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const deleteItemList = async (req, res, next) => {
  try {
    const id = req.params.id;
    const uid = req.params.uid;
    await firestore
      .collection("users")
      .doc(uid.trim())
      .collection("retailer-quotation-lists")
      .doc(id.trim())
      .delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getWholesalerQuotation,
  getQuotationLists,
  getQuotationListsConfirm,
  addProductList,
  updateQuotationStatus,
  getCartlists,
  quotationLists,
  getRetailerTransectionInfo,
  getQuotationDetails,
  deleteItem,
  deleteItemList,
};
