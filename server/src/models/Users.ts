import { readFileSync } from "fs";
import { User } from "../types/User";

const userFile = readFileSync(`${process.cwd()}/userData.json`, "utf-8");
const usersData = JSON.parse(userFile);

export function getAllUsers(): User[] {
  return usersData;
}

export function getUserById(id: string): User | undefined {
  return usersData.find((user: User) => user.id === id);
}
