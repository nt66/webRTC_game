const Koa = require('koa')

const app = new Koa()

let port = 9090
app.listen(port,()=>{
 console.log(`app started at port: ${port}`)
})
