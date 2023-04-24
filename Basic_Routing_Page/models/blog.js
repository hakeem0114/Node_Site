const mongoose = require('mongoose')
const Schema = mongoose.Schema //contructor function for a schema
//or const { Schema } = mongoose;

//Make Schema
const blogSchema = new Schema({//Defines structure of documents to be stored on database collection
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }

}, {timestamps: true}) //generates a timestamps for each collection's CRUD operation


//To use our schema definition, we need to convert our blogSchema into a Model we can work with.
//.model('singular name of model in database', new instance of Schema) looks for collection on database based on its name
const Blog = mongoose.model('Blog',blogSchema) 

module.exports = Blog
