const express = require("express");
const {
  getWholesalerQuotation,
  addOrderList,
  getRetailerTransectionInfo,
  getQuotationLists,
  addProductList,
  updateQuotationStatus,
  updateOrderStatus,
  quotationLists,
  getQuotationDetails,
  getCartlists,
  getQuotationListsConfirm,
  deleteItem,
  deleteItemList,
} = require("../controllers/retailerController");

const router = express.Router();

router.post("/retailer-addproducts", addProductList);
router.post("/retailer-quotation-list/:id", quotationLists); //in use
router.post("/retailer-addOrder:id", addOrderList); //in use

router.get("/retailer-get-quotation-lists/:id", getQuotationLists); //in use
router.get("/retailer-get-quotation-lists-confirm/:id", getQuotationListsConfirm); //in use
router.get("/retailer-cart/:id", getCartlists); //in use
router.get("/quotations-details/:uid/:id", getQuotationDetails); //in use
router.get("/get-retailer-transectoin-info/:id", getRetailerTransectionInfo); //in use
router.get("/wholesaler", getWholesalerQuotation);

router.put("/retailer-update-status/:uid/:id", updateQuotationStatus); //in use
router.put("/retailer-update-order-status/:uid/:id", updateOrderStatus); //in use

router.delete("/delete-quotation-request/:uid/:id", deleteItem); //in use
router.delete("/delete-quotation-request-list/:uid/:id", deleteItemList); //in use

module.exports = {
  routes: router,
};
