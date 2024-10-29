import { Router } from "express";
import { getUsers, register, login } from "../controllers/authController";

const router = Router();

router.get("/users", getUsers);
router.post("/register", register);
router.post("/login", login);

export default router;
