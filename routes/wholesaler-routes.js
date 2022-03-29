const express = require("express");
const {
  getQuotations,
  getQuotationInfo,
  getWholesalerQuotation,
  addQuotationRequest,
  updateQuotationStatus,
  deleteQuotation,
  addOrderRequest,
  getOrders,
  getOrderInfo,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/wholesalerController");

const router = express.Router();

router.post("/wholesaler-quotation-request/:storeID", addQuotationRequest); //in use
router.post("/wholesaler-order-request/:storeID", addOrderRequest); //in use
router.get("/quotations/:uid/:id", getQuotationInfo); //in use
router.get("/order/:uid/:id", getOrderInfo); //in use
router.get("/quotations/:id", getQuotations); //in use
router.get("/orders/:id", getOrders); //in use
router.get("/wholesaler", getWholesalerQuotation);
router.put(
  "/wholesaler-update-status/:secondUid/:secondId",
  updateQuotationStatus
); //in use
router.put("/wholesaler-orderupdate-status/:uid/:id", updateOrderStatus); //in use
router.delete("/delete-quotation-wholesaler/:uid/:id", deleteQuotation); //in use
router.delete("/delete-order-wholesaler/:uid/:id", deleteOrder); //in use

module.exports = {
  routes: router,
};
