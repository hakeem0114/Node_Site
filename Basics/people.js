const people = ['yoshi', 'ryu', 'chun-li']
const ages = [20,25,30,35]

console.log(`Successfully imported poeople module`)

const os = require('os') //Import in-built node method for the Operating System

console.log(os.platform(), os.homedir) //Gives access to .platflorm() & .homedir()

/*When you run 

    node people.js, it runs return of the file

    node module.js, return console.log(people) since its require(./people)

*/

//Export modules/this file to somewhere
module.exports = {
    people,
    ages
}
