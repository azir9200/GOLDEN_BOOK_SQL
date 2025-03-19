"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./books.controller");
const router = express_1.default.Router();
router.post("/", books_controller_1.BooksController.insertIntoDB);
router.get("/", books_controller_1.BooksController.getAllFromDB);
router.get("/:id", books_controller_1.BooksController.getByIdFromDB);
router.patch("/:id", books_controller_1.BooksController.updateIntoDB);
router.delete("/:id", books_controller_1.BooksController.deleteFromDB);
router.delete("/soft/:id", books_controller_1.BooksController.softDelete);
exports.BooksRoutes = router;
