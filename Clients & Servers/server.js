//Create a server that listens & response to requests

const http = require('http')

//Runs each time you get a request
const server = http.createServer((request, response)=>{
    console.log(`Request made to this server`)
})


const PORT = 8080 //A specifc gateway per server on host's computer. To keep info seperate
//LocalHost = Domain name (masks IP) points to host's (YOU) computer
server.listen(PORT, 'localhost', ()=>{
    console.log(`Listening for request on PORT = ${PORT}`)
})