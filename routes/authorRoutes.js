import express from 'express'
import { addBook } from '../controllers/authorController.js'

const router=express.Router()

router.post('/addBook',addBook)


export default router