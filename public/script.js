const socket = io("/")
const videoGrid = document.getElementById("video-grid")

// const myPeer = new Peer({
// 	host:'peerjs-server.herokuapp.com', 
// 	port:443})

//steps to create peer server
//before install peer js globally by (npm install peer -g)
//$ peerjs --port 9000 --key peerjs --path /myapp


const myPeer = new Peer({
	host:'localhost', 
	port:9000,
	path: '/myapp'})

const myVideo = document.createElement("video")
	myVideo.muted = true
const peers = {}

navigator.mediaDevices.getUserMedia({
	video : true,
	audio : true
}).then(stream=> {
	addVideoStream(myVideo,stream)
	
	myPeer.on("call",call=>{
		call.answer(stream)
		const video = document.createElement("video")
		call.on("stream",userVideoStream=>{
			addVideoStream(video,userVideoStream )
		})
	})
	
	socket.on("user-connected" , userId =>{
		connectToNewUser(userId,stream)
	})
})

	socket.on("user-disconnected",userId=>{
		console.log (userId)
		if (peers[userId]) peers[userId].close()
		
	})

myPeer.on('open', id =>{
  // console.log('My peer ID is: ' + id);
socket.emit("join-room" , roomId , id  )
});


function connectToNewUser(userId,stream){
	const call = myPeer.call(userId,stream)
	const video = document.createElement("video")
	call.on("stream", userVideoStream=>{
		addVideoStream(video,userVideoStream)
	})
	call.on("close",()=>{
		video.remove()
	})
	peers[userId]= call
}

function addVideoStream(video , stream){
	video.srcObject = stream 
	video.addEventListener("loadedmetadata", ()=>{
		video.play()
	})
	videoGrid.append(video)
}