import express from 'express'
import { purchaseBook, purchaseHistory, reviewBook, searchBook } from '../controllers/userController.js'

const router=express.Router()

router.post ('/purchaseBook',purchaseBook)

router.get('/purchaseHistory',purchaseHistory)

router.post('/reviewBook',reviewBook)

router.get('/searchBook',searchBook)
export default router