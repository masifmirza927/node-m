const express = require('express')
const app = express()
const port = 3003

app.get('/', (req, res) => {
  res.send('Hello World!')
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

app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})