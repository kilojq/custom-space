const express = require('express')
const app = express()
app.use('/', express.static(__dirname + "/dist"))
app.use('/demo', express.static(__dirname + "/Demo"))
app.set('view engine', 'html')
app.listen(9001, () => {
    console.log("node server is running at: http://localhost:9001")
    console.log("Demo is running at: http://localhost:9001/demo")
})