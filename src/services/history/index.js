import { Router } from 'express'
import HistoryModel from './schema.js'

const historyRouter = Router()


historyRouter.get('/', async (req, res, next) => {
    try {
        const histories = await HistoryModel.find()
            .populate({
                path: 'session',
                populate: { path: 'players' },
            })
            .populate({
                path: 'session',
                populate: { path: 'host' },
            })
        res.status(200).send(histories)
    } catch (error) {
        console.log("problem", error);
        next(error)
    }
})

export default historyRouter