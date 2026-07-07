import { Router } from "express";
import {
  register,
  login,
  getCurrentUser,
  updateCurrentUser,
  changeCurrentPassword,
  updateCurrentPreferences
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get(
  "/me",
  authenticate,
  getCurrentUser
);
router.put(

    "/me",

    authenticate,

    updateCurrentUser

);
router.put(

    "/change-password",

    authenticate,

    changeCurrentPassword

);

router.put(

    "/preferences",

    authenticate,

    updateCurrentPreferences

);


export default router;