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
exports.BookService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("book service", req.body);
    const result = yield prisma_1.default.book.create({
        data: req.body,
    });
    console.log("book create=>", result);
    return result;
});
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("book service");
    const result = yield prisma_1.default.book.findMany();
    return result;
});
// get by id
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("book ser", id);
    const result = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
    });
    console.log("book service", result);
    return result;
});
//update doctor
const updateIntoDB = () => { };
// delete by id
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: {
            id,
        },
    });
    return result;
});
// //Soft Delete
const softDeleteFromDB = () => { };
exports.BookService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
    softDeleteFromDB,
};
