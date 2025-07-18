import express from "express"
import { getUserProfile, login, signup } from "../controllers/auth.js"
import { verifyToken } from "../utils/verifyToken.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/getUser", verifyToken, getUserProfile);

export default router