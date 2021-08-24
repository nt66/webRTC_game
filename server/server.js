import Koa from 'koa'
import http from 'http'
import Socket from 'socket.io'
import os from 'os'

const nets = os.networkInterfaces()

// console.log('nets',nets)

const getIP = ()=>{
	let host = 'localhost'
		for (let i in nets) {
			let item = nets[i]
			for (let j in item){
				let data = item[j]
				if(data.family === 'IPv4' && data.address.indexOf('192.168')>=0 && data.address !== '127.0.0.1'){
					host = data.address
				}
			}
	}
	return host
}

const app = new Koa()
const PORT = 5000
let HOSTNAME = getIP()
const server = http.createServer(app) // 这是关键
const io = Socket(server, {
	cors: {
		origin: "http://192.168.1.11:3000",
		methods: [ "GET", "POST" ]
	}
})

io.on('connection',(socket)=>{
  socket.emit('me',socket.id)

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name:data.name  })
	})

	socket.on("answerCall", (data) => {
		// 回复给B
		io.to(data.to).emit("callAccepted", data.signal)
	})

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})
})

// 端口监听 
server.listen(PORT ,HOSTNAME,()=>{
  console.log(`app started at port: ${PORT}, , hostname is: ${HOSTNAME}`)
})
