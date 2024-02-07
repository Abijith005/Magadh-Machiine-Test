import express from 'express'
import { revenueNotification } from '../controllers/adminController.js'

const router=express.Router()

router.get('/test',revenueNotification)


export default router