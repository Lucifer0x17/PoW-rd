import express from "express"
import freelancerRoutes from "./freelancer.route"
import companyRoutes from "./company.route"

const router = express.Router()

router.get('/', (_, res) => res.status(200).send("Healthy"));


router.use('/freelancer', freelancerRoutes)

// router.use('/ens')

// router.use('/revise')

router.use('/company', companyRoutes)

export default router