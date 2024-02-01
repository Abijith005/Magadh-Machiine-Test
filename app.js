import express from 'express'
import morgan from 'morgan'
import 'dotenv/config'
import authorRouter from './routes/authorRoutes.js'
import adminAuth from './middlewares/adminAuth.js'




const app=express()
const port=process.env.PORT||6000

app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.listen(port,()=>{
    console.log('App runnig');
})

app.use('/api/admin',authorRouter)
app.use('/api/author',authorRouter)
app.use('/api/retailUser',authorRouter)
