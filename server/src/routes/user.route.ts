import express from "express"

const router = express.Router()

router.get('/', (req, res) => {
    // res.cookie("bleh", "ayush", {
    //     httpOnly: true
    // })
    res.status(200).send("This is user route")
})

router.post('/signup',)

router.get('/profile')


export default router