import Koa from 'koa'
import http from 'http'
import Socket from 'socket.io'

const app = new Koa()
const PORT = 5000
const server = http.createServer(app) // 这是关键
const io = Socket(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})

io.on('connection',(socket)=>{
   console.log('connected111:',socket.id)
   socket.emit('me',socket.id)
})

// 端口监听 
server.listen(PORT ,()=>{
  console.log(`app started at port: ${PORT}`)
})
