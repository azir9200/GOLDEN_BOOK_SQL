import { NextFunction, Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AdminService } from "./admin.service";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import { Admin, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { Transaction } from "mongodb";

const getAllFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await AdminService.getAllFromDB(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data fetched!",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AdminService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data fetched by id!",
    data: result,
  });
});

//update controller
const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AdminService.updateIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data updated!",
    data: result,
  });
});

//delete controller
const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AdminService.deleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data deleted!",
    data: result,
  });
});

// //Soft Delete
const softDeleteFromDB = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.admin.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      
      },
    });

    await transactionClient.user.update({
      where: {
        email: adminDeletedData.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return adminDeletedData;
  });

  return result;
};
export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB
};
