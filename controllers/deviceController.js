import { Device, DeviceInfo } from "../models/models.js";
import { v4 as uuidv4 } from "uuid";
import { ApiError } from "../error/ApiError.js";
import path from "path";
const __dirname = path.resolve();
import fs from "fs";
import { Op } from "sequelize";

class DeviceController {
  
  async getAll(req, res, next) {
    try {
      let { brandId, typeId, limit, page, name } = req.query;
      page = page || 1;
      limit = limit || 9;
      name = name || "";
      let offset = page * limit - limit;
      let devices;

      if (name) {
        name = name.toLowerCase();

        devices = await Device.findAndCountAll({
          where: {
            name: {
              [Op.like]: "%" + name + "%",
            },
          },
          limit,
          offset,
        });
        return res.json(devices);
      }

      if (!brandId && !typeId) {
        devices = await Device.findAndCountAll({ limit, offset });
      }
      if (!brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId },
          limit,
          offset,
        });
      }
      if (brandId && !typeId) {
        devices = await Device.findAndCountAll({
          where: { brandId },
          limit,
          offset,
        });
      }
      if (brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId, brandId },
          limit,
          offset,
        });
      }

      return res.json(devices);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: "info" }],
      });
      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, art, info } = req.body; 
      name = name.toLowerCase();
      const { img } = req.files;
      let fileName = uuidv4() + ".jpg";
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        art,
        img: fileName,
      }); 
      if(device){
        img.mv(path.resolve(__dirname, "static", fileName))
      }
      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }
      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      let { name, price, brandId, typeId, info, id } = req.body;
      name = name.toLowerCase();

      const device = await Device.update(
        { name, price, brandId, typeId },
        { where: { id } }
      );
      if (info) {
        info = JSON.parse(info);

        info.forEach((i) =>
          DeviceInfo.update(
            {
              title: i.title.toLowerCase(),
              description: i.description.toLowerCase(),
            },
            {
              where: { id: i.id },
            }
          )
        );
      }
      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { img } = req.body;
      if (fs.existsSync(path.resolve(__dirname, "static", img))) {
        fs.unlink(path.resolve(__dirname, "static", img), (err) => {
          if (err) throw err;
        });
      }
      await Device.destroy({
        where: { id },
      });
      return res.json("Продукт успешно удален");
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export const deviceController = new DeviceController();
