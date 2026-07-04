import { Router } from "express";
import { upload } from "../../../middleware/upload.middleware";

import simulatorAdminController from "../controllers/simulator-admin.controller";
import { authenticate } from "../../../middleware/auth.middleware";

const router = Router();

router.get("/", simulatorAdminController.list);

router.get("/:id", simulatorAdminController.review);

router.put("/:id", simulatorAdminController.update);

router.post("/:id/publish", simulatorAdminController.publish);

router.post("/:id/archive", simulatorAdminController.archive);

router.delete("/:id", simulatorAdminController.delete);

router.post(
    "/",
    authenticate,
    upload.single("file"),
    simulatorAdminController.create
);

export default router;