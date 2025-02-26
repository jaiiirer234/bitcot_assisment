import http from 'http'
import {Server} from 'socket.io'
import app from './app'




const server = http.createServer(app);
const io = new Server(server,{cors:{origin:"http://localhost:3000",credentials:true}});

server.listen(5000,()=>{
    console.log(`Server is listening on port 5000`);
    
})