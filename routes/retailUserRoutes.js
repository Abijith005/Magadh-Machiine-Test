import express from 'express'
import { hello } from '../controllers/userAuthController.js'

const router=express.Router()

router.get ('/simply',hello)
export default router