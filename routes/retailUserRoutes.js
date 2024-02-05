import express from 'express'
import { purchaseBook, purchaseHistory, reviewBook } from '../controllers/userController.js'

const router=express.Router()

router.post ('/purchaseBook',purchaseBook)

router.get('/purchaseHistory',purchaseHistory)

router.post('/reviewBook',reviewBook)
export default router