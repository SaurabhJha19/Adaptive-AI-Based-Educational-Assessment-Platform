import { Router } from "express";

import { upload } from "../../../middleware/upload.middleware";

import simulatorAdminController from "../controllers/simulator-admin.controller";

import { authenticate } from "../../../middleware/auth.middleware";
import { authorizeAdmin } from "../../../middleware/admin.middleware";

const router = Router();

/*
|--------------------------------------------------------------------------
| Protect ALL admin routes
|--------------------------------------------------------------------------
*/

router.use(authenticate);
router.use(authorizeAdmin);

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

router.get("/", simulatorAdminController.list);

router.get("/:id", simulatorAdminController.review);

router.post(
  "/",
  upload.fields([
    {
        name: "questionPdf",
        maxCount: 1,
    },
    {
        name: "answerPdf",
        maxCount: 1,
    },
]),
  simulatorAdminController.create
);

router.put("/:id", simulatorAdminController.update);

router.post(
    "/:id/parse",
    simulatorAdminController.parse
);

router.post("/:id/publish", simulatorAdminController.publish);

router.post("/:id/archive", simulatorAdminController.archive);

router.delete("/:id", simulatorAdminController.delete);

export default router;