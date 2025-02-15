import express, { NextFunction, Request, Response } from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.get("/", AdminController.getAllFromDB);

router.get("/:id", AdminController.getByIdFromDB);

router.patch(
  "/:id",
  // validateRequest(adminValidationSchemas.update),
  AdminController.updateIntoDB
);

router.delete(
  "/:id",
  // auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.deleteFromDB
);

export const AdminRoutes = router;
