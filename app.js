const express = require("express")
const app = express()
const router = require('./routes')
const { db } = require("./models")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

app.get("/", (req, res, next) => {
    res.send("hola mundo")
})

db.sync({ force: false }).then(() => {
    app.listen(5000, () => console.log("estamos en linea kpo"))
})


