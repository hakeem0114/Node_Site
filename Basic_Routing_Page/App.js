//Express App

const express = require('express')

//Express App
const app = express()

//Register view engine
app.set('view engine', 'ejs')

//Listen For requests
app.listen(8080) //Creates an instance of server & listens

//Send response to client
app.get('/',(req,res)=>{
    // res.send(`<p> Home Page </p>`) //Hardcoded html

    //res.sendFile('./Pages/index.html', {root: __dirname}) // relative link, computer's rootDIRNAME
    
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];

    res.render('index', {title: 'Home', blogs}) //Using a EJS view engine, render this html dynamically to client
    //Express will look through folders in current directory & find the .ejs file
})

app.get('/about',(req,res)=>{ //Get about.ejs view
    // res.send(`<p> About Page </p>`)
    // res.sendFile('./Pages/about.html', {root: __dirname})

 
    res.render('about',{title: 'About'}) //Render about.ejs view
})

/*
//Redirects
app.get('about-us',(req, res)=>{ 
    res.redirect('/about')
})
*/

app.get('/blogs/create',(req, res)=>{
    res.render('create', {title: 'Create a new blog'})
})

//404 Page
app.use((req,res)=>{ 
// .use() means use this function for every incoming request IF there is no get request/redirect
//Requires manual res.status(code #)

    //res.status(404).sendFile('./Pages/404.html', {root: __dirname})

    res.status(404).render('404', {title: '404'})
})