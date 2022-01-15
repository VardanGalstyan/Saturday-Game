import { Router } from 'express'
import PlayerModal from '../players/schema.js'
import { LocationModel, SessionModel } from '../sessions/schema.js'


const sessionRouter = Router()


sessionRouter.post('/:hostId', async (req, res, next) => {
    try {
        const newSession = await SessionModel.create(req.body)
        const savedSession = await newSession.save()
        await PlayerModal.findByIdAndUpdate(req.params.hostId, { $push: { host: hostId } })
        res.status(201).send(savedSession)
    } catch (error) {
        console.log("problem", error);
        next(error)
    }
})


sessionRouter.get('/', async (req, res, next) => {
    try {
        const sessions = await SessionModel.find()
            .populate('host')
            .populate('players')
        res.status(200).send(sessions)
    } catch (error) {
        console.log("problem", error);
        next(error)
    }
})


sessionRouter.put('/:id', async (req, res, next) => {
    try {
        const updatedSession = await SessionModel.findByIdAndUpdate(req.params.id, req.body,
            { new: true }
        )
        res.status(200).send(updatedSession)
    } catch (error) {
        console.log("problem", error);
        next(error)
    }
})

sessionRouter.get('/locations', async (req, res, next) => {
    try {
        const locations = await LocationModel.find()
        res.status(200).send(locations)
    } catch (error) {
        console.log("problem", error);
        next(error)
    }
})

export default sessionRouter