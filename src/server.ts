import { Server } from "http";
 import app from "./app";
// import config from "./config";
import express, { Application, Request, Response, NextFunction } from "express";

const port = 3000;

// Start the server
async function main() {
  const server: Server = app.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
  });
}

main();
