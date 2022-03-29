"use strict";

const firebase = require("../db");
const Student = require("../models/student");
const firestore = firebase.firestore();

const addUser = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("users").doc().set(data);
    res.send("Record saved successfuly");
    console.log(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getUsers = async (req, res, next) => {
  try {
    const users = await firestore.collection("users");
    const data = await users.get();
    const studentsArray = [];

    if (data.empty) {
      res.status(404).send("No student record found");
    } else {
      data.forEach((doc) => {
        const newData = {
          id: doc.id,
          email: doc.data().email,
          name: doc.data().name,
        };
        studentsArray.push(newData);
      });
      res.send(studentsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await firestore.collection("users").doc(id);
    const data = await user.get();
    if (!data.exists) {
      res.status(404).send("Student with the given ID not found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const student = await firestore.collection("users").doc(id);
    await student.update(data);
    res.send("Student record updated successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection("users").doc(id).delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
