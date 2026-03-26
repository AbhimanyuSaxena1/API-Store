import express from "express";
import {
  createAPI,
  getAllAPIs,
  getAPIById,
  updateAPI,
  deleteAPI,
} from "../controllers/api.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getAllAPIs);
router.get("/:id", getAPIById);

// PROTECTED ROUTES
router.post("/", protect, createAPI);
router.put("/:id", protect, updateAPI);
router.delete("/:id", protect, deleteAPI);

export default router;