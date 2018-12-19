const express = require('express')
const app = express()
app.use('/', express.static(__dirname + "/dist"))
app.set('views', './views')
app.set('view engine', 'html')
app.listen(9001, () => {
    console.log("node server is running at: http://localhost:9001")
})