import React from 'react'
import Koa from 'koa'
import Router from 'koa-router'
import fs from 'fs'
import path from 'path'

const app = new Koa()
const router = new Router()
const PORT = 9000 

router.get('',async(ctx)=>{
  ctx.body = 'hellow world!!!'
})

// 启动路由
app.use(router.routes())

// 端口监听 
app.listen(PORT ,()=>{
  console.log(`app started at port: ${PORT}`)
})
