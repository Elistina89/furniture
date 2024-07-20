import { Router } from "express";
import { deviceController } from "../controllers/deviceController.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

export const deviceRouter = new Router()

deviceRouter.get('/', deviceController.getAll)          
deviceRouter.get('/:id', deviceController.getOne)       
deviceRouter.post('/',checkRoleMiddleware('ADMIN'), deviceController.create)        
deviceRouter.patch('/',checkRoleMiddleware('ADMIN'), deviceController.update)
deviceRouter.delete('/:id',checkRoleMiddleware('ADMIN'), deviceController.delete)

