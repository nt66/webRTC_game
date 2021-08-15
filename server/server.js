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
   socket.emit('me',socket.id)

	 socket.on("callUser", (data) => {
		console.log('callUser',data)
		// io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from  })
		io.emit("callUser", { signal: data.signalData, from: data.from  })
		// io.to(data.to).emit("callAccepted", data.signal)
	})
})

// 端口监听 
server.listen(PORT ,()=>{
  console.log(`app started at port: ${PORT}`)
})
