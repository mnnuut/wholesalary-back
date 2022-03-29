"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const studentRoutes = require("./routes/student-routes");
const userRoutes = require("./routes/user-routes");
const productRoutes = require("./routes/product-routes");
const wholesalerRoutes = require("./routes/wholesaler-routes");
const retailerRoutes = require("./routes/retailer-routes");
const testRoutes = require("./routes/test-routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", studentRoutes.routes);
app.use("/api", userRoutes.routes);
app.use("/api", productRoutes.routes);
app.use("/api", wholesalerRoutes.routes);
app.use("/api", testRoutes.routes);
app.use("/api", retailerRoutes.routes);

app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);
