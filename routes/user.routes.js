import express from "express";
import { Router } from "express";
import { createUser, findAllUser, loginUser, updateUser, deleteUser} from "../controllers/user.controller.js"

const router = Router()


router.post("/signup", createUser)
router.post("/login", loginUser)
router.post("/updateUser/:id", updateUser)
router.post("/deleteUser/:id", deleteUser)

router.get("/", findAllUser)

export default router;
