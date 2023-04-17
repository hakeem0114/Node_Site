const http = require("http");
const fs = require("fs") //File system to let us read/write

const Port = 8080;

const server = http.createServer((req, res)=>{
    console.log(req.url, req.method);

    //Set header content type for accept field
    res.setHeader("Content-Type", "text/html")

    //Get user's current path
    let path = "./"  //Apppend request.url to path

    if(req.url === '/' || req.url === 'index.html' || req.url === '/index'){ //If req.url points to home path
        path += 'index.html'  // ./index.html
        res.statusCode = 200 //Read = GET
    }else if(req.url === '/about' || req.url === '/about.html'){
        path += 'about.html' 
        res.statusCode = 200 //Read = GET
    }else if(req.url === '/contact-me' || req.url === '/contact-me.html'){
        path += 'contact-me.html'
        res.statusCode = 200 //Read = GET
    }else{
        //Return 404: Page not found error
        path += '404.html'
        res.statusCode = 404 //DNE
    }
//     switch (req.url){
//         case '/':
//             path += 'index.html';
//             break;

//         case '/about':
//             path += 'about.html';
//             break;

//         case '/contact-me':
//             path += 'contact-me.html';
//             break; 

//         default:   
//             path += '404.html'
//             break;
//    }

    //Send an html file to browser
    fs.readFile(path, (err, data)=>{
        if(err){
            console.log(err)
        }else{
            //Send data to browser
            res.write(data)
            
            res.end() //End request
        }
    })
})

server.listen(Port, "localhost", ()=>{
    console.log(`Listening for requests on Port ${Port}`)

})