const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

// Handle incoming GET requests to /orders
router.get("/", checkAuth, OrdersController.orders_get_all);

//handling post request /orders
router.post("/", checkAuth, OrdersController.orders_create_order);

//get by id
router.get("/:orderId", checkAuth, OrdersController.orders_get_order);

//delete order
router.delete("/:orderId", checkAuth, OrdersController.orders_delete_order);


module.exports = router;