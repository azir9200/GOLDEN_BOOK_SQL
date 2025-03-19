import { Request } from "express";
import prisma from "../../../shared/prisma";
import { Book } from "@prisma/client";

const insertIntoDB = async (req: Request) => {
  console.log("book service", req.body);

  const result = await prisma.book.create({
    data: req.body,
  });
  console.log("book create=>", result);
  return result;
};

const getAllFromDB = async () => {
  console.log("book service");
  const result = await prisma.book.findMany();
  return result;
};

// get by id
const getByIdFromDB = async (id: string): Promise<Book | null> => {
  console.log("book ser", id);
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  console.log("book service", result);
  return result;
};

//update doctor
const updateIntoDB = () => {};

// delete by id
const deleteFromDB = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};

// //Soft Delete
const softDeleteFromDB = () => {};

export const BookService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
