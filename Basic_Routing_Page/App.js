//Express App
const express = require('express')//Node framework for routing & managing server requests & responses
const app = express() //creates a new express application

//Connect to mongoDB
const mongoose = require('mongoose')

//Key from mongoDB
const dbURI = 'mongodb+srv://testUser:test1234@mern.kfn22jx.mongodb.net/node-tuts'
mongoose.connect(dbURI)
    .then((res)=>{
        console.log('connected to mongoDB')

        //Listen For reqests AFTER connecting to database
        app.listen(8080) //Creates an instance of server & listens
    })
    .catch((err)=> console.log(err))

//Import Schema/Models from Mongoose = ODM (Object document mapping library)
const Blog = require('./models/blog')

//Middleware
const morgan = require('morgan') //HTTP request logger middleware for node.js


//Register view engine
app.set('view engine', 'ejs') //Dynamic HTML files for server-side rendering



//In-built Express Middleware: express.static('directory name')
app.use(express.static('public')) 
//Any file inside 'public' folder will be made available to client/front-end


//MIDDLEWARE: Code that runs btwn server getting a request & sending a response.
//.use() runs function for each incoming request since its at the top of code (JS hoisting)
app.use(morgan('dev')) //morgan logs http request info. 'dev' option dictates the format of the log

//Convert .ejs url encoded document to usable JSON object
app.use(express.urlencoded({extended: true}) ) //{extended:true} precises that the req.body object will contain values of any type instead of just strings.


//mongoose & mongoDB sandbox routes

//add-blog page
app.get('/add-blog', (req, res)=>{ // /add-blog is a random testing html path for adding a new blog
    const blog = new Blog({ //New instance of schema that accepts custom properties
        title: 'Blog 2 on MongoDB',
        snippet: 'about my new blog',
        body: 'more about my new blog',
    })
    blog.save() //Save to blogs collection in database
        .then((result)=>{ //After saving on database, mongoDB sends the JSON-like object to server
            res.send(result) //Send that to the client/browser
        })
        .catch((err)=>{
            console.log(err)
        })
})

//Get all blogs page
app.get('/all-blogs',(req, res)=>{
    Blog.find() //Use in-built method from schema to find all blogs in schema
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
})

//Get a single blog
app.get('/single-blog', (req, res)=>{
    Blog.findById('6445f91fc8ba51eb6aac5106')
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
})



//ROUTES
//Send response to client
app.get('/',(req,res)=>{
    // res.send(`<p> Home Page </p>`) //Hardcoded html

    //res.sendFile('./Pages/index.html', {root: __dirname}) // relative link, computer's rootDIRNAME
    
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   ];

    // res.render('index', {title: 'Home', blogs}) //Using a EJS view engine, render this html dynamically to client
    // //Express will look through folders in current directory & find the .ejs file

    res.redirect('/blogs') //Redirect homepage to /blogs
})



app.get('/about',(req,res)=>{ //Get about.ejs view
    // res.send(`<p> About Page </p>`)
    // res.sendFile('./Pages/about.html', {root: __dirname})
    res.render('about',{title: 'About'}) //Render about.ejs view
})


//BLOG ROUTES
    //GET 
app.get('/blogs', (req, res)=>{
    Blog.find().sort({createdAt: -1 }) 
    //createdAt & updatedAt are timestampes created by MongoDB (set to true in ./models/blog.js)
    //-1 lets it sort in descending order
        .then((result)=>{

            //Render using view engine (EJS)
            res.render('index', {title: 'All Blogs', blogs: result })
        })
        .catch((err)=>{
            console.log(err)
        })
})

app.get('/blogs/create',(req, res)=>{
    res.render('create', {title: 'Create a new blog'})
})

    //Post
app.post('/blogs', (req, res)=>{ //request, response
    //Use express middleware to convert create.ejs url encoded data & passes into a usable object in req.body or req.body, req.title, ...
    console.log(req.body)
    const blog = new Blog(req.body) //Create new instance of a blog's schema to store on database

    blog.save() //Save to database
        .then((result)=>{
            //After user POSTs request, redirect them to blogs page to see their submitted data
            console.log('**Result after saving request to database is')
            console.log(result) //Puts the req.body into schema & also save the timestamps to MongoDB
            res.redirect('/blogs') //Redirect to homepage
        })
        .catch((err)=>{
            console.log(err)
        })

})

    //Get Route Parameter = id
app.get('/blogs/:id', (request, response)=>{
    const id = request.params.id  //if you used :item, it would be .params.item
    console.log(`blog id = ${id}`)

    Blog.findById(id)
        .then(result=>{
            response.render('details',{blog: result, title:'Blog Details'}) //Send objects to details.ejs
        })
        .catch((err)=>{
            console.log(err)
        })

})

    //Delete using id
    app.delete('/blogs/:id', (req, response) => {
        const id = req.params.id;
        
        Blog.findByIdAndDelete(id)
          .then(result => { //result => {JSON ID & redirect path object }
            response.json({ redirect: '/blogs' });
          })
          .catch(err => {
            console.log(err);
          });
      });


      

//404 Page
app.use((req,res)=>{ 
// .use() means use this function for every incoming request IF there is no get request/redirect
//Requires manual res.status(code #)

    //res.status(404).sendFile('./Pages/404.html', {root: __dirname})

    res.status(404).render('404', {title: '404'})
})