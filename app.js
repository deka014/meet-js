const express = require("express"),
	  app = express(),
	  server = require("http").Server(app),
	  io = require("socket.io")(server),
	  {v4 : uuidV4} = require("uuid");

app.set("view engine" , "ejs")

app.use(express.static(__dirname+"/public"))  //dir name is video chat directory 

app.get("/", (req,res) => {
	res.redirect (`/${uuidV4()}`)
});

app.get("/:room",(req,res)=>{
	res.render("room", {roomId : req.params.room})
})
 
io.on("connection", socket => {
		socket.on("join-room",(roomId, userId)=>{
			socket.join(roomId)
			socket.to(roomId).broadcast.emit("user-connected",userId)
		}) 	  
	  })

server.listen(3000,(req,res)=>{
	console.log("server started")
})
	  
	  
	
		