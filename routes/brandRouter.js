import { Router } from "express";
import { brandController } from "../controllers/brandController.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

export const brandRouter = new Router()



brandRouter.get('/', brandController.getAll)
brandRouter.post('/',checkRoleMiddleware('ADMIN'), brandController.create)
brandRouter.patch('/',checkRoleMiddleware('ADMIN'), brandController.update)
brandRouter.delete('/:id',checkRoleMiddleware('ADMIN'), brandController.delete)
