import { ApiError } from "../error/ApiError.js";


export function errorHandleMiddleware(err, req, res, next){
    if(err instanceof(ApiError)){
        return res.status(err.status).json({message: err.message})
    } return res.status(500).json('Непредвиденная ошибка')
}
