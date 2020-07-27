const socket = io("/")

socket.emit("join-room" , roomId ,  10 )

socket.on("user-connected" , userId =>{
	console.log(userId)
} )