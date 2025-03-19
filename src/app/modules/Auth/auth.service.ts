import { UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import { JwtPayload, Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import config from "../../../config";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }
  // Generate access token
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );
  // Generate refresh token
  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as string,
    config.jwt.expires_in as string
  );

  console.log("password", refreshToken);
  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

//refresh token api
const refreshToken = async (token: string) => {
  console.log("token", token);
  let decodedData: JwtPayload;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as string
    );
  } catch (err) {
    throw new Error("Hey user, You are not authorized!");
  }
  if (!decodedData?.email) {
    throw new Error("Invalid token data!");
  }
  console.log("decoded", decodedData);
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });
  console.log("user Data", userData);
  if (!userData) {
    throw new Error("User not found!");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      email: decodedData.email,
      role: decodedData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );
  console.log("token decoded", accessToken);
  console.log("user data", userData);

  return {
    accessToken,
    needPasswordChange: decodedData.needPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
