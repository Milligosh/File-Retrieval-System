import express from "express";
const router = express.Router();
import { AdminController } from "../controllers";
import authenticateToken, {
  verifyToken,
  isSuperAdmin,
  isAdmin,
} from "../../../middleware/authorization";

router.post(
  "/createAdmin",
  authenticateToken,
  isSuperAdmin,
  AdminController.createAdmin
);
router.post("/login", AdminController.logInAdmin);
router.post(
  "/create-user",
  authenticateToken,
  isAdmin,
  AdminController.createUser
);

router.patch(
  "/update-client/:id",
  authenticateToken,
  isAdmin,
  AdminController.updateUserDetails
);
router.patch(
  "/update-admin/:id",
  authenticateToken,
  isSuperAdmin,
  AdminController.updateAdminDetails
);

router.delete(
  "/delete-admin/:id",
  authenticateToken,
  isSuperAdmin,
  AdminController.deleteAdmin
);
router.delete(
  "/delete-client/:id",
  authenticateToken,
  isAdmin,
  AdminController.deleteClient
);
export default router;
