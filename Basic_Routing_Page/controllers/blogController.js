//Folow MDN docs MVC naming convention 

//Import Schema/Models from Mongoose = ODM (Object document mapping library)
const Blog = require('../models/blog')



//blog_index
const blog_index = (req,res) =>{ 
    Blog.find().sort({createdAt: -1 }) 
    //createdAt & updatedAt are timestampes created by MongoDB (set to true in ./models/blog.js)
    //-1 lets it sort in descending order
        .then((result)=>{

            //Render using view engine (EJS)
            res.render('../views/blogs/index', {title: 'All Blogs', blogs: result })
        })
        .catch((err)=>{
            console.log(err)
        })
    
}

//blog_details: get a single blog
const blog_details = (request,response)=>{
    const id = request.params.id  //if you used :item, it would be .params.item
    console.log(`blog id = ${id}`)

    Blog.findById(id)
        .then(result=>{
            response.render('../views/blogs/details',{blog: result, title:'Blog Details'}) //Send objects to details.ejs
        })
        .catch((err)=>{
            // console.log(err)
            response.render('../views/404', {title: 'Blog Not Found'})
        })
}

//blog_create_get: Read/GET/ Send the actual form 
const blog_create_get = (req,res)=>{
    res.render('../views/blogs/create', {title: 'Create a new blog'})
}

//blog_create_post: Create/POST request
const blog_create_post = (req,res)=>{
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
}
//blog_delete
const blog_delete = (req,res)=>{
    const id = req.params.id;
        
    Blog.findByIdAndDelete(id)
      .then(result => { //result => {JSON ID & redirect path object }
        response.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
}

module.exports= {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}

