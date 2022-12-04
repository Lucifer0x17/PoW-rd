import express from "express"
import { filterVerifiedNft, verifyEnsRoute } from "../controllers/freelancer.controller"

const router = express.Router()

router.get('/', (req, res) => {
    // res.cookie("bleh", "ayush", {
    //     httpOnly: true
    // })
    res.status(200).send("This is user route")
})

router.get('/ens-search', verifyEnsRoute)

router.get('/verified-nft', filterVerifiedNft)

router.post('/generate-nft',)


export default router