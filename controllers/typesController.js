import { Type } from "../models/models.js";
import { ApiError }  from "../error/ApiError.js"

class TypesController {

    
  async getAll(req, res,next) {
    try {
      const types = await Type.findAll();
      return res.json(types);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async create(req, res,next) {
    let { name } = req.body;
    name = name.toLowerCase();
    try {
      const type = await Type.create({ name });
      return res.json(type);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    let { name, id } = req.body;
    name = name.toLowerCase();
    try {
      const type = await Type.update({ name: name }, { where: { id } });
      return res.json(type);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res,next) {
    try {
      const { id } = req.params;
      await Type.destroy({
        where: { id },
      });
      return res.json("Тип успешно удален");
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export const typesController = new TypesController();
