const socket = io("/")
const myPeer = new Peer({
	host:'peerjs-server.herokuapp.com', 
	secure:true, 
	port:443})

myPeer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});


socket.emit("join-room" , roomId ,  10 )

socket.on("user-connected" , userId =>{
	console.log(userId)
})