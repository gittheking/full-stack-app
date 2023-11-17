import { NextFunction, Request, Response, Router } from "express";
import { getAllUsers, getUserById } from "../models/Users";

export const router = Router();

router.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    data: "pong",
  });
});

router.get("/api/user", (req: Request, res: Response) => {
  const users = getAllUsers();
  res.status(200).json({
    data: users,
  });
});

router.get("/api/user/:id", (req: Request, res: Response) => {
  const user = getUserById(req.params.id);
  if (user) {
    res.status(200).json({
      data: user,
    });
  } else {
    res.status(204).json({
      error: "user not found",
    });
  }
});

router.get("/api/test/:param", (req: Request, res: Response) => {
  const { param } = req.params;
  res.status(200).json({
    status: "success",
    data: { param },
  });
});

router.use("/*", (req: Request, res: Response, _next: NextFunction) => {
  res.status(400).send("Route not found");
});
