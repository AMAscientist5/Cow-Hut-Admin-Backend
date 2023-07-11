"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const authSpecificBuyerAndSeller_1 = __importDefault(require("../../middlewares/authSpecificBuyerAndSeller"));
const router = express_1.default.Router();
router.get('/:id', (0, authSpecificBuyerAndSeller_1.default)(user_1.ENUM_USER_ROLE.SELLER, user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.ADMIN), order_controller_1.orderController.getSingleOrder);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), order_controller_1.orderController.getAllOrders);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.BUYER), order_controller_1.orderController.createOrder);
exports.OrderRoutes = router;
