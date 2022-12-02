import express from "express"
import userRoutes from "./user.route"

const router = express.Router()

router.get('/', (_, res) => res.status(200).send("Healthy"));


router.use('/user', userRoutes)


export default router