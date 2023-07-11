"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const order_model_1 = __importDefault(require("./order.model"));
const cow_model_1 = __importDefault(require("../cow/cow.model"));
const user_model_1 = require("../user/user.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { cow, buyer } = orderData;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const cowData = yield cow_model_1.default.findById(cow);
        const sellerId = (_a = cowData === null || cowData === void 0 ? void 0 : cowData.seller) === null || _a === void 0 ? void 0 : _a.toString();
        const sellerData = yield user_model_1.User.findById(sellerId);
        const buyerData = yield user_model_1.User.findById(buyer);
        if (sellerData && buyerData) {
            if (cowData &&
                cowData.price !== undefined &&
                buyerData.budget >= (cowData === null || cowData === void 0 ? void 0 : cowData.price)) {
                sellerData.income = cowData === null || cowData === void 0 ? void 0 : cowData.price;
                buyerData.budget = (buyerData === null || buyerData === void 0 ? void 0 : buyerData.budget) - (cowData === null || cowData === void 0 ? void 0 : cowData.price);
                if (cowData.label === 'sold out') {
                    throw new ApiError_1.default(http_status_1.default.EXPECTATION_FAILED, 'Cow is sold out');
                }
                else {
                    cowData.label = 'sold out';
                }
            }
            else {
                throw new ApiError_1.default(http_status_1.default.EXPECTATION_FAILED, 'Budget is not enough');
            }
        }
        else {
            throw new ApiError_1.default(http_status_1.default.EXPECTATION_FAILED, 'Data is not found');
        }
        yield (sellerData === null || sellerData === void 0 ? void 0 : sellerData.save());
        yield (buyerData === null || buyerData === void 0 ? void 0 : buyerData.save());
        yield (cowData === null || cowData === void 0 ? void 0 : cowData.save());
        // const createdOrder = await Order.create(orderData);
        const createdOrder = yield order_model_1.default.create([orderData], { session });
        if (!createdOrder) {
            throw new ApiError_1.default(http_status_1.default.EXPECTATION_FAILED, 'failed to create Order');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return createdOrder[0];
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const allOrders = order_model_1.default.find();
    if (!allOrders) {
        throw new ApiError_1.default(http_status_1.default.EXPECTATION_FAILED, 'failed to get all Users');
    }
    return allOrders;
});
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.findOne({ _id: id });
    // const cowId = result?.cow;
    // const buyerId = result?.buyer;
    // const cow = await Cow.findById({ _id: cowId });
    // const buyer = await User.findById({ _id: buyerId });
    // const resultObject = {
    //   cow,
    //   buyer,
    // };
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getSingleOrder,
};
