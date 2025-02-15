import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import httpStatus from "http-status";
import router from "./app/routes";

// import globalErrorHandler from "./app/middlewares/globalErrorHandler";
 import cookieParser from "cookie-parser";

const app: Application = express();
app.use(cors());
 app.use(cookieParser());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "golden book sql server..",
  });
});

// API routes
app.use("/api/v1", router);

// Handle 404 errors before the global error handler
// app.use((req: Request, res: Response) => {
//   res.status(httpStatus.NOT_FOUND).json({
//     success: false,
//     message: "API Not Found!",
//     error: {
//       path: req.originalUrl,
//       message: "Your requested path is not found!",
//     },
//   });
// });

// Global error handler
// app.use(globalErrorHandler);

export default app;
