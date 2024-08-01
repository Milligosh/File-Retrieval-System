import express from "express";
import { UserController } from "../controllers";
const router = express.Router();
//import { validateSignUpApplicantInput } from "../../../middleware/validation";
import authenticateToken, {
  verifyToken,
  isAdmin,
} from "../../../middleware/authorization";
import upload from "../../../utils/multer";

router.post("/login", UserController.logInUser),
  router.post(
    "/create-request",
    // (req, res) => {
    //   res.send(req.files);
    // },
    authenticateToken,upload.any(),
    UserController.createNewRequest
  );
router.get(
  "/requests/:id",
  authenticateToken,
  upload.single("image"),
  UserController.fetchRequest
);

export default router;
