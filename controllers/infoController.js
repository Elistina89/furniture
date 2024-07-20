import { DeviceInfo } from "../models/models.js"
import { ApiError }  from "../error/ApiError.js"





class InfoController{

async create(req, res, next){
    
    let { id, info } = req.body
    try{
        const deviceInfo = await DeviceInfo.create({
                title: info.title.toLowerCase(),
                description: info.description.toLowerCase(),
                deviceId: id
            })
        return res.json(deviceInfo)
    } catch(e){
        next(ApiError.badRequest(e.message))
    }
}

    async delete(req, res, next){
        const { id } = req.params
        try{
            await DeviceInfo.destroy({
                where:{id}
            })
            return res.json("Информация успешно удалена")
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

export const infoController = new InfoController() 
