//Import Modules
const http = require('http')
const fs = require('fs')


//Create Server
const server  = http.createServer((req, res)=>{
    //Console log http url & method
    console.log(`Request Url = ${req.url}. \n Method = ${req.method} `)
    
    //Server Header (Content-Type)
    res.setHeader('Content-Type', 'text/html')

    //Initialize paths & url
    let path = './Pages/'

    switch(req.url){
        case '/':
            path += 'index.html' // = ./Pages/index.html
            res.statusCode = 200
        break

        case '/about':
            path += 'about.html' 
            res.statusCode = 200
        break

        //Redirect 'about-me' to 'about' page
        case '/about-me':
            
            res.statusCode = 301 //Moved resource
            res.setHeader('Location', '/about')
            res.end()
        break

        case '/contact':
            path += 'contact.html' 
            res.statusCode = 200
        break

        default: //If other paths
            path += '404.html' 
            res.statusCode = 404
        break
    }
    

    //Send response to client
    fs.readFile(path,(err, data)=>{
        if(err){
            console.log(err)
            res.end()
        }else{
            res.write(data)
            res.end()
        }
    })
})


//Server listens to client
const PORT = 3000
server.listen(PORT, 'localhost', ()=>{
    console.log(`Server is listening at PORT = ${PORT}`)
})