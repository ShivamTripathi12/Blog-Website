const express=require("express");
const mongoose=require('mongoose');
const morgan=require('morgan');
const app=express();
const Blog=require('./models/blog');
const blogRoutes=require('./routes/blogRoutes');

const dbURI="mongodb+srv://netninja:test1234@cluster0.hre2f5p.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose.connect(dbURI,{useNewUrlParser:true ,useUnifiedTopology:true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err))


app.set('view engine','ejs');



app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));


app.get('/',(req,res)=>{
    res.redirect('/blogs');
    // res.render('/index',{title:"Home page"})
});
app.get('/about',(req,res)=>{
    res.render('about',{title:"About"});
});
// app.use(blogRoutes);

app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{res.render('index',{title:"All Blogs",blogs:result})})
    .catch((err)=>console.log(err));
});
app.post('/blogs',(req,res)=>{
    const blog=new Blog(req.body);
    blog.save()
    .then((rest)=>{res.redirect("./blogs")})
    .catch((err)=>{console.log(err)});  
});
app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:"Create"});
});


app.get('/blogs/:id',(req,res)=>{
    const id=req.params.id;
    Blog.findById(id)
    .then((result)=>{res.render('details',{blog:result,title:"Details"})})
    .catch((err)=>{console.log(err)})
});




app.get('/add-blog',(req,res)=>{
    const blog=new Blog({
        title:'new blog 2',
        snippet:'about new blog 2',
        body:'more about my new blog 2'
    });

    blog.save()
    .then((result)=>{res.send(result)})
    .catch((err)=>console.log(err));
});

app.get('/aall-blog',(req,res)=>{
    Blog.find()
    .then((result)=>{res.send(result)})
    .catch((err)=>console.log(err));
});

app.get('/find-blog',(req,res)=>{
    Blog.findById('64bf5b282a76587bf2015e53')
    .then((result)=>{res.send(result)})
    .catch((err)=>console.log(err));
});

app.delete('/blogs/:id',(req,res)=>{
    const id=req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect:'/blogs'})
    })
    .catch((err)=>{console.log(err)});
});



app.use((req,res)=>{
    res.status(404).render('404',{title:"Error"});  
});
module.exports=app;