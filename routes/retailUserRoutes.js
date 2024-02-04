import express from 'express'
import { purchaseBook, purchaseHistory } from '../controllers/userController.js'

const router=express.Router()

router.post ('/purchaseBook',purchaseBook)

router.get('/purchaseHistory',purchaseHistory)
export default router