import { Router } from "express";

import simulatorAdminController from "../controllers/simulator-admin.controller";

const router = Router();

router.post("/", simulatorAdminController.create);

router.get("/:id", simulatorAdminController.review);

router.put("/:id", simulatorAdminController.update);

router.post("/:id/publish", simulatorAdminController.publish);

router.post("/:id/archive", simulatorAdminController.archive);

router.delete("/:id", simulatorAdminController.delete);

export default router;