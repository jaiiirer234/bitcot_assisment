import express from "express";
import { Request, Response } from "express";
import { login, logout, register } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", (req: Request, res: Response) => {
  register;
});
router.post("/login", (req: Request, res: Response) => {
  login;
});
router.post("/logout", (req: Request, res: Response) => {
  logout;
});
