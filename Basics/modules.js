const xyz = require("./people") //require = importing ./people into modules.js

console.log(xyz) //xyz stores the imported modules as an object

//Access properties from people.js using dot notation
console.log(xyz.people, xyz.ages)

//Import module using destructuring
//To get a specific number of things from a file/module
const {people, ages} = require("./people")

console.log(`People array = ${people}`)
console.log(`Ages array = ${ages}`)