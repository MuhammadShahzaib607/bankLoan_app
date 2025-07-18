import express from "express";
import { applyLoan, getAllLoans, getAllLoans_admin, getLoanStatus, getUserLoans, updateLoanStatus } from "../controllers/loan.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/apply", verifyToken, applyLoan);
router.get("/my-loans", verifyToken, getUserLoans);
router.get("/all", verifyToken, getAllLoans);
router.put("/update-status", verifyToken, updateLoanStatus);
router.get("/all_admin", verifyToken, getAllLoans_admin);
router.get("/loan-stats", verifyToken, getLoanStatus);

export default router;
