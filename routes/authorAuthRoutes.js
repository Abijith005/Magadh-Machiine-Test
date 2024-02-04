import express from "express"
import { authorLogin, authorRegistration } from "../controllers/authorAuthController.js"

const router=express.Router()

router.post('/register',authorRegistration)

router.post('/login',authorLogin)


export default router