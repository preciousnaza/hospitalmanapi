const express = require("express")
const patientRoutes = require("./src/routes/patientRoutes");

const app = express()

app.use(express.json())
app.use(patientRoutes);




app.listen(3000, ()=> {
  console.log('server is running')
})