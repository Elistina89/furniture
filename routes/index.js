import { Router } from "express";
import { brandRouter } from "./brandRouter.js";
import { userRouter } from "./userRouter.js";
import { typesRouter } from "./typesRouter.js";
import { deviceRouter } from "./deviceRouter.js";
//import { basketRouter } from "./basketRouter.js";
//import { basketDeviceRouter } from "./basketDeviceRouter.js";
import { infoRouter } from "./infoRouter.js";



export const router = new Router()

router.use('/user',userRouter)
router.use('/device',deviceRouter)
router.use('/brand',brandRouter)
router.use('/types',typesRouter)
router.use('/info', infoRouter)
//router.use('/basket',basketRouter)
//router.use('/basket',basketDeviceRouter)
