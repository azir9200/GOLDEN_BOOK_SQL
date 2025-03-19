import express from "express";
import { userRoutes } from "../modules/Users/user.routes";
import { AdminRoutes } from "../modules/Admin/admin.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { BooksRoutes } from "../modules/Books/books.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/book",
    route: BooksRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
