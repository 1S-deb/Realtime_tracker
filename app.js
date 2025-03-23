const express = require("express");
const app = express();
const path =require("path");
const port =3000
const  http =require("http");
const socketio=require("socket.io");
const server = http.createServer(app);
const io= socketio(server)
io.on("connection",(socket)=>
    {
        socket.on("send-location",(data)=>{
            io.emit("receive-location", { id: socket.id, ...data });
    
        });
        socket.on("disconnect", () => {
           
            io.emit("user-disconnected", socket.id);
           
        });
             
    });
    
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));



// Define a simple route
app.get("/", (req, res) => {
    res.render("index");
});

// Start the server
server.listen(3000,()=>
{
    console.log(` Server running at${port}`)
}) 
