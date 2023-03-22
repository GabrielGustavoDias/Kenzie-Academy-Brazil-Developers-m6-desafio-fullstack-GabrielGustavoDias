import { Router } from "express";
import {
  createClientController,
  listClientController,
  updateClientController,
  deleteClientController,
} from "../controllers/clients.controller";
import { ensureAuthMiddleware } from "../middlewares/login/ensureAuth.middleware";
import { verifyEmailAlreadyExists } from "../middlewares/verifyEmailAlreadyExists.middleware";
import { verifyOwnerMiddleware } from "../middlewares/verifyOwner.middleware";
import { verifySchemaMiddleware } from "../middlewares/verifySchema.middleware";
import { clientCreateSerializer } from "../serializers/client.serializer";

export const clientRoutes = Router();

clientRoutes.post(
  "",
  ensureAuthMiddleware,
  verifySchemaMiddleware(clientCreateSerializer),
  verifyEmailAlreadyExists,
  createClientController
);
clientRoutes.get("", ensureAuthMiddleware, listClientController);
clientRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  verifyOwnerMiddleware,
  updateClientController
);
clientRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  verifyOwnerMiddleware,
  deleteClientController
);
