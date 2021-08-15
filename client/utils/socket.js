import io from 'socket.io-client'

const host = 'http://localhost:5000' 
const socket = io.connect(host)
export default socket
