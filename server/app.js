const Koa = require('koa')

const app = new Koa()

let port = 3030

app.use(ctx => {
  ctx.body = '<div>Hello Koa<div/>'
})

app.listen(port,()=>{
  console.log(`app started at port: ${port}`)
})
