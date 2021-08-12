import io from 'socket.io-client'

const host = location.origin
const socket = io.connect(host)

export default socket
