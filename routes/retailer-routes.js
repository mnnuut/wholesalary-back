const express = require("express");
const {
  getWholesalerQuotation,
  getRetailerTransectionInfo,
  getQuotationLists,
  addProductList,
  updateQuotationStatus,
  quotationLists,
  getQuotationDetails,
  updateCartAmount,
  getCartlists,
  getQuotationListsConfirm,
  deleteItem,
  deleteItemList,
} = require("../controllers/retailerController");

const router = express.Router();

router.post("/retailer-addproducts", addProductList);
router.post("/retailer-quotation-list/:id", quotationLists); //in use
router.get("/retailer-get-quotation-lists/:id", getQuotationLists); //in use
router.get("/retailer-get-quotation-lists-confirm/:id", getQuotationListsConfirm); //in use
router.get("/retailer-cart/:id", getCartlists); //in use
router.get("/quotations-details/:uid/:id", getQuotationDetails); //in use
router.get("/get-retailer-transectoin-info/:id", getRetailerTransectionInfo); //in use
router.get("/wholesaler", getWholesalerQuotation);

router.put("/retailer-update-cart/:uid/:id", updateCartAmount); //in use
router.put("/retailer-update-status/:uid/:id", updateQuotationStatus); //in use

router.delete("/delete-quotation-request/:uid/:id", deleteItem); //in use
router.delete("/delete-quotation-request-list/:uid/:id", deleteItemList); //in use

module.exports = {
  routes: router,
};
