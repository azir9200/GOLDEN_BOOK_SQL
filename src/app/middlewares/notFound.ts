import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFound = (req: Request, res: Response, next: NextFunction) => {

  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Hey Developer, REQUESTED ROUTE API NOT FOUND !",
  });
};

export default notFound;
