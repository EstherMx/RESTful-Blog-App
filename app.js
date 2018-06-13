var express    = require("express"),
	app 	   = express(),
	mongoose   = require("mongoose"),
	bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public")); //for styling any Express app
app.use(bodyParser.urlencoded({extended:true}));


//Mongoose model 
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: "Blog test",
// 	image: "http://www.cardinalcomm.org/wp-content/uploads/2017/02/blog.jpeg",
// 	body: "Fist blog created"
// });


//RESTful routes
app.get("/", function(req,res){
	res.redirect("/blogs");
})

//INDEX ROUTE
app.get("/blogs", function(req,res){ 
	Blog.find({},function(err, blogs){
		if(err){
			console.log("error");
		}else{
			res.render("index", {blogs:blogs});
		}
	});
});

//NEW ROUTE
app.get("/blogs/new", function(req,res){
	res.render("new");
});

//CREATE ROUTE
app.post("/blogs",function(req,res){
	//create blog
	Blog.create(req.body.blog, function(err, bewBlog){
		if(err){
			res.render("new");
		}else{
			//then, redirect to the index
			res.redirect("/blogs");
		}
	})
})

var port = process.env.PORT || 3000;
app.listen(3000, function(){
	console.log("App listening on port " + port);
});

