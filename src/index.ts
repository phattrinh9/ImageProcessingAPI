import express, { Application } from 'express'
import routes from './routes'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.APP_PORT
// create an instance server
const app: Application = express()

app.use('/api', routes)

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})
export default app
