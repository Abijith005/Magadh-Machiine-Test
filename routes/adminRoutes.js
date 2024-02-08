import express from 'express'
import { sendNotifications } from '../controllers/adminController.js'

const router=express.Router()

router.post('/sendNotification',sendNotifications)

export default router