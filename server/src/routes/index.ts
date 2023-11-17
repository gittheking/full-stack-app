import { NextFunction, Request, Response, Router } from "express";
import { readFileSync } from "fs";
export const router = Router();

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
};

function getUsersData(): User[] {
  const userFile = readFileSync(`${process.cwd()}/userData.json`, "utf-8");
  const userData = JSON.parse(userFile);
  return userData;
}

router.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    data: "pong",
  });
});

router.get("/api/user", (req: Request, res: Response) => {
  const userData = getUsersData();
  res.status(200).json({
    data: userData,
  });
});

router.get("/api/user/:id", (req: Request, res: Response) => {
  const usersData = getUsersData();
  const user: undefined | User = usersData.find(
    (user: User) => user.id === req.params.id
  );

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
