import express from 'express'
import { revenueNotification } from '../controllers/adminController.js'
import { payment } from '../controllers/paymentContoller..js'

const router=express.Router()

router.get('/test',revenueNotification)

router.post('/pay',payment)


export default router