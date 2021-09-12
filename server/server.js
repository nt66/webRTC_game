import Koa from 'koa'
import http from 'http'
import Socket from 'socket.io'
import os from 'os'

const nets = os.networkInterfaces()
const app = new Koa()
const PORT = 5000

const getIP = ()=>{
	let host = 'localhost'
		for (let i in nets) {
			let item = nets[i]
			for (let j in item){
				let data = item[j]
				if(data.family === 'IPv4' && (data.address.indexOf('192.168')>=0 || data.address.indexOf('10.89')>=0) && data.address !== '127.0.0.1'){
					host = data.address
				}
			}
	}
	return host
}
const HOSTNAME = getIP()
const server = http.createServer(app) // 这是关键
const io = Socket(server, {
	cors: {
		origin: `http://${HOSTNAME}:3000`,
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

	socket.on("rejectCall",()=>{
		socket.broadcast.emit("callReject")	
	})
	socket.on('flipOver',(data)=>{ // type 往前|往后 
		// socket.broadcast.emit('playppt',data.type, data.idx)
		io.emit('playppt',data)
	})
})

// 端口监听 
server.listen(PORT ,HOSTNAME,()=>{
  console.log(`app started`)
})
