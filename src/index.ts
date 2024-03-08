import express, { Express } from "express"
import dotenv from "dotenv"
import cors from 'cors'
import router  from './routes/reports'

dotenv.config()

const app: Express =  express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000

app.use('/api', router)


app.listen(PORT, ()=>{
    console.log(`server runing on port ${PORT}`)
})
