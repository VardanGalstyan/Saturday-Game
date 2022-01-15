import createHttpError from 'http-errors'
import { verifyJWT } from './tools.js'
import PlayerModal from '../services/players/schema.js'



export const JWTAuthPlayerMiddleWear = async (req, res, next) => {
    if (!req.headers.authorization) {
        next(createHttpError(401, "Please provide credentials in Authorization header!"))
    } else {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const decodedToken = await verifyJWT(token)
            const player = await PlayerModal.findById(decodedToken._id)
            if (player) {
                req.player = player
                next()
            } else {
                next(createHttpError(404, `No Player with id # ${decodedToken._Id} has been found!`))
            }
        } catch (error) {
            next(createHttpError(401, "Invalid Token!"))
        }
    }
}