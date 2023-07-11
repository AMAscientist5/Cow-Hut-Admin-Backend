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
exports.ProfileService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const getUserProfile = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield user_model_1.User.findOne({ _id: payload });
    if (!userInfo) {
        throw new ApiError_1.default(http_status_1.default.EXPECTATION_FAILED, 'failed to get Users info');
    }
    const { name, phoneNumber, address } = userInfo;
    const profileData = {
        name,
        phoneNumber: phoneNumber,
        address: address,
    };
    return profileData;
});
const updateUserProfile = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.password !== undefined) {
        payload.password = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bcrypt_salt_rounds));
    }
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    const { name, phoneNumber, address } = result;
    const profileData = {
        name,
        phoneNumber: phoneNumber,
        address: address,
    };
    return profileData;
});
exports.ProfileService = {
    getUserProfile,
    updateUserProfile,
};
