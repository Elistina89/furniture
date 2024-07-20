import { Brand } from "../models/models.js"
import { ApiError }  from "../error/ApiError.js"


class BrandController{
    async getAll(req, res,next){
        try{
        const brand = await Brand.findAll()
        return res.json(brand)
    } catch(e){
        next(ApiError.badRequest(e.message))
    }
    }


    async create(req, res, next){
        let {name} = req.body
        name = name.toLowerCase();
        try{
        const brand = await Brand.create({name})
        return res.json(brand) 
    } catch(e){
        next(ApiError.badRequest(e.message))
    }
    }


    async update(req, res, next){
        let {name, id} = req.body
        name = name.toLowerCase();
        try{
            const brand = await Brand.update({ name: name }, {where:{ id } })
            return res.json(brand) 
        } catch(e){
            next(ApiError.badRequest(e.message))
        }
    }


    async delete(req, res, next){
        try{
            const {id} = req.params
            await Brand.destroy({
                where:{id}
            })
            return res.json("Бренд успешно удален")
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
}





export const brandController = new BrandController() 
