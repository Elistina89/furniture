import { Router } from "express";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";
import { infoController } from "../controllers/infoController.js";


export const infoRouter = new Router()


infoRouter.post('/',checkRoleMiddleware('ADMIN'), infoController.create)
infoRouter.delete('/:id',checkRoleMiddleware('ADMIN'), infoController.delete)


