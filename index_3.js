const express = require('express');
const fs = require("fs");
const app = express()
const port = 3003

app.get('/', (req, res) => {
  const htmlContent = fs.readFileSync("./pages/index.html", "utf-8");
  res.send(htmlContent)
})

app.get('/about', (req, res) => {

  res.send(`
        <div style="width: 780px; margin: 20px auto;">
        <a href="/">Home</a>
    <h1>this is heading</h1>
        <p>lorema iaspadsfasdfasfd</p>
        </div>
    `)

})

app.post("/about", (request, response) => {
  response.send("about from post method")
})

app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})