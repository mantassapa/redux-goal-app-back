require("dotenv").config()
const express = require("express")
const connectToDb = require("./config/connectToDb")
const cors = require("cors")

connectToDb()

const app = express()
app.use(express.json())
app.use(cors())
app.options("*", cors())
app.use(express.urlencoded({extended:false}))

app.use("/api/users", require("./routes/userRoute"))

app.listen(process.env.PORT, ()=>
    console.log(`server is running on port ${process.env.PORT}`)
)
