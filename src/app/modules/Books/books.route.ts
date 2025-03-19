import express from "express";
import { UserRole } from "@prisma/client";
import { BooksController } from "./books.controller";

const router = express.Router();

router.post("/", BooksController.insertIntoDB);
router.get("/", BooksController.getAllFromDB);

router.get("/:id", BooksController.getByIdFromDB);

router.patch("/:id", BooksController.updateIntoDB);

router.delete("/:id", BooksController.deleteFromDB);

router.delete("/soft/:id", BooksController.softDelete);

export const BooksRoutes = router;
