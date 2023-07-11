"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
exports.orderSchema = new mongoose_1.Schema({
    cow: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'cow',
        required: true,
    },
    buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'buyer',
        required: true,
    },
}, {
    timestamps: true,
});
const Order = (0, mongoose_1.model)('Order', exports.orderSchema);
exports.default = Order;
