/* import { BasketDevice } from "../models/models.js";
import { v4 as uuidv4 } from "uuid";
import { ApiError } from "../error/ApiError.js";
import path from "path";
const __dirname = path.resolve();

class BasketDeviceController {
  async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const basketDevice = await BasketDevice.findOne({
        where: { id },
      });
      return res.json(basketDevice);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const { basketId, deviceId } = req.body;

      const basketDevice = await BasketDevice.create({ basketId, deviceId }); // не работает deviceId
      return res.json(basketDevice);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export const basketDeviceController = new BasketDeviceController();
 */