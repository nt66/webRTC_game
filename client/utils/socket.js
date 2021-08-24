import io from 'socket.io-client'

const host = `${window.location.hostname}:5000`  //'http://192.168.1.11:5000' 
const socket = io.connect(host)
export default socket
