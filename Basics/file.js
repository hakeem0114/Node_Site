const fs = require("fs") //Imports File system in-built module

// //reading files
// fs.readFile('./docs/blog1.txt', (err, data)=>{ //.readFile is aync
//     if(err){
//         console.log(err)
//     }else{
//         console.log(data) //Console log a buffer
//         console.log(data.toString())
//     }
// })

// //writing files
// fs.writeFile('./docs/blog1.txt', 'Writing this message to path', (err, data)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(`File was written to path`)
//     }
// })



//Check if file/directory exists
if (!fs.existsSync('./assets')){ //mkdir if folder DNE

    //Make Directory
    fs.mkdir('./assets', (err)=>{
        if(err){
            console.log(err)
        }
        console.log('folder created')
    })
}else{
    //If dir exists, 

     //Delete directory
     fs.rmdir('./assets', (err)=>{
       if(err){
        console.log(err)
       }
       console.log('Folder Deleted')
     })

}

//Delete file
if (fs.existsSync ('./docs/deleteme.txt')){ //If file @ dir exits,
    fs.unlink('./docs/deleteme.txt', (err)=>{
        if(err){
            console.log(err)
        }else{
            console.log('Deleted file')
        }
    })
}  


