import express from "express"
import { getAllEmployees, getCurrentBalance, getMyNfts, nextPayoutBalance, postAddEmployee, verifyInvoiceForFreelancer, withdrawableAmount } from "../controllers/company.controller"

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({ route: "company" })
})

router.get('/employee', getAllEmployees)

router.get('/balance', getCurrentBalance)

router.get('/next-payout-balance', nextPayoutBalance)

router.get('/withdraw-amount', withdrawableAmount)

router.post('/add-employee', postAddEmployee)

router.get('/my-nfts', getMyNfts)

router.post('/verify-invoice', verifyInvoiceForFreelancer)

export default router