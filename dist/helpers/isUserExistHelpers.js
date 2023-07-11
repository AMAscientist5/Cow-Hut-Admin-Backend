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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserExistService = void 0;
const admin_model_1 = require("../app/modules/admin/admin.model");
// import { User } from '../app/modules/user/user.model';
// const isUserExist = async (payload: string) => {
//   // console.log(payload);
//   // const result = await User.findOne({ payload });
//   // if (result !== null) {
//   //   console.log(result, 'test');
//   //   return result;
//   // } else {
//   console.log('test2');
//   const result = await Admin.findOne({ payload });
//   console.log(result, 'test3');
//   return result;
//   // }
// };
const isUserExist = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findOne({ payload });
    console.log(result, 'test3');
    return result;
});
exports.UserExistService = {
    isUserExist,
};
