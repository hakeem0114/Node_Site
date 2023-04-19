const fs = require('fs') //Import file system

//Streams lets you start using data before, it has finished loading
//Buffer = Small packaged data from stream - 
    //like online videos that allows to you start playing videos (buffers) 


//Create stream & read its data from directory
const readStream = fs.createReadStream('./docs/blog3.txt', {encoding: 'utf-8'})
                    //Encoder used in place of .toString() to convert to readable format
const writeStream  = fs.createWriteStream('./docs/blog4.txt')


//.on = node's .addEventListener( "data" => data event to use data from stream)
readStream.on('data', (pieceOfData) =>{
    console.log('***Read stream data**')
    // console.log(pieceOfData.toString()) use encoder instead of converting to string
    console.log(pieceOfData) 

    //WriteStream = overwrite fi
    //Get data from another file & write to another
    writeStream.write(" \n ---Newly Written Piece--- \n")
    writeStream.write(pieceOfData)

})

